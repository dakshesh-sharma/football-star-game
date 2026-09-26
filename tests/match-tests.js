/* Load in the game page, then run runFCMatchTests(). Tests use cloned in-memory
   match state and never save accounts or award rewards. Browser runner: match.html. */
window.runFCMatchTests = function (stage = 5) {
  const P = FCMatchPhysics, dt = P.pitch.step, results = [];
  const check = (name, fn) => { try { fn(); results.push({ name, passed: true }); }
    catch (e) { results.push({ name, passed: false, error: e.message }); } };
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const fresh = () => {
    const m = { home: 0, away: 0, goals: [], homeTeam: buildTeam(), playerX: 50, playerY: 50,
      ballX: 50, ballY: 47, ballHeight: 0, ballVX: 0, ballVY: 0, ballVZ: 0,
      playerFacingX: 0, playerFacingY: -1, playerVX: 0, playerVY: 0, minute: 1,
      lastTouchTeam: 'home', controlledPlayerIndex: 5 };
    normalizeMatchState(m); return m;
  };
  const originalState = state, persist = saveState, sound = playMatchSound;
  state = structuredClone(state); saveState = () => {}; playMatchSound = () => {};
  const saved = { match: originalState.activeMatch, text: sceneGoalText.textContent, keys: [...matchMovementKeys],
    joystick: joystickVector, accumulator: matchAccumulator };
  try {
    matchMovementKeys.clear(); joystickVector = { x: 0, y: 0 };
    check('Moving player cannot overwrite a released pass', () => {
      const m = fresh(); state.activeMatch = m;
      const p = m.homePlayers[m.controlledPlayerIndex];
      P.release(m, p.id, 'home', p.name, 0, -7.5, 0.3);
      m.playerSpeed = 11.5; m.playerVY = -11.5;
      applyControlledDribbleTouch(m, dt, false);
      assert(Math.abs(P.readBall(m).vz + 7.5) < 1e-6, 'Dribble replaced pass velocity');
    });
    check('Whole ball must cross goal line', () => {
      const m = fresh(); P.writeBall(m, { x: 0, z: -13.99, y: 0.18, vx: 0, vz: -2, vy: 0, spin: 0 });
      assert(!P.step(m, dt).boundary, 'Scored before whole ball crossed');
      let event; for (let i = 0; i < 20 && !event; i++) event = P.step(m, dt).boundary;
      assert(event?.type === 'goal' && event.team === 'home', 'Valid goal not detected');
    });
    check('High miss is a goal kick, not a crossbar rebound', () => {
      const m = fresh(); P.writeBall(m, { x: 0, z: -13.9, y: 5, vx: 0, vz: -16, vy: 0, spin: 0 });
      let event; for (let i = 0; i < 10 && !event; i++) event = P.step(m, dt).boundary;
      assert(event?.type === 'goal-kick' && P.readBall(m).vz < 0, 'False crossbar rebound');
    });
    check('Swept post contact produces a rebound', () => {
      const m = fresh(); P.writeBall(m, { x: 3.2, z: -13.5, y: 0.18, vx: 0, vz: -30, vy: 0, spin: 0 });
      let contact; for (let i = 0; i < 5 && !contact; i++) contact = P.step(m, dt).contact;
      assert(contact?.type === 'post' && P.readBall(m).vz > 0, 'Shot passed through post');
    });
    check('Swept crossbar contact produces a rebound', () => {
      const m = fresh(); P.writeBall(m, { x: 0, z: -13.5, y: 2.4, vx: 0, vz: -30, vy: 0, spin: 0 });
      let contact; for (let i = 0; i < 5 && !contact; i++) contact = P.step(m, dt).contact;
      assert(contact?.type === 'bar' && P.readBall(m).vz > 0, 'Shot passed through bar');
    });
    check('Touchline and corner ownership follow last touch', () => {
      const m = fresh(); P.writeBall(m, { x: 9.1, z: 0, y: 0.18, vx: 15, vz: 0, vy: 0, spin: 0 });
      const a = P.step(m, dt).boundary;
      assert(a?.type === 'throw-in' && a.team === 'away', 'Incorrect throw-in');
      m.lastTouchTeam = 'away'; P.writeBall(m, { x: 6, z: -14.1, y: 0.18, vx: 0, vz: -15, vy: 0, spin: 0 });
      const b = P.step(m, dt).boundary;
      assert(b?.type === 'corner' && b.team === 'home', 'Incorrect corner');
    });
    check('Roll stops; bouncing and curve cannot add energy', () => {
      const m = fresh(); P.writeBall(m, { x: 0, z: 0, y: 0.18, vx: 3, vz: 0, vy: 0, spin: 0 });
      for (let i = 0; i < 300; i++) P.step(m, dt);
      assert(P.readBall(m).vx === 0 && P.readBall(m).x > 2, 'Rolling did not coast to rest');
      P.writeBall(m, { x: 0, z: 0, y: 0.2, vx: 2, vz: 0, vy: -3, spin: 0.5 });
      for (let i = 0; i < 3; i++) P.step(m, dt);
      const b = P.readBall(m);
      assert(b.vy > 0 && b.vy < 3 && Math.hypot(b.vx, b.vz) <= 2, 'Impact or curve added energy');
    });
    check('Keeper cannot save their own release', () => {
      const m = fresh(); state.activeMatch = m; const keeper = m.awayPlayers[0];
      m.keeperHold = { team: 'away', time: 0.001 };
      updateKeeperPossession(m, dt);
      const speed = Math.hypot(m.ballVX, m.ballVY);
      resolveGoalkeeperSave(m, 'away');
      assert(!m.keeperHold && Math.hypot(m.ballVX, m.ballVY) === speed, 'Keeper touched own release');
    });
    if (stage >= 2) {
      check('Reversing through 180 degrees changes facing', () => {
        const p = fresh().homePlayers[5]; p.x = p.y = 50; p.facing = Math.PI;
        for (let i = 0; i < 120; i++) steerMatchPlayer(p, 0, 1, 3.2, dt);
        assert(Math.cos(p.facing) > 0.98 && p.vy > 0, 'Player still facing backwards');
      });
      check('World speed is equal along either pitch axis', () => {
        const a = fresh().homePlayers[5], b = structuredClone(a); a.x = a.y = b.x = b.y = 50;
        for (let i = 0; i < 120; i++) { steerMatchPlayer(a, 1, 0, 3.2, dt); steerMatchPlayer(b, 0, 1, 3.2, dt); }
        assert(Math.abs(P.x(a.x) - P.z(b.y)) < 0.001, 'Unequal axis speeds');
      });
      check('Acceleration, braking and stride remain continuous', () => {
        const p = fresh().homePlayers[5]; p.x = p.y = 50;
        steerMatchPlayer(p, 1, 0, 3.2, dt); const first = p.speed;
        for (let i = 0; i < 120; i++) steerMatchPlayer(p, 1, 0, 3.2, dt);
        const x = p.x, phase = p.stride;
        for (let i = 0; i < 120; i++) steerMatchPlayer(p, 0, 0, 3.2, dt);
        assert(first < 0.5 && p.speed < 0.03 && p.x > x && p.stride >= phase, 'Abrupt acceleration/braking');
      });
      check('30/60/120 FPS produce the same match state', () => {
        const states = [30, 60, 120].map(fps => {
          const m = fresh(); state.activeMatch = m; matchAccumulator = 0; matchMovementKeys.add('w');
          for (let i = 0; i < fps; i++) advanceMatch(m, 1 / fps);
          matchMovementKeys.clear(); return m;
        });
        assert(states.every(m => P.distance(m.ballX,m.ballY,states[0].ballX,states[0].ballY) < P.pitch.ballRadius
          && Math.abs(m.displaySeconds - 60) < 0.01), 'Refresh rate changed trajectory/clock');
      });
      check('Cancelling a shot charge cannot kick the ball', () => {
        const m = fresh(); state.activeMatch = m;
        beginShotCharge(); cancelShotCharge(); releaseShotCharge();
        assert(!matchShootCharging && m.ballVX === 0 && m.ballVY === 0, 'Cancellation fired a shot');
      });
    }
    if (stage >= 3) {
      check('Passes choose a receiver and through balls lead the run', () => {
        const m = fresh(), p = m.homePlayers[5], q = m.homePlayers[8];
        m.homePlayers.forEach(unit => { if (unit !== p && unit !== q) unit.role = 'GK'; });
        p.x = 50; p.y = 50; q.x = 65; q.y = 35; q.vx = 1; q.vy = -5;
        const pass = passTarget(m,p,{x:0.5,z:-1}), through = passTarget(m,p,{x:0.5,z:-1},true);
        assert(pass.receiverId === q.id && through.z < pass.z - 1, 'Pass did not select/lead receiver');
      });
      check('Kicks fire at contact time and rebound shots are allowed', () => {
        const m = fresh(); state.activeMatch = m; const p = m.homePlayers[5]; p.x = p.y = 50;
        m.lastShotPosition = {x:50,y:50}; m.lastShotAt = Date.now();
        assert(queuePlayerAction(m,p,'shoot',0.8), 'Rebound shot rejected by previous shot position');
        resolvePlayerActions(m); assert(m.ballVX === 0 && m.ballVY === 0, 'Kick fired before foot contact');
        m.simulationTime = p.action.contactAt; resolvePlayerActions(m);
        assert(Math.hypot(m.ballVX,m.ballVY)>0 && m.lastTouchPlayerId === p.id && m.pendingShooter === p.name,'Wrong contact or scorer identity');
      });
      check('Missed tackle cannot teleport the ball', () => {
        const m = fresh(); state.activeMatch = m; const p=m.homePlayers[5]; p.x=p.y=10;
        queuePlayerAction(m,p,'tackle'); m.simulationTime=p.action.contactAt; resolvePlayerActions(m);
        assert(m.ballX===50 && m.ballY===47 && m.ballVX===0 && m.ballVY===0,'Missed tackle moved ball');
      });
      check('One presser and distinct marking assignments', () => {
        const m = fresh(), owner=m.awayPlayers[5]; m.possessionId=owner.id;
        assignTacticalTargets(m,'home',owner);
        const marks=m.homePlayers.filter(p=>p.markId).map(p=>p.markId);
        assert(m.homePlayers.filter(p=>p.task==='press').length===1,'Multiple pressers');
        assert(new Set(marks).size===marks.length,'Duplicate marking assignments');
      });
      check('Keeper catches soft balls and parries reachable hard shots', () => {
        const m=fresh(); state.activeMatch=m; const p=m.awayPlayers[0]; p.x=50;p.y=8;p.ready=true;
        P.writeBall(m,{x:0,z:P.z(p.y)+0.3,y:0.7,vx:0,vz:-4,vy:0,spin:0});
        resolveGoalkeeperSave(m,'away'); assert(m.keeperHold?.team==='away','Soft catch failed');
        m.keeperHold=null; m.releasePlayerId=null;
        P.writeBall(m,{x:0.1,z:P.z(p.y)+0.3,y:0.7,vx:0,vz:-15,vy:0,spin:0});
        resolveGoalkeeperSave(m,'away'); assert(!m.keeperHold && P.readBall(m).vz>0,'Hard shot was not parried');
      });
    }
    if (stage >= 4) {
      check('All 22 rigs keep attached boots and stable identities when switching', () => {
        assert(window.match3D, 'Three.js/WebGL renderer did not initialize');
        const m=fresh();state.activeMatch=m;window.match3D.update(m);
        const before=window.match3D.inspect().players;
        switchControlledPlayer();
        const after=window.match3D.inspect().players;
        assert(before.length===22 && after.every((p,i)=>p.attachedBoots && p.id===before[i].id && p.mesh===before[i].mesh),'Switch replaced or detached a rig');
      });
    }
    if (stage >= 5) {
      check('Goals score once, credit actual scorer and restart for conceding team', () => {
        const m=fresh();state.activeMatch=m;const p=m.homePlayers[9];
        m.lastTouchPlayerId=p.id;m.lastTouchPlayer=p.name;m.controlledPlayerIndex=2;
        scorePhysicalGoal(m,'home');scorePhysicalGoal(m,'home');
        assert(m.home===1 && m.goals[0].scorer===p.name && m.events.filter(e=>e.type==='goal').length===1,'Duplicate goal or wrong scorer');
        m.simulationTime=m.matchPausedUntil;setupKickoff(m);
        assert(m.phase==='play' && m.possessionId.startsWith('away'),'Wrong kickoff ownership');
        m.lastTouchPlayerId=m.awayPlayers[9].id;scorePhysicalGoal(m,'away');
        assert(m.away===1,'Away goal not scored');
      });
      check('Quick restart takes one second and cannot bounce off an invisible wall', () => {
        const m=fresh();state.activeMatch=m;matchAccumulator=0;
        beginQuickRestart(m,{type:'throw-in',team:'away',x:9.2,z:0});
        for(let i=0;i<60;i++)advanceMatch(m,dt);
        assert(m.phase==='restart' && m.displaySeconds===0,'Restart pause failed');
        for(let i=0;i<63;i++)advanceMatch(m,dt);
        assert(m.phase==='play' && m.lastTouchTeam==='away' && P.readBall(m).vx<0,'Restart failed to return ball infield');
      });
      check('Announcements expire; camera/render counters remain finite', () => {
        const m=fresh();state.activeMatch=m;m.announcement='KICKOFF';m.announcementUntil=1;m.simulationTime=2;
        updateMatchField();assert(sceneGoalText.textContent==='','Persistent kickoff obscures pitch');
        if(window.match3D)assert(window.match3D.inspect().camera.every(Number.isFinite),'Invalid camera');
      });
      check('Older active saves preserve score and normalize players once', () => {
        const m={home:2,away:1,minute:34,homeTeam:buildTeam(),homePlayers:[{x:50,y:91}],controlledPlayerIndex:5,playerX:50,playerY:50};
        normalizeMatchState(m);const id=m.homePlayers[5].id;
        normalizeMatchState(m);
        assert(m.home===2 && m.away===1 && m.homePlayers.length===11 && m.awayPlayers.length===11 && m.homePlayers[5].id===id,'Save migration lost match data');
      });
      check('Full 90-minute simulation stays finite with only one clock', () => {
        const m=fresh();state.activeMatch=m;matchAccumulator=0;
        let frames=0;
        while(m.displaySeconds<5400 && frames++<18000)advanceMatch(m,dt);
        assert(m.displaySeconds>=5400 && frames<18000,'Match clock stalled');
        assert([...m.homePlayers,...m.awayPlayers].every(p=>[p.x,p.y,p.vx,p.vy,p.facing].every(Number.isFinite)),'Non-finite player');
        assert([m.ballX,m.ballY,m.ballHeight,m.home,m.away].every(Number.isFinite),'Non-finite ball or score');
        assert(m.home<20 && m.away<20,'Runaway duplicate scoring');
      });
    }
  } finally {
    state = originalState; saveState = persist; playMatchSound = sound;
    sceneGoalText.textContent = saved.text; window.match3D?.update(saved.match);
    matchMovementKeys.clear(); saved.keys.forEach(key => matchMovementKeys.add(key));
    joystickVector = saved.joystick; matchAccumulator = saved.accumulator;
  }
  return { stage, passed: results.every(r => r.passed), results };
};
