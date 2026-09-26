/* Full-game integration checks. Run only in an isolated browser profile. The
   runner clones in-memory account state and disables persistence while active. */
window.runFCGameTests = function () {
  const results = [];
  const check = (name, fn) => {
    try { fn(); results.push({ name, passed: true }); }
    catch (error) { results.push({ name, passed: false, error: error.message }); }
  };
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const saved = {
    state, accounts, activeAccountId, saveState, saveAccounts, playMatchSound, storageSet, storageRemove, saveToLocalDatabase,
    loginHidden: quickLoginOverlay.hidden,
    workspace: prototypeWorkspace.innerHTML, view: document.querySelector('.rail-active')?.dataset.prototypeView || 'Home'
  };
  try {
    saveState = () => {}; saveAccounts = () => {}; playMatchSound = () => {};
    storageSet = () => {}; storageRemove = () => {}; saveToLocalDatabase = () => Promise.resolve();
    const account = { id: 'game-test-a', username: 'Game Test', motto: 'Test safely', avatarStyle: 'gold', state: freshState(false) };
    const other = { id: 'game-test-b', username: 'Other Club', motto: 'Second account', avatarStyle: 'blue', state: freshState(false) };
    accounts = [account, other]; activeAccountId = account.id; state = account.state;

    check('Malformed local saves are repaired without losing scalar progress', () => {
      const migrated = migrateState({ ...defaultState, level: 7, inventory: {}, friends: 'bad', teamCards: { broken: { name: 'Alisson' } }, replaceSlot: 'broken', badges: {}, playerStats: [], activeMatch: 'bad' }, false);
      assert(migrated.level === 7, 'Level was lost');
      assert(Array.isArray(migrated.inventory) && Array.isArray(migrated.friends) && Array.isArray(migrated.badges), 'Collections were not repaired');
      assert(!Array.isArray(migrated.playerStats) && migrated.activeMatch === null, 'Objects were not repaired');
      assert(migrated.replaceSlot === null && !Object.keys(migrated.teamCards).length, 'Invalid squad slot survived');
    });

    check('Corrupt and duplicate account records normalize safely', () => {
      const normalized = normalizeAccounts([null, { id: 'one', username: 'Same', state: {} }, { id: 'two', username: 'same', state: {} }]);
      assert(normalized.length === 2, 'Valid accounts were lost');
      assert(new Set(normalized.map(item => item.username.toLowerCase())).size === 2, 'Duplicate names survived');
    });

    check('Account names are unique regardless of case', () => {
      assert(isUsernameTaken('game test') && isUsernameTaken('OTHER CLUB'), 'Duplicate name accepted');
      assert(!isUsernameTaken('Fresh Club'), 'Unique name rejected');
    });

    check('S7ph_Void4 is a separate administrator account', () => {
      assert(isDeveloperUsername('S7ph_Void4'), 'New administrator username was not recognized');
      const normalized = normalizeAccounts([
        { id: 'primary-admin', username: developerUsername, state: freshState('dev') },
        { id: 'void4-admin', username: 'S7ph_Void4', state: freshState(false) }
      ]);
      const admin = normalized.find((item) => item.username === 'S7ph_Void4');
      assert(normalized.length === 2 && admin?.isDev, 'New administrator was merged or downgraded');
      assert(admin.state.level >= 50 && admin.state.inventory.length >= cardPool.length, 'Administrator privileges were not granted');
    });

    check('User-created names render as text, never executable markup', () => {
      window.__fcInjected = 0;
      state.friends = [{ id: 'evil', username: '<img src=x onerror=window.__fcInjected=1>', status: 'accepted' }];
      renderFriends();
      assert(window.__fcInjected === 0 && !friendsList.querySelector('img'), 'Injected HTML executed');
      assert(friendsList.textContent.includes('<img'), 'Name text was lost');
      state.friends = [];
    });

    check('A claimed 50-coin pack adds one real card', () => {
      state = freshState(false); account.state = state; state.matchPoints = 100;
      openPrototypePack();
      const name = prototypePendingPack?.name;
      document.querySelector('#prototypePackTapTarget').click();
      document.querySelector('#prototypePackTapTarget').click();
      document.querySelector('#prototypePackTapTarget').click();
      claimPrototypePack();
      assert(state.matchPoints === 50 && state.inventory.length === 1, 'Pack charge/claim mismatch');
      assert(state.inventory[0].name === name && state.currentCard.name === name, 'Wrong card claimed');
    });

    check('Closing an unclaimed pack refunds its cost', () => {
      state = freshState(false); account.state = state; state.matchPoints = 100;
      openPrototypePack(); closePrototypePack(true);
      assert(state.matchPoints === 100 && state.inventory.length === 0, 'Unclaimed pack was charged');
    });

    check('Ranked, friendly and abandoned rewards stay distinct', () => {
      const finish = (mode, abandoned = false) => {
        state = freshState(false); account.state = state;
        state.activeMatch = { home: 2, away: 1, mode };
        endMatch({ abandoned });
        window.clearTimeout(prototypeMatchCloseTimer);
        return { rp: state.rankedPoints, coins: state.matchPoints - 56, xp: state.xp };
      };
      const ranked = finish('Ranked Rush'), friendly = finish('Friendly'), abandoned = finish('Ranked Rush', true);
      assert(ranked.rp === 10 && ranked.coins === 50 && ranked.xp > 0, 'Ranked rewards incorrect');
      assert(friendly.rp === 0 && friendly.coins === 50 && friendly.xp > 0, 'Friendly rewards incorrect');
      assert(abandoned.rp === 0 && abandoned.coins === 0 && abandoned.xp === 0, 'Abandon exploit remains');
    });

    check('Club settings belong to the active account only', () => {
      state = account.state = freshState(false); activeAccountId = account.id;
      document.querySelector('#prototypeClubNameInput').value = 'Renamed Club';
      document.querySelector('#prototypeClubMottoInput').value = 'One account only';
      document.querySelector('#prototypeSettingsForm').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      assert(account.username === 'Renamed Club' && account.motto === 'One account only', 'Active profile not saved');
      assert(other.username === 'Other Club' && other.motto === 'Second account', 'Other profile was changed');
    });

    check('Squad summary reflects the actual XI', () => {
      state = account.state = freshState(false);
      state.selectedStar = { ...cardPool.find(card => card.name === 'Neymar Jr'), id: 'test-neymar' };
      state.selectedStarSlot = 'lw';
      const markup = prototypeViewMarkup('Squad');
      assert(markup.includes('NEYMAR') && !markup.includes('RONALDO'), 'Squad summary is still hard-coded');
    });

    check('Any player can be placed in any position', () => {
      state = account.state = freshState(false);
      const goalkeeper = { ...cardPool.find((card) => card.name === 'Alisson'), id: 'free-position-alisson' };
      state.inventory = [goalkeeper]; state.replaceSlot = 'st';
      assert(canPlaySlot(goalkeeper, 'ST'), 'Goalkeeper was blocked from striker');
      useCard(goalkeeper.id);
      assert(state.teamCards.st?.name === 'Alisson', 'Player was not placed in the chosen unrestricted slot');
    });

    check('Requested legends exist once with distinct local portraits', () => {
      const requested = ['Zlatan Ibrahimović','Lionel Messi','Cristiano Ronaldo','Diego Maradona','Pele','Ronaldinho','Zinedine Zidane','Roy Keane','Gennaro Gattuso','Pepe','Sergio Ramos','Jaap Stam','Manuel Neuer'];
      for (const name of requested) {
        const matches = cardPool.filter((card) => card.name === name);
        assert(matches.length === 1, `${name} is missing or duplicated`);
        assert(matches[0].image?.startsWith('assets/players/'), `${name} does not use a curated local portrait`);
      }
      assert(new Set(requested.map((name) => cardPool.find((card) => card.name === name).image)).size === requested.length, 'Two legends share the same portrait');
    });

    check('Logout clears live state and stops simulation', () => {
      activeAccountId = account.id; state = account.state = freshState(false);
      state.activeMatch = { home: 0, away: 0 };
      logoutAccount();
      assert(activeAccountId === null && state.activeMatch === null && !matchPhysicsFrame, 'Previous account remained active');
    });

    check('All six primary views remain reachable', () => {
      const views = ['Home', 'Packs', 'Squad', 'Play', 'Club', 'News'];
      activeAccountId = account.id; state = account.state = freshState(false);
      for (const view of views) {
        selectPrototypeView(view);
        assert(document.querySelector(`[data-prototype-view="${view}"]`).classList.contains('rail-active'), `${view} navigation failed`);
        assert(prototypeWorkspace.textContent.trim().length > 20, `${view} content is empty`);
      }
    });

    check('News search finds every Ronaldo story newest first', () => {
      selectPrototypeView('News');
      const results = filteredNewsStories('Ronaldo');
      assert(results.length >= 4 && results.every((story) => `${story.title} ${story.player} ${story.tags.join(' ')}`.toLowerCase().includes('ronaldo')), 'Ronaldo search missed or included the wrong stories');
      assert(results.every((story, index) => index === 0 || new Date(results[index - 1].published) >= new Date(story.published)), 'News was not newest first');
    });
  } finally {
    closePrototypePack(false);
    window.clearTimeout(prototypeMatchCloseTimer);
    state = saved.state; accounts = saved.accounts; activeAccountId = saved.activeAccountId;
    saveState = saved.saveState; saveAccounts = saved.saveAccounts; playMatchSound = saved.playMatchSound;
    storageSet = saved.storageSet; storageRemove = saved.storageRemove; saveToLocalDatabase = saved.saveToLocalDatabase;
    quickLoginOverlay.hidden = saved.loginHidden;
    selectPrototypeView(saved.view);
    render();
  }
  return { passed: results.every(result => result.passed), results };
};
