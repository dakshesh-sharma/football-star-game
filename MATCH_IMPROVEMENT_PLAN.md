# FC Stars: match feel and realism

## Summary

Improve the existing JavaScript/Three.js match in place. Chrome successfully rendered the match and accepted movement input; browser diagnostics reproduced the remaining physics and control bugs.

The five largest problems are:

1. Automatic dribbling overwrites kicks, collision distances use inconsistent scales, and pitch boundaries behave like walls.
2. Players can remain facing backward after reversing; physics, animation and match clocks use different timing.
3. Passes lack receiver awareness, rebound shots face an arbitrary movement restriction, and switching can misattribute goals.
4. AI confuses last touch with possession; goalkeeper contacts can trigger on their own clearances.
5. Players slide, switching remaps their models, animations lack connected joints, and presentation obscures play.

Implement one stage at a time. Each stage must pass its focused tests and a browser play check before starting the next.

## First change: ball contacts and release

- Share pitch, ball and goal dimensions between physics and rendering. Calculate motion and collision distances in Three.js world units; retain percentage conversion only for existing UI/save compatibility.
- Run physics at a fixed 120 Hz with render interpolation. Cap catch-up at 250 ms and pause on tab hiding.
- Separate deliberate dribble touches, receiving, kicks, body deflections and keeper handling. A kick must remain free after release; automatic dribbling must not replace its velocity.
- Preserve momentum through rolling friction, gravity, diminishing bounce and decaying spin. Curve must not increase ball speed.
- Use swept contacts against players, posts and the actual crossbar. Score only when the entire ball crosses the goal line between the posts and beneath the bar.
- Implement the selected quick restarts: approximately one-second automatic throw-ins, corners and goal kicks awarded using the last actual touch. Prevent duplicate restart/goal events.
- Correct keeper release immunity as part of contact handling.
- Make the existing login dialog visible when required by Play, so normal match entry works.

**Gate:** reproduce the current pass-cancellation, false-crossbar and self-save failures; demonstrate that they are fixed in Chrome. Verify rolling, bounce, genuine post rebounds, high/wide misses, goal detection and restart ownership. Report this result before changing movement or AI.

## Subsequent stages

### 2. Movement and match timing

- Correct zero-valued directions and interpolate facing angles through 180-degree turns.
- Preserve acceleration, braking and sprint stamina; use equal world-space speed in every direction.
- Time dribble touches by stride, with longer touches during sprinting and reduced control during sharp turns.
- Derive the displayed clock and full-time decision from one simulation clock.
- Cancel held input and shot charging on blur, pointer cancellation, match exit and interruption.

### 3. Football actions, teammates and keepers

- Keep current keys/buttons. Aim short passes toward suitable teammates; lead runners for through balls and deliver crosses into attacking space.
- Replace the previous-shot-distance restriction with contact availability and action recovery. Resolve kicks and tackles at their animation contact time.
- Give every player a stable identity. Switching transfers control without relocating teammates; scorer attribution follows the actual player.
- Distinguish controlled possession from loose balls. Assign one presser with selection hysteresis; other players support, cover passing lanes, maintain spacing and take distinct marking assignments.
- Let AI receivers cushion suitable passes, carry into space, pass under pressure and shoot from useful positions.
- Predict keeper positioning from the trajectory. Use reaction delay, dive reach and recovery to determine catches/parries; rebounds remain playable.

### 4. Animation

- Retain procedural models; attach boots to articulated legs and animate limbs around appropriate joints.
- Advance gait continuously from distance travelled. Blend running, close control, kicks and tackles using per-player action state.
- Match keeper dive reach to save contacts. Celebrate with the scorer and nearby teammates, then reset formation for kickoff.

### 5. Camera and presentation

- Use elapsed-time camera smoothing, a bounded play focus and gradual zoom. Handle switching and restarts without snaps.
- Correct disconnected pitch markings, improve grass variation, goal nets and player proportions, and remove floating match portraits.
- Keep persistent player meshes, reuse materials/geometries, resize only when needed, and stop rendering hidden matches.
- Retain the compact score/clock, stamina and shot-power HUD. Fade temporary announcements promptly.
- Trigger restrained sound, net movement and shot-camera response from actual contact/goal events, once per event.

## Verification and interfaces

- Keep the existing match entry, squad, reward and account integrations. Preserve `window.match3D.update(match)`; extend its match data with stable player identities, simulation timing and per-player action state.
- Normalize older active-match saves before simulation; preserve score, team selection and earned progression.
- Add a repeatable browser harness using an isolated test account, with fixtures for passing, dribbling, turning, switching, keeper saves and goal/restart sequences.
- Compare identical input sequences at 30, 60 and 120 rendering FPS; trajectories should agree within one ball radius.
- Check keyboard and touch cancellation, held shot power, rebound shots, both teams scoring, repeated match entry/exit, tab suspension and full-time rewards.
- Complete a full browser match and record console errors, frame timing and before/after clips. Target 60 FPS on hardware-accelerated desktop Chrome; do not treat software-rendered headless timing as a hardware performance result.

## Defaults

Preserve 11-a-side play, existing controls, approximately 90-second matches, browser support and the lightweight procedural visual style. Use quick automatic restarts as selected. Limit changes to match behavior and its necessary entry path; do not expand packs, clubs, progression or multiplayer.

## Implementation record

The five stages have been implemented and checked in sequence. See [MATCH_VERIFICATION.md](MATCH_VERIFICATION.md) for the 24-check regression result, live-match outcome, screenshot, current-match clip, and remaining hardware/browser validation limits.
