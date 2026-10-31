# FC Stars match verification

Verified in Chrome on 10 September 2026. The existing static JavaScript/Three.js project was improved in place; no build system or runtime dependency was added.

## Staged results

1. **Ball contacts:** 8 focused checks passed before movement work. Released passes retain their velocity, real post/bar rebounds work, high misses restart correctly, and keepers cannot immediately save their own clearance.
2. **Movement:** 13 cumulative checks passed before AI work. Reversals, acceleration, braking, equal axis speeds, cancellation, and equivalent 30/60/120 FPS input sequences were checked.
3. **Actions and AI:** 18 cumulative checks passed before animation work. Pass targets and leads, delayed foot contact, rebound shots, missed tackles, distinct marks, and keeper catches/parries were checked.
4. **Animation:** Browser inspection verified 22 persistent player rigs, attached boots, and unchanged mesh/player identities after switching.
5. **Presentation and integration:** All **24 regression checks pass**, with **zero Runtime.exceptionThrown events** during the final automated run. These include a full fixed-step 90-minute simulation, both teams scoring, scorer attribution after switching, quick restarts, announcement expiry, and older/partial active-save normalization.

## Live browser checks

- A naturally progressing browser match finished **1–1 after 98.0 seconds**, including goal/restart pauses. Both teams produced attacks; observed events included shots, keeper saves, catches, and a post rebound.
- Full time awarded **25 coins** for the home goal. Calling end again did not award the reward twice. The renderer stopped after full time.
- Rapid leave/re-entry survived the previous match's delayed close callback.
- The match-required login dialog was visible; login completion started the match.
- Real browser keyboard events exercised movement, held shot power, and player switching. Blur cancelled the charge without firing.
- Browser-emulated touch exercised joystick movement, touch cancellation, and shot-charge cancellation.
- Exercising the visibility handler paused simulation/rendering without advancing the clock; resuming did not fast-forward the hidden interval.
- Desktop layout was inspected at 1120×800. Portrait layout was checked at 390×844 with no horizontal overflow.
- `git diff --check` passed for the modified tracked match files.

## Evidence

- [Current match screenshot](tests/artifacts/match-after.png)
- [Eight-second current-match clip](tests/artifacts/match-after.webm)

The original baseline was inspected and its failures reproduced before implementation, but no pre-change video was saved. The current clip is not a before/after comparison.

## Repeat the checks

