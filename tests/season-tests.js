/* Run through --season in an isolated Chrome profile. Fixture persistence is off. */
window.runFCSeasonTests = async function () {
  const results = [], assert = (value, message) => { if (!value) throw new Error(message); };
  const check = async (name, fn) => { try { await fn(); results.push({name, passed:true}); } catch (e) { results.push({name, passed:false, error:e.message}); } };
  const saved = {state, accounts, activeAccountId, saveState, saveAccounts, playMatchSound};
  stopMatchPhysics(); saveState = () => {}; saveAccounts = () => {}; playMatchSound = () => {};
  const account = {id:'season-fixture', username:'Season FC', avatarStyle:'gold', state:freshState(false)};
  accounts = [account]; activeAccountId = account.id; state = account.state; quickLoginOverlay.hidden = true;
  const clear = () => { if (state.activeMatch) endMatch({abandoned:true}); clearTimeout(prototypeMatchCloseTimer); closePrototypeMatch(); document.querySelector('#matchdayDialog').close(); };
  const start = (mode = 'Champions Journey') => { clear(); FCMatchdayUI.setup(mode); FCMatchdayUI.begin(); stopMatchPhysics(); return state.activeMatch; };
  const finish = (home, away, mode = 'Champions Journey') => { const m = start(mode); m.home = home; m.away = away; endMatch(); clearTimeout(prototypeMatchCloseTimer); return state.matchHistory[0]; };
  try {
    await check('Old and malformed saves migrate without touching inventory or balances', () => {
      for (const input of [undefined, null, {}, {id:FCSeason.id, xp:Infinity, stage:-3, claimed:[1,1,NaN,500], records:[null]}]) {
        const old = freshState(false); old.matchPoints = 123; old.season = input;
        const migrated = migrateState(old, false);
        assert(migrated.season.id === FCSeason.id && Number.isFinite(migrated.season.xp) && migrated.season.stage === 0 && migrated.matchPoints === 123, 'Migration corrupted an existing save');
      }
    });
    await check('New clubs have independent season objects', () => {
      const a = freshState(false), b = freshState(false); a.season.claimed.push(1); a.season.stage = 5;
      assert(b.season.claimed.length === 0 && b.season.stage === 0, 'Clubs share progress');
    });
    await check('Journey setup uses the real named opponent and enforces stage difficulty', () => {
      state.season = FCSeason.normalize(); FCMatchdayUI.setup('Champions Journey');
      assert(document.querySelector('.md-fixture').textContent.includes('Academy XI'), 'Missing stage opponent');
      assert(document.querySelector('[data-md-difficulty="competitive"]').disabled, 'Stage difficulty is editable');
      document.querySelector('[data-md-tactic="attack"]').click(); document.querySelector('#mdCamera').value = 'wide';
      FCMatchdayUI.begin(); stopMatchPhysics();
      assert(state.activeMatch.awayLeader === 'Academy XI' && state.activeMatch.settings.difficulty === 'relaxed' && state.activeMatch.settings.tactic === 'attack' && state.activeMatch.settings.camera === 'wide', 'Setup did not reach real gameplay');
      assert(state.activeMatch.homePlayers.length === 11 && state.activeMatch.awayPlayers.length === 11, 'Journey is not an 11 v 11 match');
    });
    await check('A journey win advances one stage and gives exact one-time bonuses', () => {
      clear(); state.season = FCSeason.normalize(); state.matchPoints = 100;
      const result = finish(2,1);
      assert(state.season.stage === 1 && state.season.xp === 110 && state.matchPoints === 225, 'Incorrect stage XP/coins');
      assert(result.season.advanced && result.season.coins === 75 && result.season.trophies.includes('winner'), 'Result missed season rewards');
      endMatch(); assert(state.matchPoints === 225 && state.season.stage === 1, 'Repeated end paid twice');
    });
    await check('Loss and draw keep the same stage but award participation XP', () => {
      const before = state.season.stage;
      const loss = finish(0,1); const draw = finish(1,1);
      assert(state.season.stage === before && loss.season.xp === 50 && draw.season.xp === 60 && !draw.season.coins, 'Retry progression incorrect');
      assert(state.season.streak === 0, 'Loss did not reset streak');
    });
    await check('Abandoning never pays coins, XP, trophies or a stage unlock', () => {
      const before = JSON.stringify(state.season), coins = state.matchPoints;
      const m = start(); m.home = 9; endMatch({abandoned:true});
      assert(JSON.stringify(state.season) === before && state.matchPoints === coins, 'Abandoned match paid progression');
    });
    await check('Other modes earn Season XP without advancing the journey', () => {
      const stage = state.season.stage; const result = finish(3,0,'Ranked Rush');
      assert(state.season.stage === stage && result.season.xp === 120 && result.rp === 10 && result.season.coins === 0, 'Ranked integration incorrect');
    });
    await check('All seven stages use their difficulty and unlock champion once', () => {
      clear(); state.season = FCSeason.normalize(); state.matchPoints = 0;
      for (let i=0;i<7;i++) {
        const m = start();
        assert(m.awayLeader === FCSeason.stages[i].name && m.settings.difficulty === FCSeason.stages[i].difficulty && m.careerStage === i, 'Wrong stage fixture');
        m.home=2; m.away=0; endMatch(); clearTimeout(prototypeMatchCloseTimer);
      }
      assert(state.season.stage === 7 && state.season.records.length === 7 && state.matchPoints === 1750, 'Cup payout or records incorrect');
      assert(profileTitles(state).find(t=>t.name === 'Champion 02').unlocked, 'Champion title not unlocked');
      document.querySelector('[data-md-again]').click();
      assert(!state.activeMatch && !document.querySelector('#matchdayDialog').open && document.querySelector('.s2-champion'), 'Completed cup replay got stuck');
    });
    await check('Old or mismatched stage metadata cannot grant a second stage bonus', () => {
      const s = FCSeason.normalize({id:FCSeason.id,stage:2});
      for (const match of [{mode:'Champions Journey',seasonId:FCSeason.id,careerStage:1},{mode:'Quick Match',seasonId:FCSeason.id,careerStage:2},{mode:'Champions Journey',seasonId:'old',careerStage:2}]) {
        const r=FCSeason.complete(s,{home:2,away:0},match);
        assert(r.season.stage === 2 && r.stageCoins === 0,'Stale match advanced journey');
      }
    });
    await check('Reward pass enforces XP gates, allows exact threshold, rejects repeat claims', () => {
      let s = FCSeason.normalize({id:FCSeason.id,xp:149});
      assert(FCSeason.claim(s,1).coins === 0 && FCSeason.claim(s,99).coins === 0,'Locked reward paid');
      s.xp=150; const r=FCSeason.claim(s,1);
      assert(r.coins === 75 && FCSeason.claim(r.season,1).coins === 0,'Threshold or duplicate claim failed');
    });
    await check('Reward button pays account balance and remains claimed after migration', () => {
      state.season=FCSeason.normalize({id:FCSeason.id,xp:300}); state.matchPoints=10;
      selectPrototypeView('Season'); document.querySelector('[data-season-tab="rewards"]').click();
      const button = document.querySelector('[data-season-claim="1"]'); button.click(); button.click();
      assert(state.matchPoints === 85 && document.querySelector('[data-season-claim="1"]').disabled,'UI claim paid twice');
      state=migrateState(JSON.parse(JSON.stringify(state)),false);
      assert(FCSeason.claim(state.season,1).coins === 0,'Reload allowed a duplicate claim');
    });
    await check('All ten free pass rewards total 2000 coins', () => {
      let s=FCSeason.normalize({id:FCSeason.id,xp:1500}), total=0;
      for(let i=1;i<=10;i++){const r=FCSeason.claim(s,i);s=r.season;total+=r.coins;}
      assert(total === 2000 && s.claimed.length === 10,'Pass total incorrect');
    });
    await check('Trophies require clean-sheet wins and retain the best streak', () => {
      let s=FCSeason.normalize();
      for(let i=0;i<3;i++)s=FCSeason.complete(s,{home:2,away:0},{mode:'Friendly'}).season;
      assert(FCSeason.unlocked(s).includes('wall') && FCSeason.unlocked(s).includes('streak'),'Win trophies missing');
      s=FCSeason.complete(s,{home:0,away:0},{mode:'Friendly'}).season;
      assert(s.streak === 0 && s.bestStreak === 3 && s.cleanSheets === 3,'Draw incorrectly counted as clean-sheet win');
    });
    await check('Match reports are read-only for Season XP and reward claims', () => {
      const result = finish(1,0,'Friendly'); const before = JSON.stringify(state.season), coins=state.matchPoints;
      FCMatchdayUI.results(result); FCMatchdayUI.results(result);
      assert(JSON.stringify(state.season) === before && state.matchPoints === coins,'Report repeated season payout');
    });
    await check('Saved paused journey retains opponent, score, stage and resumes', () => {
      clear(); state.season=FCSeason.normalize({id:FCSeason.id,stage:3});
      const m=start();m.home=1;FCMatchdayUI.pause(true);
      state=migrateState(JSON.parse(JSON.stringify(state)),false); FCMatchdayUI.restore(state.activeMatch);
      assert(state.activeMatch.awayLeader === 'Metro Athletic' && state.activeMatch.careerStage === 3 && state.activeMatch.home === 1 && state.activeMatch.userPaused,'Paused save lost career context');
      FCMatchdayUI.pause(false); stopMatchPhysics(); assert(!state.activeMatch.userPaused,'Could not resume');
    });
    await check('Account merge preserves higher progress and union of claimed rewards', () => {
      const a=freshState(false), b=freshState(false);
      a.season={id:FCSeason.id,xp:600,stage:3,claimed:[1,2]}; b.season={id:FCSeason.id,xp:200,stage:1,claimed:[3]};
      const merged=mergeStates(a,b).season;
      assert(merged.xp === 600 && merged.stage === 3 && merged.claimed.length === 3,'Merge lost progress or claims');
    });
    await check('Season screens and all navigation fit the current viewport', () => {
      clear();
      for (const view of ['Home','Season','Packs','Squad','Play','Club','Profile']) {
        selectPrototypeView(view);
        assert(document.documentElement.scrollWidth <= innerWidth+1,`${view} overflows at ${innerWidth}`);
      }
      selectPrototypeView('Season');
      for(const name of ['journey','rewards','trophies']) {
        document.querySelector(`[data-season-tab="${name}"]`).click();
        assert(document.documentElement.scrollWidth <= innerWidth+1,`${name} overflows at ${innerWidth}`);
        assert(document.querySelector(`[data-season-tab="${name}"]`).getAttribute('aria-current') === 'page','Active season tab not announced');
      }
    });
  } finally {
    clear(); state=saved.state;accounts=saved.accounts;activeAccountId=saved.activeAccountId;
    saveState=saved.saveState;saveAccounts=saved.saveAccounts;playMatchSound=saved.playMatchSound;
    render();selectPrototypeView('Home');
  }
  return {passed:results.every(r=>r.passed),results};
};
