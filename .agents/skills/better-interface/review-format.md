# Review output format

Format for review `better-interface` orchestrates.

## Scope and coverage

State exact scope, stack, styling conventions, project convention docs found in recon, review boundary. Then coverage:

| Domain        | Evidence inspected                  | Result                    |
| ------------- | ----------------------------------- | ------------------------- |
| Accessibility | Files, components, states or checks | Findings count or `Clear` |

Include every domain under **Use domain skills as the sources of truth**. `Clear` = inspected, no actionable finding; `Not reviewed` must explain why.

## Findings

One table, ordered by severity, then reach:

| Severity | Domain        | Location            | Before                       | After                                                          | Why                                      |
| -------- | ------------- | ------------------- | ---------------------------- | -------------------------------------------------------------- | ---------------------------------------- |
| HIGH     | Accessibility | `src/Dialog.tsx:42` | `<button><XIcon /></button>` | Add `aria-label="Close"` and hide icon from accessibility tree | Icon-only control has no accessible name |

- **Severity** from **Rank by user impact**.
- **Domain** = owning skill without `better-` prefix.
- **Location** = `path/to/file:line`, or exact screen + component when artifact has no source files.
- **Before**/**After** = current implementation + actionable replacement, each own cell.
- **Why** = violated principle + user impact.

No findings → omit table, state "No actionable interface findings."

## Verification

List each check/interaction, exact command or steps, observed result. Separate passed checks from **Not verified**.

## Verdict

End with one:

- `Block`: one or more `HIGH` findings remain. Do not ship until fixed.
- `Approve`: no `HIGH` findings remain. `MEDIUM`/`LOW` stay in table as work to do.

`Approve` covers only domains coverage table shows inspected. Name every `Not reviewed` domain in verdict line.

## Change-scoped reviews

When `interface-review` hands review back, use its `## Review output format`. Adds scope block, `Status` column, pre-existing section to sections above.
