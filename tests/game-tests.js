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
    state, accounts, activeAccountId, elDemonGrants, saveState, saveAccounts, playMatchSound, storageSet, storageRemove, saveToLocalDatabase,
    loginHidden: quickLoginOverlay.hidden,
    workspace: prototypeWorkspace.innerHTML, view: document.querySelector('.rail-active')?.dataset.prototypeView || 'Home'
  };
  try {
    saveState = () => {}; saveAccounts = () => {}; playMatchSound = () => {};
    storageSet = () => {}; storageRemove = () => {}; saveToLocalDatabase = () => Promise.resolve();
    const account = { id: 'game-test-a', username: 'Game Test', motto: 'Test safely', avatarStyle: 'gold', state: freshState(false) };
    const other = { id: 'game-test-b', username: 'Other Club', motto: 'Second account', avatarStyle: 'blue', state: freshState(false) };
    accounts = [account, other]; activeAccountId = account.id; state = account.state;

    const withElDemonAccounts = (run) => {
      const previous = { accounts, activeAccountId, state, elDemonGrants, prototypeViewedProfileId };
      try {
        elDemonGrants = [];
        accounts = [
          normalizeAccount({ id:'demon-owner', username:'S7ph_Void4', state:{} }, 0),
          normalizeAccount({ id:'demon-other-admin', username:developerUsername, state:{} }, 1),
          ...['One','Two','Three','Four'].map((name,index) => normalizeAccount({ id:`demon-${index}`, username:`Demon ${name}`, state:{} }, index + 2))
        ];
        activeAccountId = accounts[0].id; state = accounts[0].state; prototypeViewedProfileId = null;
        run(accounts);
      } finally {
        accounts = previous.accounts; activeAccountId = previous.activeAccountId; state = previous.state;
        elDemonGrants = previous.elDemonGrants; prototypeViewedProfileId = previous.prototypeViewedProfileId;
      }
    };

    check('Only S7ph_Void4 can gift El Demon to three lifetime recipients', () => withElDemonAccounts((players) => {
      activeAccountId = players[2].id; state = players[2].state;
      assert(!giftElDemon(players[3].username).ok, 'A normal player could gift the reward');
      activeAccountId = players[1].id; state = players[1].state;
      assert(!giftElDemon(players[3].username).ok, 'Another admin could spend the owner gifts');
      activeAccountId = players[0].id; state = players[0].state;
      assert(!giftElDemon('Missing Player').ok && elDemonGrants.length === 0, 'Missing player consumed a slot');
      assert(giftElDemon(players[2].username.toLowerCase()).ok, 'Case-insensitive gift failed');
      assert(!giftElDemon(players[2].username).ok && elDemonGrants.length === 1, 'Duplicate gift consumed a slot');
      assert(giftElDemon(players[3].username).ok && giftElDemon(players[4].username).ok, 'Three recipients could not receive gifts');
      assert(elDemonGrants.length === 3 && !giftElDemon(players[5].username).ok, 'A fourth recipient received the reward');
      accounts = accounts.filter((player) => player.id !== players[2].id);
      assert(!giftElDemon(players[5].username).ok && elDemonGrants.length === 3, 'Deleting a recipient freed an extra gift');
    }));

    check('El Demon grants persist across renames and resets and reject unearned selections', () => withElDemonAccounts((players) => {
      giftElDemon(players[2].username);
      const recipient = normalizeAccount({ ...players[2], username:'Renamed Demon' }, 0);
      assert(recipient.state.profileTitle === 'El Demon' && recipient.state.profileBackground === 'el-demon', 'Gifted selections did not survive migration');
      elDemonGrants = normalizeElDemonGrants([...elDemonGrants, ...elDemonGrants]);
      assert(elDemonGrants.length === 1 && hasElDemonGift(recipient.id), 'Restoring gifts duplicated or lost a slot');
      recipient.state = freshState(false);
      assert(hasElDemonGift(recipient.id), 'Resetting progress removed the recipient entitlement');
      const unearned = migrateState({ ...freshState(false), profileTitle:'El Demon', profileBackground:'el-demon' }, false, players[3].id);
      assert(unearned.profileTitle === 'Club Founder' && unearned.profileBackground === 'stadium', 'An unearned title or background survived');
    }));

    check('El Demon is gift-only in the profile and equips its matching background', () => withElDemonAccounts((players) => {
      assert(profileWorkspaceMarkup().includes('data-gift-el-demon'), 'Owner gifting panel is missing');
      giftElDemon(players[2].username);
      activeAccountId = players[3].id; state = players[3].state;
      assert(!profileWorkspaceMarkup().includes('data-gift-el-demon'), 'Normal player saw the gifting controls');
      selectPrototypeView('Profile');
      const locked = document.querySelector('[data-profile-title="El Demon"]');
      assert(locked.disabled, 'Ungifted player can equip the title');
      locked.disabled = false; locked.click();
      assert(state.profileTitle !== 'El Demon', 'Changing a disabled button bypassed the gift check');
      activeAccountId = players[2].id; state = players[2].state;
      state.profileTitle = 'Club Founder'; state.profileBackground = 'stadium';
      selectPrototypeView('Profile');
      document.querySelector('[data-equip-el-demon]').click();
      assert(state.profileTitle === 'El Demon' && state.profileBackground === 'el-demon', 'The paired set did not equip');
      assert(document.querySelector('.profile-showcase-card.background-el-demon .el-demon-title'), 'Special title and scene did not render');
    }));

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

    check('Primary developer owns and auto-equips El Demon without using a gift slot', () => {
      const grantsBefore = elDemonGrants.length;
      const owner = normalizeAccount({ id:'el-demon-owner-entitlement', username:developerUsername, state:freshState(false) }, 0);
      assert(owner.state.elDemonUnlocked, 'Owner entitlement is missing');
      assert(owner.state.profileTitle === 'El Demon' && owner.state.profileBackground === 'el-demon', 'El Demon set was not auto-equipped');
      assert(elDemonGrants.length === grantsBefore, 'Owner entitlement consumed a gift slot');
      assert(hasElDemonProfile(owner.state), 'Profile UI does not recognize the owner entitlement');
    });

    check('Prime Ronaldo uses the NIGHTMARE rank, double infinity rating and local portrait', () => {
      const prime = cardPool.find((card) => card.name === 'Prime Ronaldo');
      assert(prime?.adminOnly && prime.specialAccess && ratingLabel(prime) === '∞ × ∞', 'Prime rating or access flag is missing');
      assert(prime.rarity === 'NIGHTMARE' && raritySortValue(prime) < raritySortValue(cardPool.find((card) => card.rarity === 'G.O.A.T')), 'NIGHTMARE is not the top rank');
      assert(playerPhoto(prime) === 'assets/players/prime-ronaldo.png', 'Requested portrait is missing');
      assert(ratingSortValue(prime) > ratingSortValue(cardPool.find((card) => card.name === 'Cristiano Ronaldo')), 'Prime does not sort above regular Ronaldo');
      assert(!normalRollPool.some((card) => card.name === prime.name), 'Prime entered the normal pack pool');
    });

    check('Prime Ronaldo and the interactive prototype are visible from login', () => {
      const primeButton = document.querySelector('#primeRonaldoDemoBtn');
      const prototypeLink = document.querySelector('.login-prototype-button');
      const primeImage = document.querySelector('.login-prime-ronaldo');
      assert(primeButton?.textContent.includes('PRIME RONALDO'), 'Prime Ronaldo demo button is missing');
      assert(prototypeLink?.getAttribute('href') === 'prototypes.html', 'Prototype Lab is not linked from login');
      assert(primeImage?.getAttribute('src') === 'assets/players/prime-ronaldo.png', 'Prime Ronaldo is not the visible login showcase');
      assert(typeof openPrimeRonaldoDemo === 'function', 'Prime Ronaldo demo flow is unavailable');
    });

    check('Prime Ronaldo has a direct playable-match shortcut', () => {
      const previousState = state;
      const previousDev = account.isDev;
      const previousUsername = account.username;
      try {
        account.isDev = true;
        account.username = developerUsername;
        state = freshState('dev');
        state.inventory = allInventoryCards('dev');
        renderInventory();
        const shortcut = inventory.querySelector('.rarity-nightmare [data-card-match]');
        assert(shortcut?.textContent.includes('Play Football Match'), 'Prime card match shortcut is missing');
        assert(typeof window.launchFCStarsMatch === 'function', 'Playable match launcher is not connected');
      } finally {
        account.isDev = previousDev;
        account.username = previousUsername;
        state = previousState;
        renderInventory();
      }
    });

    check('Existing admin accounts receive Prime Ronaldo automatically', () => {
      for (const username of [developerUsername, 'S7ph_Void4']) {
        const admin = normalizeAccount({ id: `prime-${username}`, username, state: {} }, 0);
        assert(admin.isDev && admin.state.inventory.some((card) => card.name === 'Prime Ronaldo'), `${username} did not receive Prime Ronaldo`);
        assert(canAccessCard({ name: 'Prime Ronaldo' }, admin), `${username} cannot use Prime Ronaldo`);
        assert(admin.state.infiniteCoins && admin.state.infiniteRankedPoints, `${username} did not receive unlimited balances`);
      }
    });

    check('Non-admin grants and imported saves cannot retain Prime Ronaldo', () => {
      const prime = { name:'Prime Ronaldo', id:'imported-prime', adminOnly:false };
      for (const grant of [false, 'special', 'all']) {
        const imported = migrateState({ ...freshState(false), inventory:[prime], selectedStar:prime, selectedStarSlot:'st', currentCard:prime, currentCardSaved:true, teamCards:{ st:prime }, joinRequest:prime, activeMatch:{ homeTeam:[prime] } }, grant);
        assert(!imported.inventory.some((card) => card.name === prime.name), `Prime survived ${grant} inventory migration`);
        assert(!imported.selectedStar && !imported.currentCard && !imported.teamCards.st && !imported.joinRequest && !imported.activeMatch, 'Prime survived an equipped or active save');
      }
      const collector = { username:'Shiva Porwal', isDev:false };
      assert(accountInventoryGrant(collector) === 'all' && !canAccessCard(prime, collector), 'Full collection access became admin access');
      assert(allInventoryCards('all').some((card) => card.name === 'Cristiano Ronaldo'), 'Existing full collection grant lost regular Ronaldo');
      assert(!allInventoryCards('all').some((card) => card.name === prime.name), 'Full collection grant included Prime');
      assert(addCardToInventory([], prime).length === 0, 'Non-admin could directly add Prime to inventory');
    });

    check('Double infinity keeps squad metrics finite', () => {
      const previousState = state;
      try {
        state = freshState(false);
        state.selectedStar = { ...cardPool.find((card) => card.name === 'Prime Ronaldo'), id:'prime-metric-test' };
        state.selectedStarSlot = 'st';
        assert(isInfiniteRating(state.selectedStar), 'Double infinity is not recognized');
        assert(Number.isFinite(prototypeTeamRating()), 'Prime made the squad rating NaN or Infinity');
      } finally { state = previousState; }
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
      assert(ensureDailyChallenge(state).packs === 1, 'Pack did not advance the daily objective');
    });

    check('Closing an unclaimed pack refunds its cost', () => {
      state = freshState(false); account.state = state; state.matchPoints = 100;
      openPrototypePack(); closePrototypePack(true);
      assert(state.matchPoints === 100 && state.inventory.length === 0, 'Unclaimed pack was charged');
    });

    check('Repeated pack requests cannot charge or replace a pending card', () => {
      state = account.state = freshState(false); state.matchPoints = 150;
      openPrototypePack();
      const pending = prototypePendingPack;
      openPrototypePack(); openPrototypePack();
      assert(state.matchPoints === 100 && prototypePendingPack === pending, 'Repeated open changed the purchase');
      closePrototypePack(true); closePrototypePack(true);
      assert(state.matchPoints === 150, 'Refund was missing or paid twice');
    });

    check('Squad overview exposes eleven unique slots and opens the selected replacement', () => {
      state = account.state = freshState(false);
      selectPrototypeView('Squad');
      const slots = [...prototypeWorkspace.querySelectorAll('[data-squad-slot]')];
      assert(slots.length === 11 && new Set(slots.map(button => button.dataset.squadSlot)).size === 11, 'Starting XI is incomplete');
      slots.find(button => button.dataset.squadSlot === 'st').click();
      assert(!prototypePitchOverlay.hidden && state.replaceSlot === 'st', 'Selected position did not open');
      closePrototypePitch();
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

    check('Daily streak rewards once and continues on consecutive days', () => {
      const streakState = freshState(false);
      const first = new Date(2026, 8, 28, 12), next = new Date(2026, 8, 29, 12), skipped = new Date(2026, 9, 1, 12);
      const firstReward = recordDailyVisit(streakState, first);
      assert(firstReward === 20 && streakState.loginStreak.current === 1, 'First daily visit reward is wrong');
      assert(recordDailyVisit(streakState, first) === 0 && streakState.loginStreak.current === 1, 'Reloading granted the daily reward twice');
      assert(recordDailyVisit(streakState, next) === 25 && streakState.loginStreak.current === 2, 'Consecutive visit did not grow the streak');
      assert(recordDailyVisit(streakState, skipped) === 20 && streakState.loginStreak.current === 1, 'Missed day did not reset the streak');
      streakState.loginStreak.best = 7;
      assert(profileTitles(streakState).find((title) => title.name === 'On Fire').unlocked, 'Seven-day streak title stayed locked');
    });

    check('Daily Treble tracks play and pays its chest only once', () => {
      state = account.state = freshState(false); activeAccountId = account.id;
      addDailyChallengeProgress('matches', 1); addDailyChallengeProgress('goals', 2); addDailyChallengeProgress('packs', 1);
      const before = state.matchPoints;
      assert(dailyChallengeCompleted(state), 'Completed daily objectives stayed incomplete');
      assert(claimDailyChallengeReward() && state.matchPoints === before + 150, 'Daily chest did not pay 150 Coins');
      assert(!claimDailyChallengeReward() && state.matchPoints === before + 150, 'Daily chest could be claimed twice');
      assert(homeWorkspaceMarkup().includes('REWARD CLAIMED'), 'Claimed state did not render on Home');
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
      assert(markup.toUpperCase().includes('NEYMAR') && !markup.toUpperCase().includes('RONALDO'), 'Squad summary is still hard-coded');
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
      prototypeSettingsModal.hidden = false;
      document.querySelector('#prototypeLogoutButton').click();
      assert(activeAccountId === null && state.activeMatch === null && !matchPhysicsFrame, 'Previous account remained active');
      assert(prototypeSettingsModal.hidden && !quickLoginOverlay.hidden, 'Logout did not return to account selection');
    });

    check('All six primary views remain reachable', () => {
      const views = ['Home', 'Packs', 'Squad', 'Play', 'Club', 'Profile'];
      activeAccountId = account.id; state = account.state = freshState(false);
      for (const view of views) {
        selectPrototypeView(view);
        assert(document.querySelector(`[data-prototype-view="${view}"]`).classList.contains('rail-active'), `${view} navigation failed`);
        assert(prototypeWorkspace.textContent.trim().length > 20, `${view} content is empty`);
      }
    });

    check('Profiles support search, tasks, backgrounds and player showcases', () => {
      state = account.state = freshState(false); activeAccountId = account.id;
      state.inventory = [{ ...cardPool.find((card) => card.name === 'Cristiano Ronaldo'), id:'profile-ronaldo' }];
      state.taskProgress = { ronaldoWinStreak: 10, totalWins: 10 };
      assert(profileTitles(state).find((title) => title.name === 'Siuuu Streak').unlocked, 'Ronaldo task title stayed locked');
      state.profileBackground = 'royal'; state.profileTitle = 'Siuuu Streak'; state.showcasePlayerNames = ['Cristiano Ronaldo'];
      const markup = profileWorkspaceMarkup();
      assert(markup.includes('background-royal') && markup.includes('Cristiano Ronaldo') && markup.includes('Siuuu Streak'), 'Profile customization did not render');
      assert(markup.indexOf('profile-search-panel') < markup.indexOf('profile-showcase-card'), 'Profile search is not above the main profile');
      prototypeBackgroundStudioOpen = true; prototypeBackgroundMode = 'library';
      const studioMarkup = profileWorkspaceMarkup();
      assert(profileBackgroundOptions.every((background) => studioMarkup.includes(`data-profile-background="${background}"`)), 'All 10 background presets did not render');
      prototypeBackgroundMode = 'ai';
      assert(profileWorkspaceMarkup().includes('data-generate-profile-background'), 'AI background maker did not render');
      const generatedUrl = profileAiImageUrl('neon trophy night', 42);
      assert(generatedUrl.startsWith('https://image.pollinations.ai/prompt/') && generatedUrl.includes('model=flux'), 'AI background does not use a real image generation endpoint');
      state.profileAiBackground = { prompt:'neon trophy night', hue:42, imageUrl:generatedUrl }; state.profileBackground = 'ai';
      assert(profileWorkspaceMarkup().includes('background-ai-image') && profileWorkspaceMarkup().includes('image.pollinations.ai'), 'Generated AI image did not render as the profile background');
      prototypeBackgroundMode = 'upload';
      assert(profileWorkspaceMarkup().includes('prototypeProfileBackgroundInput'), 'Device background upload did not render');
      prototypeBackgroundStudioOpen = false; prototypeBackgroundMode = 'library';
      state.inventory = allInventoryCards('dev');
      state.showcasePlayerNames = ['Cristiano Ronaldo', 'Lionel Messi', 'Pelé'];
      selectPrototypeView('Profile');
      const profileMain = document.querySelector('.desktop-main');
      const profileHero = document.querySelector('.profile-showcase-card');
      assert(profileMain.scrollWidth <= profileMain.clientWidth + 1, 'A full collection pushed the profile underneath the sidebar');
      assert([...profileHero.querySelectorAll('.profile-player-showcase article')].every((card) => card.getBoundingClientRect().right <= profileHero.getBoundingClientRect().right + 1), 'Showcase cards escaped the profile frame');
      assert([...profileHero.querySelectorAll('.profile-player-showcase article')].every((card) => card.getBoundingClientRect().width <= 80), 'Showcase cards still hide too much of the profile background');
      prototypeProfileQuery = 'renamed';
      assert(profileWorkspaceMarkup().includes('Renamed Club'), 'Username search did not find a local account');
      prototypeProfileQuery = '';
    });
  } finally {
    closePrototypePack(false);
    window.clearTimeout(prototypeMatchCloseTimer);
    state = saved.state; accounts = saved.accounts; activeAccountId = saved.activeAccountId; elDemonGrants = saved.elDemonGrants;
    saveState = saved.saveState; saveAccounts = saved.saveAccounts; playMatchSound = saved.playMatchSound;
    storageSet = saved.storageSet; storageRemove = saved.storageRemove; saveToLocalDatabase = saved.saveToLocalDatabase;
    quickLoginOverlay.hidden = saved.loginHidden;
    selectPrototypeView(saved.view);
    render();
  }
  return { passed: results.every(result => result.passed), results };
};
