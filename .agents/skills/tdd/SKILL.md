---

name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

TDD = red → green loop. This skill makes the loop produce tests worth keeping: what a good test is, where tests go, anti-patterns, loop rules. Every section applies every cycle: consult before and during, not after.

When exploring codebase, read `GLOSSARY.md` (if it exists) so test names match domain language; respect ADRs in the area touched.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't. Good test reads like spec: "user can checkout with valid cart" states exact capability, survives refactors, ignores internal structure.

See [tests.md](tests.md) for examples, [mocking.md](mocking.md) for mocking.

## Seams: where tests go

**Seam** = public boundary tested at: interface where behavior is observable without reaching inside. Tests live at seams, never internals.

**Test only at pre-agreed seams.** Before any test, write down seams under test, confirm with user. No test at unconfirmed seam. Can't test everything — agreed seams focus effort on critical paths and complex logic, not every edge case.

Ask: "What's the public interface, and which seams should we test?" One-line note per seam: what it catches, what it misses.

When interface shape itself is in question (module depth, seam placement, what interface exposes), invoke Skill tool "codebase-design" for vocabulary. Shared source of module, interface, depth, seam, adapter, leverage, locality terms. Reference to consult, not session to run.

## Anti-patterns

- **Implementation-coupled**: mocks internal collaborators, tests private methods, verifies through side channel (DB query instead of interface). Tell: breaks on refactor, behavior unchanged.
- **Tautological**: assertion recomputes expected value the way code does (`expect(add(a, b)).toBe(a + b)`, hand-derived snapshot same way, constant equal to itself) — passes by construction, never disagrees with code. Expected values need independent source of truth: known-good literal, worked example, spec.
- **Horizontal slicing**: all tests first, then all implementation. Bulk tests verify _imagined_ behavior: test shape not user-facing behavior, insensitive to real changes, commit to test structure before understanding implementation. Work **vertical slices**: one test → one implementation → repeat, each test a **tracer bullet** responding to what last cycle taught.

## Rules of the loop

- **Red before green.** Failing test first, then only enough code to pass. No anticipated tests, no speculative features.
- **One slice at a time.** One seam, one test, one minimal implementation per cycle.
- **Refactoring is not part of the loop.** Belongs to review stage (see `code-review` skill), not red → green cycle.
