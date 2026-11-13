---

name: better-interface
description: Reviews a screen, flow or whole interface across accessibility, layout, writing, typography, color and UI polish, and returns one ranked report.
---

# Interface

Cross-discipline review. Routes interface to each `better-*` skill, collects evidence, consolidates one ranked verdict.

Owns orchestration only. Rules belong to owners: accessibility `better-accessibility`, structure `better-layout`, copy `better-writing`, type `better-typography`, color `better-colors`, visual polish and motion `better-ui`.

Change-scoped review of uncommitted work, branches, PRs belongs to `interface-review`.

## Evidence, not taste

Press hard on escalation triggers. Leave deliberate project choices alone. Trigger = failure whatever style guide says. Density, radius, voice you disagree with = not a finding.

Report bar = evidence. `Approve` bar = you inspected what you claim inspected.

## 1. Resolve scope first

Infer screen, flow, feature or repo scope from request + workspace. State resolved scope in output.

Cover all of it per domain, including empty, loading, error, narrow-width states where they exist.

Scope too large to inspect credibly → narrow to one complete flow: the one request centers on, else entry path every user passes. State boundary + what excluded. Never imply uninspected surfaces reviewed.

## 2. Send a change to `interface-review`

Request naming branch, PR, commit range or uncommitted changes = change review. Say so, ask user to run `interface-review` (user-invoked, cannot start from here). Never resolve change scope yourself — guessed diff gives report scope nobody can check.

When `interface-review` hands review back, apply everything below. Cap + verdict cover `Introduced` and `Regression` findings only — change whose only findings are `Pre-existing` = `Approve`.

## 3. Recon before judgment

Identify framework, styling system, component library, design tokens, viewports, preview/test command. Write every fix in project's own idiom — never request different stack.

Then read project's own interface docs: `CONTRIBUTING.md`, `CODING_STANDARDS.md`, `AGENTS.md`, `CLAUDE.md`, design-system doc, Storybook docs, interface ADRs. Name which found, or that none.

Documented convention settles taste, never excuses trigger or domain rule violation. What it changes = **where** you report. Guideline/shared token is cause → report once against that source, components as locations.

## 4. Domain skills = sources of truth

Load every owning skill below, complete each domain review before consolidation. Order so foundational failures not hidden by polish:

1. `better-accessibility`
2. `better-layout`
3. `better-writing`
4. `better-typography`
5. `better-colors`
6. `better-ui`

From each take principles, references, verification checks. Its severity ladder + format are for standalone use; this file's replace them.

Owning skill unavailable → mark domain `Not reviewed`, name it, continue. Never recreate rules from memory, substitute neighbour, or claim holistic coverage.

Two skills cover one issue → assign to owner of underlying rule, note secondary effects in **Why** cell.

## 5. Verify what can be verified

Run safe relevant project checks. Inspect rendered interface when runtime behavior or visual judgment matters. Report exact command/interaction + result. Check you cannot run = **Not verified**, never a finding.

## Require evidence

Every finding cites `path/to/file:line` + shows current implementation. Runtime behavior decides result → source alone cannot support visual finding, screenshot alone cannot support code finding.

## Rank by user impact

Shared severity scale:

- `HIGH`: blocks task, misleads user, hides content/controls, data-loss risk, repeated systemic failure.
- `MEDIUM`: meaningfully harms comprehension, efficiency, adaptability, consistency.
- `LOW`: isolated polish, limited task impact.

Within severity, rank by reach + fix value. Token/shared-component fix outranks same symptom in one leaf.

**Escalation triggers.** Owning skill confirms one → `HIGH` on sight, never averaged down because surface minor:

- Interactive control with no accessible name.
- Keyboard-reachable control with no visible focus indicator.
- Control/path reachable by pointer but not keyboard.
- Motion/auto-playing content ignoring `prefers-reduced-motion`.
- Content/control clipped, overlapped, unreachable at 320px width or 200% zoom.
- Body/control text whose rendered contrast pair fails required ratio.
- State/meaning carried by color alone.
- Destructive action with no confirmation, undo or distinct treatment.
- Truncated content with no way to reach full value.
- Content/control reachable only past scroll edge or behind disclosure with no visible cue.
- Error naming no way to recover.
- Semantic color used against meaning (danger hue on non-destructive action).
- State change carried by motion alone, no color/icon/label left when animation does not run.

Triggers rank above every finding. More fire than cap allows → list first, say how many cap excluded. Cap may shorten report, never why blocker unreported.

Triggers set severity, not new rules. Owning skill decides symptom present; this list decides cost.

## Prefer cheaper fix

Severity = how bad. This = which fix to propose. More than one works → take earliest:

1. **Delete.** Separator space would carry, animation on high-frequency interaction, ARIA attribute native element makes redundant, ramp nothing imports.
2. **Use platform.** Native element, native control, browser focus ring, over custom rebuild.
3. **Reuse what project has.** Existing token, spacing step, motion curve, before new value.
4. **Correct value.** Wrong easing, radius, gap, contrast pair — exact value owning skill gives.
5. **Add.** New token, wrapper, media query, ARIA attribute platform cannot supply.

Code under review adds what **Delete** would fix → finding; its **After** is the deletion.

## Consolidate systemic findings

One root cause = one finding, every confirmed location same row. At most 15 findings. Never pad toward cap; short review or no findings valid.

## Review without mutating by default

Review request = read-only. No source edits unless user also asks implement findings. Then keep consolidated report as change scope, re-run relevant verification after.

## Before you finish

| Mistake                                                                 | Fix                                                         |
| ----------------------------------------------------------------------- | ----------------------------------------------------------- |
| Separate findings section per domain                                    | Merge into one table ranked by severity, then reach         |
| Rendering claim whose only evidence is source                           | Inspect rendered state, or mark **Not verified**            |
| Missing accessible name/focus ring rated `MEDIUM` because surface minor | Triggers are `HIGH` on sight                                |
| Coverage row whose evidence cell names no file/component/check          | Inspect that domain, or mark `Not reviewed` with reason     |
| Domain `Clear` although skill never loaded                              | Mark `Not reviewed`, name skill                             |
| Same symptom in several rows, one per component                         | One row against shared token/component, list every location |
| **After** adds wrapper, token or ARIA attribute                         | Check deletion or native element first                      |
| Fix in library/styling system project does not use                      | Rewrite in project's own idiom                              |

## Review output format

Format lives in [review-format.md](review-format.md): scope + coverage, findings table, verification, verdict. Review not finished until findings reported there.
