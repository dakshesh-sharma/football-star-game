/* Match-only physics. Save/UI coordinates remain percentages; all calculations here
   use the same world units as the Three.js pitch. No rendering or account dependencies. */
(() => {
  const pitch = Object.freeze({ halfWidth: 9, halfLength: 14, goalHalfWidth: 3.2,
    goalHeight: 2.4, postRadius: 0.09, ballRadius: 0.18, playerRadius: 0.27,
    gravity: 9.81, rollingDeceleration: 1.6, airDrag: 0.1, restitution: 0.48, step: 1 / 120 });
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const x = n => (n - 50) * 0.18;
  const z = n => (n - 50) * 0.28;
  const percentX = n => n / 0.18 + 50;
  const percentZ = n => n / 0.28 + 50;
  const distance = (ax, az, bx, bz) => Math.hypot((ax - bx) * 0.18, (az - bz) * 0.28);
  function readBall(m) {
    return { x: x(m.ballX), z: z(m.ballY), y: pitch.ballRadius + (m.ballHeight || 0),
      vx: (m.ballVX || 0) * 0.18, vz: (m.ballVY || 0) * 0.28, vy: m.ballVZ || 0, spin: m.ballSpin || 0 };
  }
  function writeBall(m, b) {
    m.ballX = percentX(b.x); m.ballY = percentZ(b.z);
    m.ballHeight = Math.max(0, b.y - pitch.ballRadius);
    m.ballVX = b.vx / 0.18; m.ballVY = b.vz / 0.28; m.ballVZ = b.vy; m.ballSpin = b.spin;
  }
  function release(m, playerId, team, name, vx, vz, vy = 0, spin = 0) {
    m.ballVX = vx / 0.18; m.ballVY = vz / 0.28; m.ballVZ = vy; m.ballSpin = spin;
    m.releasePlayerId = playerId; m.releaseUntil = (m.simulationTime || 0) + 0.34;
    m.lastTouchTeam = team; m.lastTouchPlayer = name; m.lastTouchPlayerId = playerId;
    m.possessionId = null; m.pendingShooter = null;
  }
  function protectedRelease(m, id) {
    return m.releasePlayerId === id && (m.simulationTime || 0) < (m.releaseUntil || 0);
  }
  // First intersection of a moving point and a circle. Used for posts, bar and bodies.
  function sweep(ax, ay, bx, by, cx, cy, radius) {
    const dx = bx - ax, dy = by - ay, ox = ax - cx, oy = ay - cy;
    const c = ox * ox + oy * oy - radius * radius;
    if (c < 0) return 0;
    const a = dx * dx + dy * dy;
    if (a < 1e-12) return null;
    const b = 2 * (ox * dx + oy * dy), disc = b * b - 4 * a * c;
    if (disc < 0) return null;
    const t = (-b - Math.sqrt(disc)) / (2 * a);
    return t >= 0 && t <= 1 ? t : null;
  }
  function frameHit(start, end) {
    let hit = null;
    const consider = candidate => { if (candidate && (!hit || candidate.t < hit.t)) hit = candidate; };
    const radius = pitch.ballRadius + pitch.postRadius;
    for (const endSign of [-1, 1]) {
      const goalZ = endSign * pitch.halfLength;
      for (const side of [-1, 1]) {
        const postX = side * pitch.goalHalfWidth;
        const t = sweep(start.x, start.z, end.x, end.z, postX, goalZ, radius);
        if (t === null) continue;
        const cy = start.y + (end.y - start.y) * t;
        if (cy < -pitch.ballRadius || cy > pitch.goalHeight + pitch.ballRadius) continue;
        const nx = start.x + (end.x - start.x) * t - postX;
        const nz = start.z + (end.z - start.z) * t - goalZ;
        const len = Math.hypot(nx, nz) || 1;
        consider({ t, nx: nx / len, ny: 0, nz: nz / len, kind: 'post' });
      }
      const t = sweep(start.z, start.y, end.z, end.y, goalZ, pitch.goalHeight, radius);
      if (t !== null && Math.abs(start.x + (end.x - start.x) * t) < pitch.goalHalfWidth) {
        const nz = start.z + (end.z - start.z) * t - goalZ;
        const ny = start.y + (end.y - start.y) * t - pitch.goalHeight;
        const len = Math.hypot(ny, nz) || 1;
        consider({ t, nx: 0, ny: ny / len, nz: nz / len, kind: 'bar' });
      }
    }
    return hit;
  }
  function bodyHit(m, start, end, players) {
    let hit = null;
    for (const p of players) {
      if (p.role === 'GK' || protectedRelease(m, p.id)) continue;
      const px = x(p.x), pz = z(p.y);
      const t = sweep(start.x, start.z, end.x, end.z, px, pz, pitch.playerRadius + pitch.ballRadius);
      if (t === null || start.y + (end.y - start.y) * t > 1.05) continue;
      let nx = start.x + (end.x - start.x) * t - px;
      let nz = start.z + (end.z - start.z) * t - pz;
      const len = Math.hypot(nx, nz);
      if (len < 1e-6) { nx = 0; nz = p.team === 'home' ? -1 : 1; }
      else { nx /= len; nz /= len; }
      const incoming = (end.vx - (p.vx || 0) * 0.18) * nx + (end.vz - (p.vy || 0) * 0.28) * nz;
      if (incoming >= -0.05) continue;
      if (!hit || t < hit.t) hit = { t, nx, ny: 0, nz, kind: 'body', player: p, incoming };
    }
    return hit;
  }
  function integrate(b, dt) {
    const airborne = b.y > pitch.ballRadius + 0.002 || b.vy > 0.05;
    const speed = Math.hypot(b.vx, b.vz);
    const nextSpeed = airborne ? speed * Math.exp(-pitch.airDrag * dt) : Math.max(0, speed - pitch.rollingDeceleration * dt);
    const angle = b.spin * (airborne ? 0.9 : 0.12) * dt;
    const scale = speed > 0 ? nextSpeed / speed : 0;
    const vx = b.vx;
    b.vx = (vx * Math.cos(angle) - b.vz * Math.sin(angle)) * scale;
    b.vz = (b.vz * Math.cos(angle) + vx * Math.sin(angle)) * scale;
    b.spin *= Math.exp(-(airborne ? 0.45 : 1.8) * dt);
    b.x += b.vx * dt; b.z += b.vz * dt;
    if (airborne) { b.vy -= pitch.gravity * dt; b.y += b.vy * dt; }
    if (b.y <= pitch.ballRadius) {
      b.y = pitch.ballRadius;
      if (b.vy < -0.85) { b.vy *= -pitch.restitution; b.vx *= 0.9; b.vz *= 0.9; }
      else b.vy = 0;
    }
  }
  function boundary(m, start, b) {
    const r = pitch.ballRadius;
    const crossings = [];
    for (const sign of [-1, 1]) {
      const endLine = sign * (pitch.halfLength + r);
      if (sign * b.z > pitch.halfLength + r && sign * start.z <= pitch.halfLength + r) {
        const t = (endLine - start.z) / (b.z - start.z);
        const cx = start.x + (b.x - start.x) * t, cy = start.y + (b.y - start.y) * t;
        const goal = Math.abs(cx) + r < pitch.goalHalfWidth - pitch.postRadius && cy + r < pitch.goalHeight - pitch.postRadius;
        const defendingTeam = sign < 0 ? 'away' : 'home';
        crossings.push({ t, type: goal ? 'goal' : m.lastTouchTeam === defendingTeam ? 'corner' : 'goal-kick',
          team: goal || m.lastTouchTeam === defendingTeam ? (defendingTeam === 'home' ? 'away' : 'home') : defendingTeam,
          x: cx, z: sign * pitch.halfLength, endSign: sign });
      }
      const touchLine = sign * (pitch.halfWidth + r);
      if (sign * b.x > pitch.halfWidth + r && sign * start.x <= pitch.halfWidth + r) {
        const t = (touchLine - start.x) / (b.x - start.x);
        crossings.push({ t, type: 'throw-in', team: m.lastTouchTeam === 'home' ? 'away' : 'home',
          x: sign * pitch.halfWidth, z: clamp(start.z + (b.z - start.z) * t, -13.5, 13.5) });
      }
    }
    return crossings.sort((a, b) => a.t - b.t)[0] || null;
  }
  function step(m, dt, players = []) {
    const b = readBall(m), start = { ...b };
    integrate(b, dt);
    const frame = frameHit(start, b), body = bodyHit(m, start, b, players);
    const hit = frame && (!body || frame.t < body.t) ? frame : body;
    let contact = null;
    if (hit) {
      const incoming = b.vx * hit.nx + b.vy * hit.ny + b.vz * hit.nz;
      if (incoming < 0 || hit.kind === 'body') {
        const p = hit.player;
        const receive = p && Math.hypot(b.vx, b.vz) < 9 && b.y < 0.65;
        const bounce = p ? (receive ? 1.05 : 1.42) : 1.72;
        const relative = p ? hit.incoming : incoming;
        b.vx -= bounce * relative * hit.nx; b.vy -= bounce * relative * hit.ny; b.vz -= bounce * relative * hit.nz;
        if (receive) { b.vx *= 0.3; b.vz *= 0.3; }
        b.x = start.x + (b.x - start.x) * hit.t + hit.nx * 0.012;
        b.y = Math.max(pitch.ballRadius, start.y + (b.y - start.y) * hit.t + hit.ny * 0.012);
        b.z = start.z + (b.z - start.z) * hit.t + hit.nz * 0.012;
        if (p) {
          m.lastTouchPlayerId = p.id; m.lastTouchTeam = p.team; m.lastTouchPlayer = p.name;
          m.releasePlayerId = p.id; m.releaseUntil = (m.simulationTime || 0) + 0.12;
          m.possessionId = receive ? p.id : null; m.pendingShooter = null;
        }
        contact = { type: receive ? 'receive' : hit.kind, playerId: p?.id };
      }
    }
    writeBall(m, b);
    return { contact, boundary: boundary(m, start, b) };
  }
  window.FCMatchPhysics = Object.freeze({ pitch, x, z, percentX, percentZ, distance, readBall, writeBall, release, protectedRelease, step, sweep });
})();
