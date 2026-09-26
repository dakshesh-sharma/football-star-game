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

## Remaining validation limits

This environment required Chrome's SwiftShader software renderer. The live audit's median rendering interval was approximately **117 ms**; this is not evidence of 60 FPS hardware performance. Hardware-accelerated desktop performance, physical touch devices, and other browsers still need manual checks. The gameplay uses procedural animation and lightweight football rules, not a full professional football simulation.
