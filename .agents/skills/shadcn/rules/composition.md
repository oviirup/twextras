# Component Composition

## Contents

- Items always inside their Group component
- Callouts use Alert
- Empty states use Empty component
- Toast notifications follow the project base
- Choosing between overlay components
- Dialog, Sheet, Drawer always need a Title
- Card structure
- Button has no isPending or isLoading prop
- TabsTrigger must be inside TabsList
- Avatar always needs AvatarFallback
- Use Separator instead of raw hr or border divs
- Use Skeleton for loading placeholders
- Use Badge instead of custom styled spans

---

## Items always inside their Group component

Never render items directly inside content container.

**Incorrect:**

```tsx
<SelectContent>
  <SelectItem value="apple">Apple</SelectItem>
  <SelectItem value="banana">Banana</SelectItem>
</SelectContent>;
```

**Correct:**

```tsx
<SelectContent>
  <SelectGroup>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectGroup>
</SelectContent>;
```

All group-based components:

| Item                                                       | Group                    |
| ---------------------------------------------------------- | ------------------------ |
| `SelectItem`, `SelectLabel`                                | `SelectGroup`            |
| `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSub` | `DropdownMenuGroup`      |
| `MenubarItem`                                              | `MenubarGroup`           |
| `ContextMenuItem`                                          | `ContextMenuGroup`       |
| `CommandItem`                                              | `CommandGroup`           |
| `MessageScrollerItem`                                      | `MessageScrollerContent` |
| `Message` (consecutive, same sender)                       | `MessageGroup`           |
| `Bubble` (stacked)                                         | `BubbleGroup`            |
| `Attachment` (in a row)                                    | `AttachmentGroup`        |

Chat components nest fixed order (`MessageScrollerProvider` → `MessageScroller` → `MessageScrollerViewport` → `MessageScrollerContent` → `MessageScrollerItem`). See [chat.md](./chat.md).

---

## Callouts use Alert

```tsx
<Alert>
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Something needs attention.</AlertDescription>
</Alert>;
```

---

## Empty states use Empty component

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <FolderIcon />
    </EmptyMedia>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>Get started by creating a new project.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create Project</Button>
  </EmptyContent>
</Empty>;
```

---

## Toast notifications follow project base

Base UI projects → `toast` component:

```tsx
import { toast } from "@/components/ui/toast";

toast.add({
  title: "Changes saved.",
});
```

Radix + React Aria projects → Sonner:

```tsx
import { toast } from "sonner";

toast.success("Changes saved.");
toast.error("Something went wrong.");
toast("File deleted.", {
  action: { label: "Undo", onClick: () => undoDelete() },
});
```

---

## Choosing between overlay components

| Use case                          | Component     |
| --------------------------------- | ------------- |
| Focused task requiring input      | `Dialog`      |
| Destructive action confirmation   | `AlertDialog` |
| Side panel with details/filters   | `Sheet`       |
| Mobile-first bottom panel         | `Drawer`      |
| Quick info on hover               | `HoverCard`   |
| Small contextual content on click | `Popover`     |

---

## Dialog, Sheet, Drawer always need Title

`DialogTitle`, `SheetTitle`, `DrawerTitle` required for accessibility. `className="sr-only"` if visually hidden.

```tsx
<DialogContent>
  <DialogHeader>
    <DialogTitle>Edit Profile</DialogTitle>
    <DialogDescription>Update your profile.</DialogDescription>
  </DialogHeader>
  ...
</DialogContent>;
```

---

## Card structure

Full composition — don't dump everything into `CardContent`:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Team Members</CardTitle>
    <CardDescription>Manage your team.</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>
    <Button>Invite</Button>
  </CardFooter>
</Card>;
```

---

## Button has no isPending or isLoading prop

Compose `Spinner` + `data-icon` + `disabled`:

```tsx
<Button disabled>
  <Spinner data-icon="inline-start" />
  Saving...
</Button>;
```

---

## TabsTrigger must be inside TabsList

Never render `TabsTrigger` directly inside `Tabs` — always wrap in `TabsList`:

```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
</Tabs>;
```

---

## Avatar always needs AvatarFallback

Always `AvatarFallback` for image load failure:

```tsx
<Avatar>
  <AvatarImage src="/avatar.png" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>;
```

---

## Use existing components instead of custom markup

| Instead of                                         | Use                                  |
| -------------------------------------------------- | ------------------------------------ |
| `<hr>` or `<div className="border-t">`             | `<Separator />`                      |
| `<div className="animate-pulse">` styled divs      | `<Skeleton className="h-4 w-3/4" />` |
| `<span className="rounded-full bg-green-100 ...">` | `<Badge variant="secondary">`        |
