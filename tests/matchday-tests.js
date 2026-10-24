/* Run in an isolated browser profile. Persistence is disabled for all fixtures. */
window.runFCMatchdayTests = async function () {
  const results = [], assert = (value, message) => { if (!value) throw new Error(message); };
  const check = async (name, run) => { try { await run(); results.push({ name, passed: true }); } catch (error) { results.push({ name, passed: false, error: error.message }); } };
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const saved = {state, accounts, activeAccountId, saveState, saveAccounts, playMatchSound};
  stopMatchPhysics();
  saveState = () => {}; saveAccounts = () => {}; playMatchSound = () => {};
  const account = { id:'matchday-fixture', username:'Test FC', state:freshState(false), avatarStyle:'gold' };
  accounts = [account]; activeAccountId = account.id; state = account.state;
  quickLoginOverlay.hidden = true;
  const clear = () => {
    if (state.activeMatch) endMatch({abandoned:true});
    clearTimeout(prototypeMatchCloseTimer); closePrototypeMatch();
    document.querySelector('#matchdayDialog').close();
  };
  const start = (mode='Quick Match') => { clear(); openPrototypeMatch(mode); stopMatchPhysics(); return state.activeMatch; };
  try {
    await check('Older settings and malformed history normalize safely', () => {
      assert(FCMatchday.settings(null).difficulty === 'balanced', 'Null settings failed');
      assert(FCMatchday.settings({difficulty:'broken',camera:'broken'}).camera === 'broadcast', 'Unknown camera survived');
      assert(FCMatchday.history([null, {}, {home:NaN,away:1,outcome:'win'}]).length === 0, 'Invalid history survived');
      const migrated=migrateState({...freshState(false),matchHistory:{},matchSettings:null},false);
      assert(migrated.matchHistory.length === 0 && migrated.matchSettings.sound, 'Old account migration failed');
    });
    await check('Setup changes are applied at kickoff and double kickoff cannot reset a match', () => {
      FCMatchdayUI.setup('Quick Match');
      document.querySelector('[data-md-difficulty="competitive"]').click();
      document.querySelector('#mdCamera').value='wide'; document.querySelector('#mdSound').checked=false;
      document.querySelector('[data-md-kickoff]').click(); stopMatchPhysics();
      const m=state.activeMatch;
      assert(m.settings.difficulty==='competitive' && m.settings.camera==='wide' && !m.settings.sound, 'Setup did not reach gameplay');
      m.home=1;FCMatchdayUI.begin();startMatch();
      assert(state.activeMatch===m && m.home===1, 'Repeated kickoff reset the game');
    });
    await check('Ranked difficulty is fixed even when a saved setting requests an easier game', () => {
      state.matchSettings={difficulty:'relaxed',camera:'broadcast',sound:true};
      const m=start('Ranked Rush');
      assert(m.settings.difficulty==='balanced' && FCMatchday.difficulty(m).speed===1, 'Ranked difficulty can be reduced');
    });
    await check('Difficulty changes opponent closing speed', () => {
      const base=start();
      base.possessionId=null;base.ballX=50;base.ballY=45;
      const relaxed=structuredClone(base), competitive=structuredClone(base);
      relaxed.settings.difficulty='relaxed';competitive.settings.difficulty='competitive';
      for(let i=0;i<45;i++){relaxed.simulationTime+=1/120;competitive.simulationTime+=1/120;simulateMatchAI(relaxed,1/120);simulateMatchAI(competitive,1/120);}
      const speed=m=>Math.max(...m.awayPlayers.filter(p=>p.role!=='GK').map(p=>Math.hypot(p.vx,p.vy)));
      assert(speed(competitive)>speed(relaxed), 'Difficulty labels do not change opponent movement');
    });
    await check('Pause freezes the clock, blocks actions and cancels a held shot', async () => {
      const m=start();beginShotCharge();FCMatchdayUI.pause(true);
      const time=m.simulationTime, clock=m.displaySeconds;
      advanceMatch(m,.25);
      window.dispatchEvent(new KeyboardEvent('keydown',{code:'Space',key:' ',bubbles:true}));
      await delay(60);
      assert(m.simulationTime===time && m.displaySeconds===clock && !matchShootCharging && !matchPhysicsFrame, 'Pause advanced or charged a shot');
      assert(!queuePlayerAction(m,m.homePlayers[m.controlledPlayerIndex],'shoot'), 'Paused action was queued');
      assert(document.querySelector('#matchdayDialog').open, 'Pause dialog is missing');
      FCMatchdayUI.pause(false);assert(!m.userPaused && Boolean(matchPhysicsFrame), 'Resume did not restart physics');stopMatchPhysics();
    });
    await check('Camera and audio can change while paused without restarting the score', () => {
      const m=start();m.home=2;FCMatchdayUI.pause(true);
      const oldCamera=m.settings.camera, oldSound=m.settings.sound;
      document.querySelector('[data-md-camera]').click();document.querySelector('[data-md-sound]').click();
      assert(m.home===2 && m.settings.camera!==oldCamera && m.settings.sound!==oldSound, 'Paused settings did not apply');
      FCMatchdayUI.pause(false);stopMatchPhysics();
    });
    await check('Stats use successful match events and possession time', () => {
      const m=start(), p=m.homePlayers[5], away=m.awayPlayers[0];
      emitMatchEvent(m,'kick',p,{action:'shoot'});emitMatchEvent(m,'kick',p,{action:'through'});emitMatchEvent(m,'catch',away);
      const stats=FCMatchday.stats(m);stats.home.possession=3;stats.away.possession=1;
      assert(stats.home.shots===1 && stats.home.passes===1 && stats.away.saves===1, 'Events counted incorrectly');
      assert(FCMatchday.possession(m)[0]===75 && FCMatchday.possession(m)[1]===25, 'Possession is incorrect');
    });
    await check('Full time displays accurate rewards, records history and pays only once', () => {
      state.matchHistory=[];state.matchPoints=100;state.rankedPoints=0;
      const m=start('Ranked Rush');m.home=2;m.away=1;
      endMatch();clearTimeout(prototypeMatchCloseTimer);
      const coins=state.matchPoints, result=state.matchHistory[0];
      assert(result.home===2 && result.away===1 && result.coins===50 && result.rp===10 && result.xp>0,'Incorrect results');
      assert(document.querySelector('.md-result.win') && document.querySelector('.md-final-score').textContent.includes('2'),'Result screen is missing');
      endMatch();assert(state.matchPoints===coins && state.matchHistory.length===1,'Full time paid twice');
    });
    await check('Leaving a match grants no rewards and creates no history result', () => {
      const count=state.matchHistory.length, coins=state.matchPoints;
      const m=start();m.home=5;endMatch({abandoned:true});clearTimeout(prototypeMatchCloseTimer);
      assert(state.matchHistory.length===count && state.matchPoints===coins,'Leaving granted progression');
    });
    await check('Recent form is capped at ten results and escapes opponent names', () => {
      const sample=FCMatchday.result({home:1,away:0,awayLeader:'<img src=x onerror=alert(1)>',mode:'Friendly'});
      state.matchHistory=Array.from({length:12},()=>sample);
      assert(FCMatchday.history(state.matchHistory).length===10,'History is unbounded');
      const html=FCMatchdayUI.historyMarkup();assert(!html.includes('<img src=x') && html.includes('&lt;img'),'Opponent name became HTML');
    });
    await check('A saved paused match restores its score, stats and visible match panel', () => {
      const m=start();m.home=3;m.stats.home.shots=7;FCMatchdayUI.pause(true);
      const restored=JSON.parse(JSON.stringify(m));
      document.querySelector('#matchdayDialog').close();
      originalMatchParent.prepend(realMatchPanel);prototypeMatchOverlay.hidden=true;
      state.activeMatch=restored;render();
      assert(!prototypeMatchOverlay.hidden && realMatchPanel.parentElement===prototypeMatchHost,'Restored match is invisible');
      assert(restored.home===3 && restored.stats.home.shots===7 && restored.userPaused && !matchPhysicsFrame,'Restored match lost state');
      FCMatchdayUI.pause(false);stopMatchPhysics();
    });
    await check('Radar renders all 22 players and survives pause and match re-entry', async () => {
      const m=start();window.match3D?.update(m);FCMatchdayUI.update(m);await delay(100);
      assert(document.querySelector('#mdRadar').getBoundingClientRect().width>0 && m.homePlayers.length+m.awayPlayers.length===22,'Radar is not visible');
      assert(document.querySelector('#mdLiveStats').textContent.includes('SHOTS'),'Live stats are missing');
      FCMatchdayUI.pause(true);assert(!window.match3D.inspect().rendering,'Paused renderer keeps running');
      FCMatchdayUI.pause(false);await delay(100);assert(window.match3D.inspect().rendering,'Renderer failed to resume');stopMatchPhysics();
    });
  } finally {
    clear(); state=saved.state;accounts=saved.accounts;activeAccountId=saved.activeAccountId;
    saveState=saved.saveState;saveAccounts=saved.saveAccounts;playMatchSound=saved.playMatchSound;
    render();selectPrototypeView('Home');
  }
  return {passed:results.every(r=>r.passed),results};
};
