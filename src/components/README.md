# UI Components

Shared, feature-agnostic components built on `baseui` (`@baseui/react`) with Tailwind theme styling. One folder per component; import the folder, never deep-import the implementation.

```tsx
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
```

Compound components are exported as namespaces (`Accordion.Root`). Single components export directly (`Button`).

---

## Accordion

Collapsible sections with animated height and chevron trigger.

```text
Accordion.Root
└── Accordion.Item (value)
    ├── Accordion.Trigger
    └── Accordion.Content
```

```tsx
<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>;
```

## Avatar

User avatar with image, fallback, and status badge. `size`: `sm` | `default` | `lg`.

```text
Avatar.Root
├── Avatar.Image
├── Avatar.Fallback
└── Avatar.Badge
```

```tsx
<Avatar.Root size="lg">
  <Avatar.Image src="/avatar.png" alt="User" />
  <Avatar.Fallback />
  <Avatar.Badge />
</Avatar.Root>;
```

## Breadcrumb

Navigation trail; last item renders as current page.

```text
Breadcrumb.Root (nav)
└── Breadcrumb.List (ol)
    ├── Breadcrumb.Item > Breadcrumb.Link
    ├── Breadcrumb.Separator
    └── Breadcrumb.Item > Breadcrumb.Page
```

```tsx
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Settings</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>;
```

## Button

Clickable action. Variants: `base`, `secondary`, `outline`, `ghost`. Sizes: `sm`, `base`, `lg`. `icon` makes it square icon-only; `nonNative` renders a non-`<button>` element.

```tsx
<Button variant="secondary" size="sm">Save</Button>
<Button variant="ghost" icon><Icons.Check /></Button>
```

## Calendar

Month-grid date calendar. Monday-first weeks, adjacent-month days muted, today ringed with `ring-primary`, selected day filled. Controlled via `selected`/`onSelect` and optional `month`/`onMonthChange`; `disabled` is a predicate.

```tsx
const [selected, setSelected] = useState<Date | null>(null);
<Calendar selected={selected} onSelect={setSelected} />;
```

## Card

Surface container with header/action/content/footer slots. `size`: `default` | `sm`.

```text
Card.Root
├── Card.Header
│   ├── Card.Title
│   ├── Card.Description
│   └── Card.Action
├── Card.Content
└── Card.Footer
```

```tsx
<Card.Root>
  <Card.Header>
    <Card.Title>Notifications</Card.Title>
    <Card.Description>You have 3 unread messages.</Card.Description>
    <Card.Action>
      <Button variant="ghost" size="sm">
        Mark all read
      </Button>
    </Card.Action>
  </Card.Header>
  <Card.Content>...</Card.Content>
</Card.Root>;
```

## Checkbox

Single checkbox with animated check indicator.

```tsx
<Checkbox checked={checked} onCheckedChange={setChecked} />;
```

## Date

Date picker button opening a `Calendar` in a popover. `value`/`onChange`, `placeholder`, `disabled`.

```tsx
const [value, setValue] = useState<Date | null>(null);
<Date value={value} onChange={setValue} placeholder="Publish date" />;
```

## Dialog

Centered modal overlay.

```text
Dialog.Root
├── Dialog.Trigger
└── Dialog.Content (showCloseButton)
    ├── Dialog.Header
    │   ├── Dialog.Title
    │   └── Dialog.Description
    ├── Dialog.Footer (showCloseButton)
    └── Dialog.Close / Dialog.Overlay / Dialog.Portal
```

```tsx
<Dialog.Root>
  <Dialog.Trigger render={<Button variant="outline" />}>Open dialog</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description>Make changes to your profile here.</Dialog.Description>
    </Dialog.Header>
    <Input placeholder="Your name" />
    <Dialog.Footer showCloseButton>
      <Button>Save changes</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>;
```

## Dropdown

Action menu (click-triggered).

