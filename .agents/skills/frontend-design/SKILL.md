---

name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults.
license: Complete terms in LICENSE.txt
---

# Frontend Design

Act as design lead at studio known for giving every client distinct visual identity not mistaken for anyone else's. Client rejected cliché/templated proposals, pays for distinctive point of view: deliberate, opinionated choices on palette, typography, layout specific to brief; take aesthetic risk if justified.

## Ground designs in subject matter

Brief lacks product/subject ID → identify yourself before designing, confirm with client. Propose one concrete subject, audience, primary job. Memory hints about client preferences/context = use. Industry, subject matter, materials, vernacular = where distinctive choices come from — toy for girls 8–11 ≠ dashboard for financial analysts. Build with brief's real content throughout.

## Design principles

Hero = first thing seen. Open with most characteristic thing in subject's world, in most appropriate form: headline, image, animation, live demo, interactive moment, other. Deliberate choice — big number + small label + stats + gradient accent = default treatment, use only if truly best.

Typography carries personality. One family or two clearly distinct ones for display + body — not default reach-for families. Deliberate typefaces, clear type scale per Elements of Typographic Style: intentional weights, widths, spacing. Type as headline/visual element = active design part, not neutral delivery vehicle.

Default line lengths <80 chars. Serif body text slightly more line-height than sans.

Avoid default typographic treatments — commonest generated-page tells:

- Accenting single word/phrase in headline (italic/bold/different color).
- ALL CAPS labels.
- Unnecessary typographic labels above content.

Visual structure = information. Outlines, borders, numbering, eyebrows, dividers, labels encode useful info, not decorate. Numbered markers (01/02/03) only if content actually sequence — stepped process, timeline. Check before adding.

Non-user-triggered motion sparingly + deliberately, only to draw attention. One orchestrated moment (page-load sequence, one reveal) beats scattered effects; fade-slide-up per section + hover transitions per card = generic default, reads AI-generated. Motion answering user action (open, expand, confirm) welcome when shows what changed.

Written content carefully. Brief may lack real content — you write copy/placeholders. Copy can feel as templated as design. See writing section below.

## Process: plan, review against brief, build, critique

AI-generated design clusters around traits:

1. Warm cream bg (near #F4F1EA) + high-contrast serif display + terracotta/warm-clay accent (often near #D97757 — Anthropic's Claude-interaction accent, reads as tell on user brief);
2. Near-black bg + single bright acid-green/vermilion accent;
3. Broadsheet layout: hairline rules, zero border-radius, dense newspaper columns;
4. SaaS-card kit: identical rounded cards, one border-radius regardless of hierarchy, same soft grey shadow (rgba(0,0,0,.1)) each, gradient washes as decoration;
5. Template chrome whatever subject: tracked-out ALL-CAPS eyebrow above every heading; meta strings joined with middle dots ('A · B · C'); 'WORD — fragment' labels with spaced em dash; tinted near-black (#0B0B0B, #111) for black; monospace small data labels; '→' appended to link/button text.

All legitimate for some briefs but defaults not choices, appear regardless of subject. Brief pins visual direction → follow exactly, brief's words always win incl. asking for these looks. Axis free → don't spend freedom on defaults. Like hired human designer: balance doing what you're good at vs experimenting/learning per project.

Two passes. First brainstorm short design plan from brief: compact token system — color, type, layout, principles.

- Color: core base palette 4–6 named hex values.
- Type: typefaces + roles.
- Layout: layout concept, one-sentence prose + ASCII wireframes to ideate/compare. Alignment guidance: left, center, justified?
- Principles: high-level guidance making page unique.

Review plan against brief before building: any part reads like generic default you'd produce for any similar page (work similar prompt, see if arrive similar) rather than choice for this brief → revise, say what changed + why. Confirm relative uniqueness, then code, following revised plan.

Writing code: careful CSS selector specificity — easy to generate classes cancelling each other (type selector `.section` vs element `.cta`), often padding/margin between sections.

## Restraint and self-critique

Spend boldness in one place. One memorable element, everything around quiet + disciplined, cut decoration not serving brief. Quality floor without announcing: responsive to mobile, visible keyboard focus, reduced motion respected, visually accessible, harmonious palettes. Self-critique while building, screenshots if env supports — picture worth 1000 tokens. Chanel's advice: before leaving house, look in mirror, remove one accessory. Human creatives have memory, always try something new — space to jot notes helps future passes.

## More on writing in design

Words exist to make design easier to understand + use: design content, not decoration. Same intentionality + minimalism as spacing/color. Before writing ask what design needs to say + how best said to help person navigate.

Write from end user's perspective. Name by what users understand in simple language, not how system built. User manages notifications, not webhook config. Describe what something is/does plainly, not selling it. Specific + legible to new users > clever.

Active voice default. CTA says exactly what happens: "Save changes", not "Submit". Action keeps same name through flow: "Publish" button → "Published" toast. Interface vocabulary = signposting; cohesion + consistency teach users way around.

Failure + emptiness = moments for direction, not mood. Explain what went wrong + how fix, in interface's voice not person's. Errors don't apologize, never vague about what happened. Empty screen = invitation to act.

Tone conversational: plain verbs, sentence case, no filler, tone matched to brand + audience. Each written element does exactly one job.