Serve the project from its existing directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/tests/match.html` and click **Run regression checks**. Use a separate browser profile: fixtures clone state and suppress persistence, but ordinary gameplay still saves to that profile.

For command-line verification, open the local game in a dedicated Chrome profile with remote debugging enabled, then run:

```sh
python3 tests/run-browser-checks.py --port 9226
```

The runner uses Python's standard library, selects a loopback game page, reports each assertion and runtime errors, and returns a nonzero exit code on failure.

## Prototype visibility follow-up

Verified again in Chrome on 12 October 2026 after synchronising `prototypes.html` with the live dashboard. The laptop breakpoint now shows the stadium dashboard instead of hiding it behind the phone mockup. Desktop navigation, pack walkout and squad switching pass alongside all existing phone interactions at 1440×1000 and 390×844, with zero runtime exceptions. The live regression suite also passes all 24 match checks and all 24 full-game checks.

The login screen now exposes both previously hidden entry points: **Open Interactive Prototype** and **Try Prime Ronaldo**. The Prime flow was clicked in an isolated browser profile and verified to create/open the showcase club, select the real local `∞ × ∞` card at striker, filter the inventory to Prime Ronaldo, and open the squad editor. The updated suite passes 24 match checks and 25 game checks with zero runtime exceptions.

## Remaining validation limits

This environment required Chrome's SwiftShader software renderer. The live audit's median rendering interval was approximately **117 ms**; this is not evidence of 60 FPS hardware performance. Hardware-accelerated desktop performance, physical touch devices, and other browsers still need manual checks. The gameplay uses procedural animation and lightweight football rules, not a full professional football simulation.

## Interface polish — 18 October 2026

The live game and standalone prototype share `polish.css`, with readable type, consistent surfaces, a complete 3–4–3 squad overview and mobile bottom navigation. Pack descriptions now reflect the actual available-player pool; prototype draws are labelled as previews.

Fixed repeated pack purchases while a reveal is pending, Escape handling on the standalone prototype, blocked-storage errors during colour changes, cancelled joystick pointers, and navigation state when moving between desktop and phone layouts. Dialogs trap keyboard focus and restore it to the opening control.

Verified the release checkout in an isolated Chrome profile:

- 24 match and 29 full-game regression checks passed, including two new checks for repeated pack requests/refunds and selecting any of eleven squad positions.
- 22 desktop and 19 phone prototype interaction checks passed with no runtime exceptions.
- All six main screens fit 1440px and 390px viewports; prototype screens also fit 320px without horizontal overflow or broken visible images.
- Pack focus, Tab containment, Escape dismissal and focus restoration passed. Prototype Escape, blocked local storage, pointer cancellation and synchronized navigation passed.
- A live match rendered 22 players with a finite camera and advancing clock at 390×844. Match overlays cover the mobile navigation correctly.

Hardware performance and physical touch devices were not tested. The existing match physics and account/reward systems are unchanged.

## Matchday upgrade — 24 October 2026

The main game and prototype now share a matchday home screen and match centre. Quick Match and Friendly expose Relaxed, Balanced and Competitive opponents; Ranked Rush fixes the challenge to Balanced. Setup also selects broadcast/tactical cameras and stadium audio.

Matches have an on-screen radar, event-driven shot/pass/save totals, possession measured from controlled-ball time, and pause/resume with shot-input cancellation. Full time shows the score, stats, awarded coins/XP/RP, and a replay action. Each club keeps its ten most recent completed matches; leaving does not grant rewards or add a completed result. Saved paused games restore the match panel and retain their score and stats.

The stadium rendering pass batches animated player parts, adds pitch texture, corner flags, advertising boards and lighting, and retains player identities. Per-instance team colours do not require geometry vertex colours. The radar is explicitly exempted from the legacy rule hiding old 2D match objects.

Validation in an isolated Chrome profile:

- All 24 match and 29 existing game regression checks pass.
- All 12 new matchday checks pass (`python3 tests/run-browser-checks.py --matchday`), covering settings/migration, difficulty, pause/input cancellation, rewards/history, escaped opponent names, saved-match restoration, and visible radar/render lifecycle.
- All 22 desktop and 19 phone prototype checks pass.
- Live renderer inspection reports 22 players, a finite camera, 68 draw calls in the inspected frame, and no runtime exceptions. This is a draw-call measurement, not a hardware FPS guarantee.
- Desktop and phone setup screens were inspected visually, and team kit colours and radar visibility were checked in the actual rendered match.
- An unattended match reached full time naturally, displayed its result, saved history, and stopped rendering without a runtime exception.
- Native Escape pause/resume and a page reload preserved the paused match clock. The phone controls use two rows so all eight actions and the power meter fit at 390×844.

Physical-device performance and browsers other than Chrome remain unverified.

## Tactics upgrade — 26 October 2026

Balanced, Attack and Defend are selectable from a shared visual tactics board in the main game and prototype. Attack raises and widens supporting positions and uses two pressers; Defend lowers and narrows supporting positions. Targets stay inside the existing pitch bounds. Tactics can change while paused without changing the score or clock, and Ranked retains its fixed opponent difficulty.

The match HUD shows the active tactic, scorer during goals, restarts and the final stretch. Completed results preserve the latest twelve goals in chronological order, with own goals identified. Recent results offer a report button that reopens the stats and timeline without granting rewards again. Older saved results remain readable.

Prototype-to-game links now carry difficulty, tactic, camera and sound choices. Restoring a paused match also reopens its resume dialog when that dialog was previously closed.

Validation in isolated Chrome:

- 24 match and 29 game regression checks passed, with no runtime exceptions.
- 18 matchday checks passed, including six new checks for actual tactical targets/pressing, saved tactics, prototype links, goal history, report rewards, pause restoration and visible status.
- 22 desktop and 19 phone prototype interaction checks passed.
- Visually inspected desktop and phone setup and the live phone match. All eight match buttons fit at 390×844; the tactical camera, radar, active tactic and renderer were visible.

Physical touch devices and browsers other than Chrome remain unverified.


## Champions Rise — 31 October 2026

Season 02 adds a seven-stage Champions Journey using the existing 11 v 11 match engine. Each fixture has a named opponent and fixed difficulty; only a win unlocks the next stage. Draws and losses can be retried. First-win stage bonuses total 1,400 coins, in addition to the existing goal rewards.

All completed match modes earn separate Season XP: 50 for completion, 40 for a win, and 10 per goal up to five goals per match. Ten free tiers unlock every 150 XP and grant 2,000 coins in total. Rewards require an explicit claim and cannot be claimed twice. Eight trophies track season achievements; Champion 02 and Season Legend also unlock profile titles. Leaving a match grants no season progress.

Progress lives in the existing per-club save. Migration preserves old inventories and currencies; account merges preserve higher season progress and the union of claimed tiers. Saved paused career matches retain their stage and opponent. The Home and Season screens expose the journey, reward pass, trophy cabinet and season statistics on desktop and mobile.

Validation uses isolated Chrome profiles and fixture persistence is disabled. Run the new suite with `python3 tests/run-browser-checks.py --port 9232 --season`; add `--width 390 --height 844` for the phone viewport. It covers migrations, independent clubs, real fixture setup, all seven stages, payouts, retry/abandon behavior, reward gates and repeat claims, trophy rules, reports, account merging and saved-match restoration.

Existing regression suites: 24 match, 29 full-game and 18 matchday checks passed with no runtime exceptions. The new season suite passed 17 checks on desktop and, after fixing the final-cup return tab, all 17 in the 390px phone viewport. All seven main screens and all three season tabs also fit 320px without horizontal overflow. Final phone checks and UI screenshot capture used a separate Chrome profile with WebGL disabled because GPU-backed capture and later emulation stalled; that profile reports the expected Three.js WebGL-context initialization exception. Match rendering and the existing gameplay checks ran separately with SwiftShader enabled and no runtime exceptions. Physical touch devices and hardware-accelerated performance remain unverified.