```text
Dropdown.Root
├── Dropdown.Trigger
└── Dropdown.Content (side, align, inline)
    ├── Dropdown.Group
    │   ├── Dropdown.Label
    │   ├── Dropdown.Item (variant: default | destructive, inset)
    │   ├── Dropdown.Checkbox
    │   └── Dropdown.RadioGroup > Dropdown.Radio
    └── Dropdown.Separator
```

```tsx
<Dropdown.Root>
  <Dropdown.Trigger render={<Button variant="outline" />}>Open menu</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item>Profile</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item variant="destructive">Delete</Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>;
```

## Empty

Empty-state placeholder.

```text
Empty.Root
├── Empty.Header
│   ├── Empty.Media (variant: default | icon)
│   ├── Empty.Title
│   └── Empty.Description
└── Empty.Content
```

```tsx
<Empty.Root>
  <Empty.Header>
    <Empty.Media variant="icon">
      <Icons.Inbox />
    </Empty.Media>
    <Empty.Title>No results</Empty.Title>
    <Empty.Description>Try adjusting your filters.</Empty.Description>
  </Empty.Header>
  <Empty.Content>
    <Button variant="outline">Clear filters</Button>
  </Empty.Content>
</Empty.Root>;
```

## Form

Form layout system + React Hook Form integration (label, description, error, orientation).

```text
Form.Root (form={useForm() instance})   — <form> wrapped in FormProvider
└── Form.Group                          — stacked fields container
    └── Form.Control (name, render)     — RHF Controller; render gets { field, fieldState }
        └── Form.Field (orientation: vertical | horizontal | responsive)
            ├── Form.Label 
            ├── Form.Content
            ├── Form.Description
            └── Form.Error

Form.Set + Form.Legend   — group related fields
```

```tsx
<Form.Root form={form} onSubmit={form.handleSubmit(onSubmit)}>
  <Form.Group>
    <Form.Control
      name="email"
      render={({ field, fieldState }) => (
        <Form.Field>
          <Form.Label>Email</Form.Label>
          <Input id={field.name} {...field} aria-invalid={fieldState.invalid} />
          <Form.Error />
        </Form.Field>
      )}
    />
  </Form.Group>
</Form.Root>;
```

Without `Form.Control`, `Form.Field`/`Form.Label`/`Form.Error` work standalone (`Form.Error` takes `errors={[{ message }]}`).

## Glance

Hover preview card (wraps `baseui` PreviewCard). `Glance.Content` takes an `anchor` render function for custom positioning; `Glance.Trigger` supports `delay`/`closeDelay`.

```text
Glance.Root
├── Glance.Trigger (render={<Button />})
└── Glance.Portal
    └── Glance.Content (anchor, side, align)
```

```tsx
<Glance.Root>
  <Glance.Trigger delay={0} closeDelay={0} render={<InputGroup.Button icon />}>
    <Icons.Alert />
  </Glance.Trigger>
  <Glance.Content anchor={() => rootRef.current}>...</Glance.Content>
</Glance.Root>;
```

Used by `Password.Hover` for the ruleset popover.

## Input

Single-line text field. `inputVariants` exported for reuse by `Textarea`, `Select.Trigger`, `InputGroup`.

```tsx
<Input type="email" placeholder="you@example.com" />;
```

## InputGroup

Input with addons (icons, text, buttons, kbd hints) at any edge.

```text
InputGroup.Root
├── InputGroup.Addon        (align: inline-start | inline-end | block-start | block-end)
├── InputGroup.Input
├── InputGroup.Textarea
└── InputGroup.Button
```

```tsx
<InputGroup.Root>
  <InputGroup.Addon>
    <Icons.Search />
  </InputGroup.Addon>
  <InputGroup.Input placeholder="Search" />
  <InputGroup.Addon align="inline-end">
    <InputGroup.Button>Go</InputGroup.Button>
  </InputGroup.Addon>
</InputGroup.Root>;
```

## Label

Styled `<label>`; fades with disabled group/peer states.

```tsx
<Label htmlFor="email">Email</Label>;
```

## Link

