---

name: wayfinder
description: Plan a huge chunk of work (more than one agent session can hold) as a shared map of decision tickets on your issue tracker, and resolve them one at a time until the way to the destination is clear.
disable-model-invocation: true
---

Loose idea arrived, too big for one session, wrapped in fog: way from here to **destination** not visible. Wayfinding = finding that way, not charging at destination. Charts way as **shared map** on repo's issue tracker, works **decision tickets** (questions whose resolution is decision, not build slices) one at a time till route clear.

Destination varies per effort; naming it = first act of charting, shapes every ticket. Might be spec to hand off, decision to lock before planning, or in-place change like data-structure migration. Map domain-agnostic: engineering, course content, whatever fits shape.

## Plan, don't do

Wayfinder = **planning** default: each ticket resolves decision, map done when way clear, nothing left to decide before someone does thing. Pull to just do work = usually signal reached map edge, time to hand off. Effort can override in **Notes**, carrying execution into map; absent that produce decisions, not deliverables.

## Refer by name

Every map + ticket = issue, has **name**: its title. In everything human reads (narration, map's Decisions-so-far) refer by name, never bare id/number/slug. Wall of `#42, #43, #44` illegible; names read at glance. Id + URL don't vanish — name wraps link, they ride inside name, never stand in for it.

## The Map

Map = single issue on repo's issue tracker, label `wayfinder:map`, canonical artifact. Tickets = child issues of map.

Map = **index**, not store. Lists decisions made, points at tickets holding detail; decision lives in exactly one place — its ticket. Map never restates, only gists + links.

**Where map, child tickets, blocking, frontier queries physically live = tracker-specific.** Issue tracker should have been provided. Not provided → tell user run `/setup-matt-pocock-skills`. Consult tracker doc's "Wayfinding operations" section for repo's expression. No tracker → default local-markdown tracker.

### Map body

Whole map at low resolution, loaded once per session. Open tickets NOT listed — open child issues, found by query.

```markdown
## Destination

<what reaching end looks like: spec, decision, or change effort finding way to. One-two lines; every session orients before choosing ticket.>

## Notes

<domain; skills every session should consult; standing preferences for effort>

## Decisions so far

<!-- index: one line per closed ticket, enough to judge relevance, zoom link for detail ticket holds -->

- [<closed ticket title>](link): <one-line gist of answer>

## Not yet specified

<!-- "Fog of war": in-scope fog can't ticket yet; graduates as frontier advances -->

## Out of scope

<!-- work ruled beyond destination; closed, never graduates -->
```

### Tickets

Each ticket = **child issue** of map; tracker issue id = identity. Body = question, sized to one 100K token session:

```markdown
## Question

<decision or investigation ticket resolves>
```

Each carries `wayfinder:<type>` label: `research`, `prototype`, `grilling`, `task` (see Ticket Types). `wayfinder:` labels = only labels map + tickets carry, never triage label like `ready-for-agent`: decisions, not implementation work.

Session **claims** ticket by assigning to dev driving map, **first**, before any work — concurrent sessions skip it. Assignee _is_ claim: open unassigned ticket = unclaimed.

Blocking = tracker's **native** dependency: essential — renders frontier _visually_ in tracker UI, human sees takeable without opening map. Tracker lacking native blocking → body convention fallback. Ticket **unblocked** when every blocker closed; **frontier** = open, unblocked, unclaimed children = edge of known.

Answer not part of body; recorded on resolution (see Work through map). Assets created resolving ticket linked from issue, not pasted in.

## Ticket Types

Every ticket **HITL** (human in loop, worked _with_ human who speaks for themselves) or **AFK** (agent alone). HITL resolves only through live exchange; agent never stands in for human's side (grilling agent answering own questions = broken).

- **Research** (AFK): Reading docs, third-party APIs, local resources like knowledge bases to surface fact decision waits on. Resolved by subagent calling Skill tool "research". Use when knowledge outside current working dir required.
- **Prototype** (HITL): Raise fidelity of discussion via cheap rough concrete artifact to react to (outline, rough take, stub, UI/logic code) — Skill tool "prototype". Links prototype as asset. Use when "how should it look/behave" = key question.
- **Grilling** (HITL): Conversation. Default case. Always Skill tool twice: "grilling" + "domain-modeling".
- **Task** (HITL or AFK): Manual work that must happen before _decision_ can be made: nothing to decide/prototype/research, but discussion blocked till done. Signing up for service so API judgeable, provisioning access, moving data so shape visible. One type that _does_ rather than decides — earns place unblocking decision, not delivering destination. Agent drives alone where can (AFK); else hands human precise checklist (HITL). Resolved when done; answer records what done + resulting facts (credentials location, new URLs, row counts) later tickets depend on.

## Fog of war

Map _deliberately_ incomplete: don't chart what can't see. Beyond live tickets = **fog of war**: dim view of coming decisions/investigations, can't pin down — hang on open questions. Resolving ticket clears fog ahead, graduating specifiable into fresh tickets one at a time, till way clear, no tickets remain.

Map's **Not yet specified** = where dim view written: suspected question, area to revisit. Undiscovered frontier _toward_ destination: all in scope, not sharp enough to ticket. Write as loosely/fully as view allows; doubles as signpost for collaborators.

**Fog or ticket?** Test = can state question precisely now, _not_ whether can answer now.

- **Ticket when** question already sharp, even blocked, can't act yet.
- **Not yet specified when** can't phrase that sharply. Don't pre-slice fog ticket-sized: coarser than ticket, one patch may graduate into several tickets or none.

**Not yet specified** excludes decided (Decisions so far), live tickets, out of scope.

## Out of scope

Fog gathers only _toward_ destination. Destination fixes scope → work beyond = **out of scope**: not fog, doesn't belong **Not yet specified**. Own **Out of scope** section: consciously ruled out of _this_ effort. Scope, not sharpness, lands here.

Out-of-scope never graduates (frontier stops at destination); returns only if destination redrawn — as fresh effort, not resumption.

Ruling out = scoping act, not route step. Existing ticket revealed past destination (mis-scoped charting, or exposed by resolution) → **close it** (closed = unambiguously off frontier), one line in **Out of scope**: gist + why out, linking closed ticket. Stays out of **Decisions so far** — records route walked; scope boundary isn't step on it.

## Invocation

Two modes. Either way **never resolve more than one ticket per session**, except research tickets.

### Chart the map

User invokes with loose idea.

1. **Name destination.** Skill tool twice: "grilling" + "domain-modeling" — pin what map finds way to: spec, decision, change. Destination fixes scope → settled first.
2. **Map frontier.** Grill again, **breadth-first**: fan across whole space, not deep one thread — surface open decisions + first steps takeable now. **No fog surfaced** (way already clear, journey small enough one session) → don't need map. Stop, ask user how proceed.
3. **Create map** (label `wayfinder:map`): Destination + Notes filled, Decisions-so-far empty, fog sketched **Not yet specified**.
4. **Create specifiable tickets** as child issues, wire blocking edges **second pass** (issues need ids before referencing). Real ids in cross-references — placeholder `#<n>` auto-links unrelated issue. Wiring sorts frontier + blocked; unspecifiable stays fog.
5. **Fire research subagents.** Each `research` ticket → subagent fresh context, Skill tool "research", resolves in parallel, findings on throwaway `research/<name>` branch with context pointer from ticket. Push branch, open no PR: never merged.
6. Stop: charting = one session's work; hand-resolves nothing.

### Work through map

User invokes with map (URL or number). Ticket **optional**: without one, you pick next decision, not user.

1. Load **map**: low-res view, not every ticket body.
2. Choose ticket. User named → use it. Else first frontier ticket in order. **Claim**: assign to yourself before any work.
3. Resolve per `wayfinder:<type>` label (see Ticket Types). Read label, not just body — body never states type. **Zoom as needed**: fetch full body of related/closed tickets on demand; Skill tool for skills `## Notes` names. In doubt → Skill tool twice: "grilling" + "domain-modeling".
4. Record resolution: answer as **resolution comment**, **close** issue, **append context pointer** to map's Decisions-so-far.
5. Add newly-surfaced tickets (create-then-wire); graduate fog answer made specifiable, clearing each graduated patch from **Not yet specified** — lives only as new ticket. Answer reveals ticket (this or other) sits beyond destination → **rule out of scope**, don't resolve on route. Decision invalidating other map parts → update/delete those tickets.

User may run unblocked tickets parallel — expect other sessions editing tracker concurrently.
