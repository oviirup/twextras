# Component file structure

Where new components live under `src/components`. Pick the folder by what the
component _is_, not by what it renders.

| Folder                     | Contents                                                                                                                             | Examples                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| `src/components/core/`     | Primitive wrappers around Base UI / native elements. One public component or compound per folder; no app logic, no other components. | `button`, `input`, `tabs`, `accordion`, `checkbox`  |
| `src/components/layout/`   | Page/section scaffolding and chrome: header, footer, sidebar, container, nav. Composes core components; no domain logic.             | `header`, `footer`, `container`                     |
| `src/components/icons/`    | SVG icon system only: `createIconNode`, `Icons` registry, `Logo`. No React components with behavior or props beyond icon rendering.  | `icon.tsx`, `registry.ts`, `logo.ts`                |
| `src/components/ui/`       | Shared, reusable components that depend on multiple core components (composites). Feature-agnostic; reusable across apps/pages.      | `login-ui`, `confirm-delete-modal`, `canvas-reveal` |
| `src/components/graphics/` | Decorative / canvas / WebGL visuals not tied to layout or interaction.                                                               |                                                     |

Feature-specific components that are not shared stay out of `src/components` -
co-locate them with the feature under `src/feats/` or `src/apps/` instead.

## Placement rules

- Wrapping a Base UI primitive or native element? -> `core/`
- Page chrome or structural layout? -> `layout/`
- Combines several core components into a reusable widget? -> `ui/`
- Pure SVG / icon factory? -> `icons/`
- When in doubt between `core` and `ui`: if it has a single Base UI primitive
  or native host at its root, it is `core`; if it composes multiple components,
  it is `ui`.
- Imports flow one way: `ui` -> `layout`/`core` -> `icons`. Never import `ui`
  from `core` or `layout`, and never import `core` from `icons`.
- Each folder still follows the per-component folder shape in `SKILL.md`
  (`<name>.tsx` + `index.ts` barrel). Callers always import the folder, e.g.
  `@/components/core/button`, `@/components/ui/confirm-delete-modal`.