`next/link` wrapper. `external` (or `http(s)` href) opens in `_blank`; hash hrefs scroll to the target element.

```tsx
<Link href="/about">About</Link>
<Link href="https://example.com">External</Link>
```

## Menu

Context menu (right-click).

```text
Menu.Root
├── Menu.Trigger
└── Menu.Content
    ├── Menu.Group > Menu.Label + Menu.Item
    ├── Menu.CheckboxItem / Menu.RadioGroup > Menu.RadioItem
    ├── Menu.Sub > Menu.SubTrigger + Menu.SubContent
    ├── Menu.Shortcut / Menu.Separator
```

```tsx
<Menu.Root>
  <Menu.Trigger className="rounded-md border p-8">Right-click here</Menu.Trigger>
  <Menu.Content>
    <Menu.Item>
      Copy<Menu.Shortcut>⌘C</Menu.Shortcut>
    </Menu.Item>
    <Menu.Item variant="destructive">Delete</Menu.Item>
  </Menu.Content>
</Menu.Root>;
```

## Pagination

Page navigation; links render as `Button`-styled anchors. `Link` takes `isActive`.

```text
Pagination.Root
└── Pagination.Content
    ├── Pagination.Item
    │   ├── Pagination.Previous / Pagination.Next
    │   ├── Pagination.Link
    │   └── Pagination.Ellipsis
```

```tsx
<Pagination.Root>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.Previous href="#" />
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Link href="#" isActive>
        1
      </Pagination.Link>
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Link href="#">2</Pagination.Link>
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Ellipsis />
    </Pagination.Item>
    <Pagination.Item>
      <Pagination.Next href="#" />
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>;
```

## Password

Password input with reveal toggle, optional ruleset popover, and compose-safe `onChange`/`onBlur` (blur hides the revealed text). Must be used inside `Password.Root`.

```text
Password.Root (ruleset=[{ label, rule }])
├── InputGroup.Addon           — leading icon slot
├── Password.Input             — type toggles text/password
├── Password.Hover             — rules popover (Glance) anchored to the root
├── Password.Reveal            — show/hide button
└── Password.Ruleset           — standalone rule checklist
```

```tsx
<Password.Root ruleset={RULES}>
  <InputGroup.Addon>
    <Icons.Lock />
  </InputGroup.Addon>
  <Password.Input autoComplete="new-password" placeholder="Create a secure password" />
  <Password.Hover />
  <Password.Reveal />
</Password.Root>;
```

## Radio

Radio group + item.

```text
Radio.Root
└── Radio.Item (value)
```

```tsx
<Radio.Root defaultValue="a">
  <div className="flex items-center gap-2">
    <Radio.Item value="a" />
    <Label>Option A</Label>
  </div>
</Radio.Root>;
```

## Select

Single-value dropdown picker.

```text
Select.Root
├── Select.Trigger
│   └── Select.Value
└── Select.Content
    ├── Select.Group
    │   ├── Select.Label
    │   └── Select.Item (value)
    └── Select.Separator
```

```tsx
<Select.Root defaultValue="apple">
  <Select.Trigger className="w-48">
    <Select.Value placeholder="Select a fruit" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
    <Select.Item value="banana">Banana</Select.Item>
  </Select.Content>
</Select.Root>;
```

## Separator

Horizontal/vertical divider. `orientation`, `dashed` props.

```tsx
<Separator />
<Separator orientation="vertical" dashed />
```

## Sheet

Side panel (slides from `left` or `right`).

```text
Sheet.Root
├── Sheet.Trigger
└── Sheet.Content (side, showCloseButton)
    ├── Sheet.Header > Sheet.Title + Sheet.Description
    └── Sheet.Footer
```

```tsx
<Sheet.Root>
  <Sheet.Trigger render={<Button variant="outline" />}>Open sheet</Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Filters</Sheet.Title>
      <Sheet.Description>Narrow down results.</Sheet.Description>
    </Sheet.Header>
    ...
    <Sheet.Footer>
      <Button>Apply</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>;
```

