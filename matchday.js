/* Matchday screens and HUD. The physics and account systems own game state. */
(() => {
  const lab = document.body.classList.contains('prototype-lab');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const modes = ['Ranked Rush', 'Quick Match', 'Friendly'];
  let dialog, content, pending = null, dialogType = '', activeMode = 'Quick Match', lastHudTime = -1;
  let selectedSettings = FCMatchday.settings();
  const controls = `<div class="md-control-guide"><h3>Make your move.</h3><div><span><kbd>W A S D</kbd> / arrows · Move</span><span><kbd>Space</kbd> Hold & release · Shoot</span><span><kbd>P</kbd> Short pass</span><span><kbd>Q</kbd> Through ball</span><span><kbd>C</kbd> Cross</span><span><kbd>Shift</kbd> Hold · Sprint</span><span><kbd>T</kbd> Tackle</span><span><kbd>E</kbd> Dribble</span><span><kbd>Tab</kbd> Switch player</span><span><kbd>Esc</kbd> Pause / resume</span></div><p>On a phone, drag the left stick to move. Hold Shoot to build power. Sprint uses stamina; release it to recover.</p></div>`;
  function heroMarkup(demo = false) {
    return `<section class="md-hero"><div class="md-hero-content"><span class="md-eyebrow"><i></i> THE TACTICS UPDATE</span><h3>THE PITCH<br>IS <em>YOURS.</em></h3><p>Build your XI. Find the pass.<br>Make the moment count.</p><button class="md-primary" data-matchday-setup="Quick Match">LET’S PLAY <span>↗</span></button><div class="md-hero-meta"><span>11 v 11 FOOTBALL</span><span>90 SECOND MATCHES</span></div></div><div class="md-hero-number" aria-hidden="true">11<span>ONE TEAM.<br>YOUR STORY.</span></div></section><div class="md-spotlight"><img src="assets/players/prime-ronaldo.png" alt=""><div><small>THE NIGHTMARE COLLECTION</small><b>Prime Ronaldo. Limitless.</b></div><button ${demo ? 'data-lab-desktop-view="squad"' : 'data-prototype-view="Squad"'}>VIEW XI →</button></div>`;
  }
  function historyMarkup() {
    const items = lab ? [] : FCMatchday.history(state.matchHistory);
    return `<section class="md-history"><header><div><span class="md-eyebrow">YOUR RECENT FORM</span><h3>The last whistle.</h3></div><span>LAST 10 MATCHES</span></header>${items.length ? items.map((item,index) => `<article><b class="md-form ${esc(item.outcome)}">${item.outcome === 'win' ? 'W' : item.outcome === 'draw' ? 'D' : 'L'}</b><div><strong>${esc(item.opponent)}</strong><small>${esc(item.mode)} · ${esc(FCMatchday.difficulties[FCMatchday.settings(item.settings).difficulty].label)}</small></div><b>${item.home} – ${item.away}</b><span>+${Number(item.coins) || 0} coins</span>${item.stats?.home && item.stats?.away && Array.isArray(item.possession) ? `<button class="md-report-button" data-md-report="${index}" aria-label="View match report against ${esc(item.opponent)}">REPORT ↗</button>` : ''}</article>`).join('') : `<div class="md-empty"><span>◎</span><div><b>Your story starts at kickoff.</b><p>${lab ? 'Finished matches appear here in the live game.' : 'Finish a match to see your score, opponent and rewards here.'}</p></div></div>`}</section>`;
  }
  function hubMarkup() {
    return `<section class="md-match-hub"><div class="md-hub-heading"><span class="md-eyebrow">PICK YOUR CHALLENGE</span><h3>Every game is<br>a fresh start.</h3><p>Your real squad. A new opponent. Your next big moment.</p></div><div class="md-mode-grid">${[
      ['Ranked Rush','01','PLAY FOR<br>THE BADGE.','Balanced difficulty · +10 RP per win','ranked'],
      ['Quick Match','02','STRAIGHT TO<br>THE ACTION.','Choose your difficulty · no entry cost','quick'],
      ['Friendly','03','FIND YOUR<br>FOOTBALL.','Learn the controls · no ranked points','friendly']
    ].map(([mode,n,title,description,tone]) => `<button class="md-mode ${tone}" data-matchday-setup="${mode}"><span class="md-mode-number">${n}</span><small>${mode.toUpperCase()}</small><b>${title}</b><p>${description}</p><em>SET UP MATCH <span>↗</span></em></button>`).join('')}</div><div class="md-match-note"><span>⚽ 25 coins per goal</span><span>Win to earn XP</span><span>Local single-player matches</span></div></section>${historyMarkup()}`;
  }
  function show(type, html) {
    dialogType = type;
    content.innerHTML = html;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    content.querySelector('[data-md-primary]')?.focus({preventScroll:true});
  }
  function tacticsMarkup(value) {
    const key = FCMatchday.settings({tactic:value}).tactic, tactic = FCMatchday.tactics[key];
    const positions = [[50,90],[24,72],[50,76],[76,72],[13,49],[38,55],[62,55],[87,49],[22,26],[50,19],[78,26]];
    return `<section class="md-tactics" aria-label="Team tactics"><div class="md-tactics-board" aria-hidden="true"><span class="md-board-half"></span><span class="md-board-circle"></span><span class="md-board-box"></span>${positions.map(([x,y],i)=>`<i style="left:${50+(x-50)*tactic.width}%;top:${i ? y-tactic.depth*5 : y}%" class="${i===0?'keeper':''}">${i+1}</i>`).join('')}<small>↑ ATTACKING DIRECTION</small></div><div class="md-tactics-choice"><span class="md-eyebrow">YOUR GAME PLAN · 3–4–3</span><h3>Make it your game.</h3><div class="md-tactic-buttons" role="group" aria-label="Team mentality">${Object.entries(FCMatchday.tactics).map(([id,item])=>`<button type="button" data-md-tactic="${id}" aria-pressed="${id===key}">${item.label}</button>`).join('')}</div><p>${tactic.description}</p><small>Changes your teammates’ positioning and pressing.</small></div></section>`;
  }
  function timelineMarkup(items) {
    const goals = FCMatchday.goals(items);
    return `<section class="md-timeline"><span class="md-eyebrow">THE GOALS · ${goals.length ? 'LATEST '+goals.length : 'FULL TIME'}</span>${goals.length ? goals.map(goal=>`<div class="${goal.team}"><b>${goal.minute}′</b><i aria-hidden="true">⚽</i><span>${esc(goal.scorer)}${goal.ownGoal?' <small>OWN GOAL</small>':''}</span><small>${goal.team==='home'?'YOUR XI':'OPPONENT'}</small></div>`).join('') : '<p>No goals recorded for this match.</p>'}</section>`;
  }
  function settingsMarkup(ranked = false) {
    return `<fieldset class="md-difficulty"><legend>01 / THE CHALLENGE ${ranked ? '<span>RANKED IS BALANCED</span>' : ''}</legend><div>${Object.entries(FCMatchday.difficulties).map(([key,value]) => `<button type="button" data-md-difficulty="${key}" aria-pressed="${selectedSettings.difficulty === key}" ${ranked && key !== 'balanced' ? 'disabled' : ''}><b>${value.label}</b><small>${value.description}</small></button>`).join('')}</div></fieldset><div class="md-options"><label><span>02 / CAMERA</span><select id="mdCamera"><option value="broadcast" ${selectedSettings.camera === 'broadcast' ? 'selected' : ''}>Broadcast · follow the action</option><option value="wide" ${selectedSettings.camera === 'wide' ? 'selected' : ''}>Tactical · see more of the pitch</option></select></label><label class="md-sound"><input id="mdSound" type="checkbox" ${selectedSettings.sound ? 'checked' : ''}><span>Stadium sound<small>Kick, save and goal effects</small></span></label></div>`;
  }
  function setup(mode = 'Quick Match', overrides = null) {
    if (!dialog) return;
    if (!lab && state.activeMatch) { pause(true); return; }
    activeMode = modes.includes(mode) ? mode : 'Quick Match';
    selectedSettings = FCMatchday.settings(overrides || (lab ? selectedSettings : state.matchSettings));
    if (activeMode === 'Ranked Rush') selectedSettings.difficulty = 'balanced';
    drawSetup();
  }
  function drawSetup() {
    const name = lab ? 'YOUR CLUB' : activeAccount()?.username || 'YOUR CLUB';
    const rating = lab ? '89' : prototypeTeamRating();
    show('setup', `<div class="md-setup-banner"><span class="md-eyebrow">${esc(activeMode.toUpperCase())} · MATCH SETUP</span><h2 id="mdTitle">THIS IS<br>YOUR STAGE.</h2><div class="md-fixture"><span><i>FC</i><b>${esc(name)}</b><small>${rating} OVR · YOUR STARTING XI</small></span><em>VS</em><span><i class="opponent">?</i><b>CHALLENGER XI</b><small>DRAWN AT KICKOFF</small></span></div></div><div class="md-setup-body">${settingsMarkup(activeMode === 'Ranked Rush')}${tacticsMarkup(selectedSettings.tactic)}<div class="md-kickoff-row"><p>90 seconds. Every goal earns 25 coins.<br>${lab ? 'Preview the setup, then enter your live game.' : 'Match settings are saved with your club.'}</p><button class="md-primary" data-md-kickoff data-md-primary>${lab ? 'OPEN LIVE GAME' : 'KICK OFF'} <span>→</span></button></div><details class="md-help"><summary>First match? See the controls <span>+</span></summary>${controls}</details></div>`);
  }
  function consumeSettings(mode) {
    if (!pending || pending.mode !== mode) return null;
    const settings = pending.settings; pending = null;
    return settings;
  }
  function begin() {
    if (dialogType !== 'setup') return;
    selectedSettings = FCMatchday.settings({ ...selectedSettings, camera: content.querySelector('#mdCamera').value, sound: content.querySelector('#mdSound').checked });
    if (activeMode === 'Ranked Rush') selectedSettings.difficulty = 'balanced';
    if (lab) { location.href = FCMatchday.setupLink(activeMode, selectedSettings); return; }
    pending = { mode: activeMode, settings: selectedSettings };
    dialogType = ''; dialog.close();
    if (!prototypePitchOverlay.hidden) closePrototypePitch();
    document.querySelector('#prototypeToast')?.classList.remove('is-visible');
    openPrototypeMatch(activeMode);
  }
  function pause(value = true) {
    if (lab || !state.activeMatch) return;
    const match = state.activeMatch;
    match.userPaused = Boolean(value);
    stopMatchMovement();
    if (value) {
      stopMatchPhysics(); window.match3D?.update(match);
      show('pause', `<div class="md-pause"><span class="md-eyebrow">${esc(match.mode.toUpperCase())} · ${formatMatchClock(match)}</span><h2 id="mdTitle">TAKE A<br>BREATHER.</h2><div class="md-pause-score">${match.home}<span>–</span>${match.away}</div><p>The clock is stopped. Your match is right where you left it.</p><button class="md-primary" data-md-resume data-md-primary>BACK TO THE PITCH →</button><div class="md-pause-options"><button data-md-camera>${match.settings.camera === 'wide' ? 'Tactical camera' : 'Broadcast camera'} ↻</button><button data-md-sound>Sound ${match.settings.sound ? 'on' : 'off'} ↻</button></div>${tacticsMarkup(match.settings.tactic)}<details class="md-help"><summary>Controls <span>+</span></summary>${controls}</details><button class="md-leave" data-md-leave>Leave match · no rewards</button></div>`);
    } else {
      if (dialogType === 'pause') { dialogType = ''; dialog.close(); }
      startMatchPhysics(); window.match3D?.update(match);
    }
    saveState();
  }
  function results(result) {
    if (!result || lab) return;
    const home = result.stats.home, away = result.stats.away;
    const title = {win:'YOU OWNED IT.',draw:'HONOURS EVEN.',loss:'NEXT ONE IS YOURS.'}[result.outcome];
    show('result', `<div class="md-result ${result.outcome}"><span class="md-eyebrow">FULL TIME · ${esc(result.mode.toUpperCase())}</span><h2 id="mdTitle">${title}</h2><div class="md-final-score"><span>YOUR XI</span><b>${result.home}<i>:</i>${result.away}</b><span>${esc(result.opponent)}</span></div><div class="md-rewards"><span><b>+${result.coins}</b> COINS</span><span><b>+${result.xp}</b> XP</span><span><b>+${result.rp}</b> RANK POINTS</span></div><div class="md-stat-table">${[['SHOTS',home.shots,away.shots],['PASSES PLAYED',home.passes,away.passes],['SAVES',home.saves,away.saves],['POSSESSION',result.possession[0]+'%',result.possession[1]+'%']].map(([name,a,b])=>`<div><b>${a}</b><span>${name}</span><b>${b}</b></div>`).join('')}</div>${timelineMarkup(result.goals)}<div class="md-result-actions"><button class="md-primary" data-md-again data-mode="${esc(result.mode)}" data-md-primary>PLAY AGAIN ↗</button><button data-md-home>BACK TO CLUB</button></div></div>`);
  }
  function update(match) {
    if (!match || lab) return;
    if (match === update.lastMatch && match.simulationTime - lastHudTime < .1) return;
    update.lastMatch = match; lastHudTime = match.simulationTime;
    const canvas = document.querySelector('#mdRadar');
    if (!canvas) return;
    const c = canvas.getContext('2d'), w = canvas.width, h = canvas.height;
    c.clearRect(0,0,w,h); c.fillStyle='#081b22dd'; c.fillRect(0,0,w,h);
    c.strokeStyle='#d9fff044'; c.lineWidth=1; c.strokeRect(7,7,w-14,h-14);
    c.beginPath(); c.moveTo(7,h/2);c.lineTo(w-7,h/2);c.stroke();
    c.beginPath(); c.arc(w/2,h/2,11,0,Math.PI*2);c.stroke();
    const dot = (x,y,color,r) => { c.fillStyle=color;c.beginPath();c.arc(7+x/100*(w-14),7+y/100*(h-14),r,0,Math.PI*2);c.fill(); };
    for (const team of ['home','away']) match[team+'Players'].forEach((p,i)=>dot(p.x,p.y,team==='home'?(i===match.controlledPlayerIndex?'#d0ff72':'#60cfff'):'#ff7187',team==='home'&&i===match.controlledPlayerIndex?3.8:2.5));
    dot(match.ballX,match.ballY,'#fff',2.4);
    const data=FCMatchday.stats(match), percent=FCMatchday.possession(match);
    document.querySelector('#mdLiveStats').textContent=`SHOTS ${data.home.shots}–${data.away.shots} · POSSESSION ${percent[0]}%`;
    const status = document.querySelector('#mdMatchStatus');
    if (status) {
      const tactic = FCMatchday.tactics[FCMatchday.settings(match.settings).tactic];
      let message = match.phase === 'goal' ? `${match.goals?.[0]?.scorer || 'Goal'} · ${match.home}–${match.away}` :
        match.phase === 'restart' ? (match.restart?.type || 'Restart').replaceAll('-', ' ') :
        match.displaySeconds >= 4500 ? 'Final stretch · make every touch count' : 'Find space. Move the ball.';
      status.querySelector('b').textContent = tactic.label.toUpperCase();
      status.querySelector('span').textContent = message;
      status.classList.toggle('is-goal', match.phase === 'goal');
      status.classList.toggle('is-late', match.displaySeconds >= 4500 && match.phase === 'play');
    }
  }
  function restore(match) {
    if (lab || !dialog || !match) return;
    const host = document.querySelector('#prototypeMatchHost');
    if (realMatchPanel.parentElement !== host) host.appendChild(realMatchPanel);
    prototypeMatchOverlay.hidden = false;
    document.querySelector('#prototypeMatchMode').textContent = (match.mode || 'Quick Match').toUpperCase();
    if (match.userPaused && (dialogType !== 'pause' || !dialog.open)) pause(true);
  }
  window.FCMatchdayUI = { heroMarkup, hubMarkup, historyMarkup, setup, begin, pause, update, consumeSettings, results, restore };
  document.addEventListener('DOMContentLoaded', () => {
    dialog=document.createElement('dialog'); dialog.id='matchdayDialog'; dialog.className='md-dialog'; dialog.setAttribute('aria-labelledby','mdTitle');
    dialog.innerHTML='<button class="md-dialog-close" aria-label="Close matchday dialog">×</button><div id="mdDialogContent"></div>';
    document.body.appendChild(dialog); content=dialog.querySelector('#mdDialogContent');
    dialog.addEventListener('cancel', event => { event.preventDefault(); if(dialogType==='pause') pause(false); else { dialogType='';dialog.close(); } });
    dialog.querySelector('.md-dialog-close').addEventListener('click',()=>{if(dialogType==='pause')pause(false);else{dialogType='';dialog.close();}});
    dialog.addEventListener('click',event=>{
      const target=event.target.closest('button');if(!target)return;
      if(target.hasAttribute('data-md-tactic')) {
        const tactic = target.dataset.mdTactic;
        if (!Object.hasOwn(FCMatchday.tactics,tactic)) return;
        if (dialogType === 'setup') {
          selectedSettings=FCMatchday.settings({...selectedSettings,tactic,camera:content.querySelector('#mdCamera').value,sound:content.querySelector('#mdSound').checked});
        } else if (dialogType === 'pause' && !lab && state.activeMatch) {
          state.activeMatch.settings.tactic=tactic;
          state.activeMatch.nextTacticalUpdate=0;
          state.matchSettings={...state.activeMatch.settings};saveState();
        } else return;
        content.querySelector('.md-tactics').outerHTML=tacticsMarkup(tactic);
        content.querySelector(`[data-md-tactic="${tactic}"]`).focus({preventScroll:true});
      }
      if(target.hasAttribute('data-md-difficulty')) {
        selectedSettings=FCMatchday.settings({...selectedSettings,camera:content.querySelector('#mdCamera').value,sound:content.querySelector('#mdSound').checked});
        selectedSettings.difficulty=target.dataset.mdDifficulty;drawSetup();content.querySelector(`[data-md-difficulty="${selectedSettings.difficulty}"]`)?.focus();
      }
      if(target.hasAttribute('data-md-kickoff'))begin();
      if(target.hasAttribute('data-md-resume'))pause(false);
      if(target.hasAttribute('data-md-leave')) {dialogType='';dialog.close();closePrototypeMatch();selectPrototypeView('Play');}
      if(target.hasAttribute('data-md-camera')&&!lab&&state.activeMatch){state.activeMatch.settings.camera=state.activeMatch.settings.camera==='wide'?'broadcast':'wide';state.matchSettings={...state.activeMatch.settings};pause(true);}
      if(target.hasAttribute('data-md-sound')&&!lab&&state.activeMatch){state.activeMatch.settings.sound=!state.activeMatch.settings.sound;state.matchSettings={...state.activeMatch.settings};pause(true);}
      if(target.hasAttribute('data-md-again'))setup(target.dataset.mode);
      if(target.hasAttribute('data-md-home')){dialogType='';dialog.close();selectPrototypeView('Play');}
    });
    document.addEventListener('click', event=>{
      const button=event.target.closest('[data-matchday-setup]');if(button)setup(button.dataset.matchdaySetup);
      const report=event.target.closest('[data-md-report]');
      if(report&&!lab) {
        const item=FCMatchday.history(state.matchHistory)[Number(report.dataset.mdReport)];
        if(item?.stats?.home&&item?.stats?.away&&Array.isArray(item.possession))results(item);
      }
    });
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&!lab&&state.activeMatch&&!dialog.open){event.preventDefault();event.stopImmediatePropagation();pause(true);}
    },true);
    if(!lab){
      const toolbar=document.querySelector('#prototypeMatchOverlay .prototype-pitch-toolbar');
      const pauseButton=document.createElement('button');pauseButton.id='mdPauseButton';pauseButton.textContent='Ⅱ Pause';pauseButton.addEventListener('click',()=>pause(true));toolbar.appendChild(pauseButton);
      const radar=document.createElement('div');radar.className='md-radar';radar.innerHTML='<canvas id="mdRadar" width="110" height="156" aria-label="Live pitch radar: cyan teammates, pink opponents, lime controlled player, white ball"></canvas><span>↑ ATTACK</span>';
      document.querySelector('#matchScene').appendChild(radar);
      const status=document.createElement('div');status.id='mdMatchStatus';status.className='md-match-status';status.innerHTML='<b>BALANCED</b><span>Find space. Move the ball.</span>';document.querySelector('#matchScene').appendChild(status);
      const stats=document.createElement('div');stats.id='mdLiveStats';stats.className='md-live-stats';stats.textContent='SHOTS 0–0 · POSSESSION 50%';document.querySelector('.match-scoreboard').after(stats);
      window.addEventListener('fc-stars-match-ended',event=>{if(!event.detail.abandoned){closePrototypeMatch();results(event.detail.result);}});
      const query=new URLSearchParams(location.search), requested=query.get('match');
      if(modes.includes(requested)) {
        const linked={...FCMatchday.settings(state.matchSettings)};
        for(const key of ['difficulty','tactic','camera'])if(query.has(key))linked[key]=query.get(key);
        if(query.has('sound'))linked.sound=query.get('sound')!=='false';
        setup(requested,linked);
      }
      if(state.activeMatch)restore(state.activeMatch);
    }
  });
})();
