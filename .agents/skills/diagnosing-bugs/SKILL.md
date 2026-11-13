---

name: diagnosing-bugs
description: Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports something broken/throwing/failing/slow.
---

# Diagnosing Bugs

Discipline for hard bugs. Skip phases only when explicitly justified.

Exploring codebase → read `GLOSSARY.md` (if exists) for mental model of relevant modules; check ADRs in area touched.

## Redact

Skill shows commands, outputs, captured artifacts. **Redact every secret first**: `<REDACTED>` in place. Build loops against env vars — credential stays in environment, not in what you show. Captured artifacts carry auth headers: quote only signal-carrying lines.

Redacted output not enough to diagnose → say so, ask user.

## Phase 1: Build feedback loop

**This is the skill.** Everything else mechanical. Tight pass/fail signal for bug (goes red on _this_ bug) → cause found; bisection, hypothesis-testing, instrumentation all just consume it. No signal → no staring at code saves you.

Spend disproportionate effort here. **Aggressive. Creative. Refuse to give up.**

### Ways to build one, roughly in order

1. **Failing test** at seam reaching bug: unit, integration, e2e.
2. **Curl / HTTP script** against running dev server.
3. **CLI invocation** with fixture input, diff stdout against known-good snapshot.
4. **Headless browser script** (Playwright / Puppeteer) driving UI, asserting DOM/console/network.
5. **Replay captured trace.** Real network request/payload/event log to disk; replay through code path isolated.
6. **Throwaway harness.** Minimal system subset (one service, mocked deps) exercising bug path via single function call.
7. **Property / fuzz loop.** "Sometimes wrong output" → 1000 random inputs, look for failure mode.
8. **Bisection harness.** Bug between two known states (commit, dataset, version) → automate "boot at state X, check, repeat" for `git bisect run`.
9. **Differential loop.** Same input through old vs new version (or two configs), diff outputs.
10. **HITL bash script.** Last resort. Human must click → drive them with `scripts/hitl-loop.template.sh`, loop still structured, captured output feeds back.

Right loop built → bug 90% fixed.

### Tighten the loop

Loop is product. Once have _a_ loop, tighten:

- Faster? (Cache setup, skip unrelated init, narrow test scope.)
- Sharper signal? (Assert specific symptom, not "didn't crash".)
- More deterministic? (Pin time, seed RNG, isolate filesystem, freeze network.)

30-second flaky loop barely better than none; 2-second deterministic = debugging superpower.

### Non-deterministic bugs

Goal not clean repro but **higher reproduction rate**. Loop trigger 100×, parallelise, add stress, narrow timing windows, inject sleeps. 50%-flake debuggable; 1% not — keep raising rate till debuggable.

### When genuinely cannot build loop

Stop, say so explicitly. List what tried. Ask user for: (a) access to reproducing environment, (b) redacted captured artifact (HAR, log dump, core dump, screen recording with timestamps), (c) permission for temporary production instrumentation. Do **not** hypothesise without loop.

### Completion criterion: tight loop that goes red

Phase 1 done when loop **tight** + **red-capable**: name **one command** (script path, test invocation, curl) already run at least once (show invocation + output, redacted), that is:

- [ ] **Red-capable**: drives actual bug code path, asserts **user's exact symptom** — can go red on this bug, green once fixed. Not "runs without erroring"; must catch this specific bug.
- [ ] **Deterministic**: same verdict every run (flaky bugs: pinned high reproduction rate, per above).
- [ ] **Fast**: seconds, not minutes.
- [ ] **Agent-runnable**: runs unattended; human only via `scripts/hitl-loop.template.sh`.

Reading code to build theory before this command exists → **stop: jumping to hypothesis is exact failure this skill prevents.** No red-capable command, no Phase 2.

## Phase 2: Reproduce + minimise

Run loop. Watch red as bug appears.

Confirm:

- [ ] Loop produces failure mode **user** described, not different nearby failure. Wrong bug = wrong fix.
- [ ] Failure reproducible across runs (non-deterministic: high enough rate to debug against).
- [ ] Exact symptom captured (error message, wrong output, slow timing) so later phases verify fix addresses it.

### Minimise

Red → shrink repro to **smallest scenario still red**. Cut inputs, callers, config, data, steps **one at a time**, re-run loop each cut, keep only load-bearing for failure.

Why: minimal repro shrinks Phase 3 hypothesis space (fewer moving parts) + becomes clean regression test in Phase 5.

Done when **every remaining element load-bearing**: removing any one makes loop go green.

No Phase 3 until reproduced **and** minimised.

## Phase 3: Hypothesise

Generate **3–5 ranked hypotheses** before testing any. Single-hypothesis generation anchors on first plausible idea.

Each falsifiable: state prediction.

> Format: "If <X> is cause, then <changing Y> makes bug disappear / <changing Z> makes it worse."

Can't state prediction → hypothesis is vibe: discard or sharpen.

**Show ranked list to user before testing.** Domain knowledge re-ranks instantly ("we just deployed change to #3") or knows ruled-out hypotheses. Cheap checkpoint, big saver. Don't block; proceed with your ranking if user AFK.

## Phase 4: Instrument

Each probe maps to specific Phase 3 prediction. **One variable at a time.**

Tool preference:

1. **Debugger / REPL inspection** if env supports. One breakpoint beats ten logs.
2. **Targeted logs** at boundaries distinguishing hypotheses.
3. Never "log everything and grep".

**Tag every debug log** unique prefix, e.g. `[DEBUG-a4f2]`. Cleanup = single grep. Untagged logs survive; tagged die.

**Perf branch.** Performance regressions → logs usually wrong. Establish baseline (timing harness, `performance.now()`, profiler, query plan), then bisect. Measure first, fix second.

## Phase 5: Fix + regression test

Regression test **before fix**, but only if **correct seam** exists.

Correct seam exercises **real bug pattern** as occurs at call site. Only seam too shallow (single-caller test when bug needs multiple callers, unit test can't replicate triggering chain) → regression test there gives false confidence.

**No correct seam = itself the finding.** Codebase architecture prevents bug lockdown. Flag for next phase.

Correct seam exists:

1. Turn minimised repro into failing test at seam.
2. Watch fail. Forced red by mutating code/fixture → `diff` vs pristine copy to prove mutation landed before trusting.
3. Apply fix.
4. Watch pass.
5. Re-run Phase 1 loop against original (un-minimised) scenario.

## Phase 6: Cleanup

Required before declaring done:

- [ ] Original repro no longer reproduces (re-run Phase 1 loop)
- [ ] Regression test passes (or absent seam documented)
- [ ] All `[DEBUG-...]` instrumentation removed (`grep` prefix)
- [ ] Throwaway prototypes deleted (or moved to clearly-marked debug location)
- [ ] Correct hypothesis stated in commit / PR message, so next debugger learns