## Sidebar

Collapsible app sidebar (offcanvas on mobile via `Sheet`, `Ctrl/Cmd+B` toggle, state persisted to `sidebar_state` cookie).

```text
Sidebar.Provider
├── Sidebar.Root                    (variant: sidebar | floating | inset; collapsible: offcanvas | none)
│   ├── Sidebar.Header
│   │   └── Sidebar.MenuButton
│   ├── Sidebar.Input
│   ├── Sidebar.Separator
│   ├── Sidebar.Content
│   │   └── Sidebar.Group
│   │       ├── Sidebar.GroupLabel
│   │       ├── Sidebar.GroupAction
│   │       └── Sidebar.GroupContent
│   │           └── Sidebar.Menu
│   │               └── Sidebar.MenuItem
│   │                   ├── Sidebar.MenuButton     (isActive, size)
│   │                   ├── Sidebar.MenuAction     (showOnHover)
│   │                   ├── Sidebar.MenuBadge
│   │                   ├── Sidebar.MenuSkeleton   (showIcon)
│   │                   └── Sidebar.MenuSub
│   │                       └── Sidebar.MenuSubItem
│   │                           └── Sidebar.MenuSubButton   (size, isActive)
│   └── Sidebar.Footer
│       └── Sidebar.Menu
│           └── Sidebar.MenuItem ...
└── Sidebar.Inset                            (main content area)
    ├── Sidebar.Trigger
    └── ...page content
```

```tsx
<Sidebar.Provider>
  <Sidebar.Root variant="inset" collapsible="offcanvas">
    <Sidebar.Header>
      <Sidebar.MenuButton size="lg" render={<a href="#" />}>
        <Icons.Dashboard />
        <span>Acme Inc.</span>
      </Sidebar.MenuButton>
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton isActive render={<a href="#" />}>
                <Icons.Home />
                <span>Dashboard</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar.Root>
  <Sidebar.Inset className="p-6">
    <Sidebar.Trigger />
    Main content
  </Sidebar.Inset>
</Sidebar.Provider>;
```

## Skeleton

Pulsing loading placeholder.

```tsx
<Skeleton className="h-4 w-48" />;
```

## Table

Data table; `Root` wraps in a horizontal-scroll container with `rounded-md border`. Header uses sidebar colors; `Table.Caption` renders below the border.

```text
Table.Root
├── Table.Caption
├── Table.Header
│   └── Table.Row > Table.Head
├── Table.Body
│   └── Table.Row (data-state="selected") > Table.Cell
└── Table.Footer
    └── Table.Row > Table.Cell
```

```tsx
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head className="text-right">Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Invoice</Table.Cell>
      <Table.Cell className="text-right">$250.00</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>;
```

## Textarea

Multi-line input sharing `inputVariants`; auto-grows, non-resizable.

```tsx
<Textarea placeholder="Write a message..." />;
```

## Tooltip

Hover/focus hint with arrow. Wrap app in `Tooltip.Provider` for shared delay.

```text
Tooltip.Provider
└── Tooltip.Root
    ├── Tooltip.Trigger
    └── Tooltip.Content (side, align)
```

```tsx
<Tooltip.Root>
  <Tooltip.Trigger
    render={
      <Button variant="ghost" icon>
        <Icons.Info />
      </Button>
    }
  />
  <Tooltip.Content>More information</Tooltip.Content>
</Tooltip.Root>;
```

## Upload

Drag-and-drop file input with hidden `<input type="file">`. `accept`, `multiple`, `disabled` pass through to the input; `onChange` receives `File[]`; `children` replaces the default dropzone content. Selected filenames list below.

```tsx
<Upload accept="image/*" multiple onChange={(files) => upload(files)} />;
```

## Notes

- Interactive components carry `"use client"`.
- Every host element exposes `data-slot="<kebab-name>"`.
- `className` merges after variant classes via `cn`.
- Stories live next to each component (`<name>.stories.tsx`), titled `UI/<Name>` in Storybook.
