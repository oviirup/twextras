# twextras

Tailwind CSS v4 plugin pack. Adds animations, variants, `data-slot` targeting, SVG stroke utilities, drag utilities, and `cn` merge groups.

## Install

```sh
bun add twextras
```

```css
@import "tailwindcss";
@import "twextras";
```

Load one entry only: `twextras/animate`, `twextras/drag`, `twextras/slot`, `twextras/svg`, `twextras/variants`. `twextras/cn.config` is JavaScript, not CSS.

## animate

Adapted from `tw-animate-css`. Emits animation tokens, keyframes, `@property` defaults, and these utilities.

**Entrances and exits**

Use with `animate-in` or `animate-out`:

- `fade-in`, `fade-in-<n>` — enter opacity; `n` is percent, so `fade-in-50` gives `0.5`.
- `fade-out`, `fade-out-<n>` — exit opacity.
- `zoom-in`, `zoom-in-<n>` — enter scale; number is percent, ratio is fraction, theme percentage also works. `-zoom-in-*` negates.
- `zoom-out`, `zoom-out-<n>` — exit scale. `-zoom-out-*` negates.
- `spin-in`, `spin-in-<n>` — enter rotation; number is degrees, ratio is fraction of `360deg`. `-spin-in*` negates.
- `spin-out`, `spin-out-<n>` — exit rotation. `-spin-out*` negates.
- `blur-in`, `blur-in-<n>` — enter blur; number is px, theme blur also works.
- `blur-out`, `blur-out-<n>` — exit blur.
- `slide-in-from-{top,bottom,left,right,start,end}`, plus `-<n>` — enter translation. Number uses spacing, percent, ratio, or length works.
- `slide-out-to-{top,bottom,left,right,start,end}`, plus `-<n>` — exit translation. `start`/`end` follow `dir`.

**Timing and state**

- `animation-duration-<n>` — animation duration in ms. Core `duration-*` also feeds animations through `--tw-duration`.
- `delay-<n>` — animation delay in ms. This does not set `transition-delay`.
- `repeat-{0,1,infinite}`, `repeat-<n>` — iteration count.
- `direction-{normal,reverse,alternate,alternate-reverse}` — direction.
- `fill-mode-{none,forwards,backwards,both}` — fill mode.
- `running`, `paused`, `play-state-*` — play state.

**Built-in animations**

- `animate-accordion-down`, `animate-accordion-up` — need `--accordion-panel-height`.
- `animate-collapsible-down`, `animate-collapsible-up` — need `--collapsible-panel-height`.
- `animate-caret-blink` — blinking caret.

```html
<div class="animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300"></div>
<div class="animate-out fade-out-0 zoom-out-95 slide-out-to-top-4 duration-200"></div>

<div
  class="animate-accordion-down"
  style="--accordion-panel-height: var(--radix-accordion-content-height)"
></div>
```

## variants

| Class                          | Produces                                             |
| ------------------------------ | ---------------------------------------------------- |
| `hocus:`                       | `&:is(:hover, :focus-visible)`                       |
| `pressed:`                     | `&:is(:active:hover)`                                |
| `pseudo:`                      | `&::after, &::before`                                |
| `data-open:`                   | matches `[data-open]` unless value is `"false"`      |
| `data-closed:`                 | matches `[data-closed]` unless value is `"false"`    |
| `data-checked:`                | matches `[data-checked]` unless value is `"false"`   |
| `data-unchecked:`              | matches `[data-unchecked]` unless value is `"false"` |
| `data-selected:`               | matches `[data-selected]` unless value is `"false"`  |
| `data-disabled:`               | matches `[data-disabled]` unless value is `"false"`  |
| `data-active:`                 | matches `[data-active]` unless value is `"false"`    |
| `data-orientation-horizontal:` | matches `[data-orientation="horizontal"]`            |
| `data-orientation-vertical:`   | matches `[data-orientation="vertical"]`              |

```html
<button class="hocus:ring-2 pressed:scale-95 data-disabled:opacity-50"></button>
<div data-closed class="data-closed:hidden"></div>
<div class="pseudo:content-[''] pseudo:bg-current"></div>
```

## slot

`slot-<value>` targets the element itself when it has `data-slot="<value>"`. The output selector is `&[data-slot="<value>"]`. Any string works, including `slot-[card-header]`.

```html
<div data-slot="card" class="slot-card:rounded-xl">
  <div data-slot="card-header" class="*:slot-card-header:pt-4"></div>
</div>
```

`*:slot-*` targets direct children. `**:slot-*` targets all descendants.

## svg

| Class                                                              | Produces            |
| ------------------------------------------------------------------ | ------------------- |
| `stroke-<number>`, `stroke-[<length>]`                             | `stroke-width`      |
| `stroke-miter-<number>`, `stroke-miter-[<value>]`                  | `stroke-miterlimit` |
| `stroke-linecap-{round,butt,square}`, `stroke-linecap-[<value>]`   | `stroke-linecap`    |
| `stroke-linejoin-{round,bevel,miter}`, `stroke-linejoin-[<value>]` | `stroke-linejoin`   |
| `stroke-dasharray-[<value>]`                                       | `stroke-dasharray`  |
| `stroke-dashoffset-[<value>]`                                      | `stroke-dashoffset` |

```html
<svg class="stroke-2 stroke-linecap-round stroke-linejoin-bevel">
  <path class="stroke-dasharray-[4_2] stroke-dashoffset-[1]" />
</svg>
```

## drag

| Class            | Produces                     |
| ---------------- | ---------------------------- |
| `drag-none`      | `-webkit-user-drag: none`    |
| `drag-element`   | `-webkit-user-drag: element` |
| `drag-auto`      | `-webkit-user-drag: auto`    |
| `drag-[<value>]` | `-webkit-user-drag: <value>` |

```html
<img class="drag-none select-none" />
```

## cn config

Adds merge groups for `drag`, `stroke`, `stroke-dasharray`, `stroke-dashoffset`, `stroke-linecap`, `stroke-linejoin`, and `stroke-miter`. Use only if the project uses `cn`.

```ts
import { createCn } from "cn/config";
import { cnConfigExtension } from "twextras/cn.config";

export const cn = createCn(cnConfigExtension);
```
