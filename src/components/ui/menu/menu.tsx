"use client";

import { ContextMenu as ContextMenuPrimitive } from "baseui/context-menu";
import * as React from "react";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// menu root --->

function Menu_Root({ ...props }: Menu_Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="menu" {...props} />;
}
namespace Menu_Root {
  export type Props = ContextMenuPrimitive.Root.Props;
}

// menu portal --->

function Menu_Portal({ ...props }: Menu_Portal.Props) {
  return <ContextMenuPrimitive.Portal data-slot="menu-portal" {...props} />;
}
namespace Menu_Portal {
  export type Props = ContextMenuPrimitive.Portal.Props;
}

// menu trigger --->

function Menu_Trigger({ className, ...props }: Menu_Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="menu-trigger"
      className={cn("select-none", className)}
      {...props}
    />
  );
}
namespace Menu_Trigger {
  export type Props = ContextMenuPrimitive.Trigger.Props;
}

// menu content --->

function Menu_Content({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  ...props
}: Menu_Content.Props) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}>
        <ContextMenuPrimitive.Popup
          data-slot="menu-content"
          className={cn(
            "z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-xl ring-1 shadow-black/8 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}
namespace Menu_Content {
  export type Props = ContextMenuPrimitive.Popup.Props &
    Pick<ContextMenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;
}

// menu group --->

function Menu_Group({ ...props }: Menu_Group.Props) {
  return <ContextMenuPrimitive.Group data-slot="menu-group" {...props} />;
}
namespace Menu_Group {
  export type Props = ContextMenuPrimitive.Group.Props;
}

// menu label --->

function Menu_Label({ className, inset, ...props }: Menu_Label.Props) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="menu-label"
      data-inset={inset}
      className={cn("px-2 py-1.5 text-sm text-muted-foreground data-inset:pl-7.5", className)}
      {...props}
    />
  );
}
namespace Menu_Label {
  export type Props = ContextMenuPrimitive.GroupLabel.Props & { inset?: boolean };
}

// menu item --->

function Menu_Item({ className, inset, variant = "default", ...props }: Menu_Item.Props) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/menu-item relative flex min-h-7 cursor-default items-center gap-2 rounded-md px-2 py-1 text-sm/relaxed outline-hidden select-none focus:bg-taupe-100 focus:text-taupe-800 focus:ring focus:ring-border/65 focus:ring-inset not-data-[variant=destructive]:focus:**:text-taupe-800 data-inset:pl-7.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/8 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:focus:ring-destructive/4 dark:data-[variant=destructive]:focus:bg-destructive/10 data-disabled:pointer-events-none data-disabled:opacity-65 icon:not-[[class*='size-']]:size-3.5 data-[variant=destructive]:*:[svg]:text-destructive",
        className,
      )}
      {...props}
    />
  );
}
namespace Menu_Item {
  export type Props = ContextMenuPrimitive.Item.Props & {
    inset?: boolean;
    variant?: "default" | "destructive";
  };
}

// menu checkbox item --->

function Menu_CheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: Menu_CheckboxItem.Props) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-taupe-100 focus:text-taupe-800 focus:ring focus:ring-border/65 focus:ring-inset focus:**:text-taupe-800 data-inset:pl-7.5 data-disabled:pointer-events-none data-disabled:opacity-65 icon:not-[[class*='size-']]:size-3.5",
        className,
      )}
      checked={checked}
      {...props}>
      <span className="pointer-events-none absolute right-2 flex items-center justify-center">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <Icons.Check />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}
namespace Menu_CheckboxItem {
  export type Props = ContextMenuPrimitive.CheckboxItem.Props & { inset?: boolean };
}

// menu radio group --->

function Menu_RadioGroup({ ...props }: Menu_RadioGroup.Props) {
  return <ContextMenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />;
}
namespace Menu_RadioGroup {
  export type Props = ContextMenuPrimitive.RadioGroup.Props;
}

// menu radio item --->

function Menu_RadioItem({ className, children, inset, ...props }: Menu_RadioItem.Props) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-taupe-100 focus:text-taupe-800 focus:ring focus:ring-border/65 focus:ring-inset focus:**:text-taupe-800 data-inset:pl-7.5 data-disabled:pointer-events-none data-disabled:opacity-65 icon:not-[[class*='size-']]:size-3.5",
        className,
      )}
      {...props}>
      <span className="pointer-events-none absolute right-2 flex items-center justify-center">
        <ContextMenuPrimitive.RadioItemIndicator>
          <Icons.Check />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}
namespace Menu_RadioItem {
  export type Props = ContextMenuPrimitive.RadioItem.Props & { inset?: boolean };
}

// menu separator --->

function Menu_Separator({ className, ...props }: Menu_Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border/50", className)}
      {...props}
    />
  );
}
namespace Menu_Separator {
  export type Props = ContextMenuPrimitive.Separator.Props;
}

// menu shortcut --->

function Menu_Shortcut({ className, ...props }: Menu_Shortcut.Props) {
  return (
    <span
      data-slot="menu-shortcut"
      className={cn(
        "ml-auto text-[0.625rem] tracking-widest text-muted-foreground group-focus/menu-item:text-taupe-800",
        className,
      )}
      {...props}
    />
  );
}
namespace Menu_Shortcut {
  export type Props = React.ComponentProps<"span">;
}

// menu sub --->

function Menu_Sub({ ...props }: Menu_Sub.Props) {
  return <ContextMenuPrimitive.SubmenuRoot data-slot="menu-sub" {...props} />;
}
namespace Menu_Sub {
  export type Props = ContextMenuPrimitive.SubmenuRoot.Props;
}

// menu sub trigger --->

function Menu_SubTrigger({ className, inset, children, ...props }: Menu_SubTrigger.Props) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex min-h-7 cursor-default items-center gap-2 rounded-md px-2 py-1 text-sm outline-hidden select-none focus:bg-taupe-100 focus:text-taupe-800 focus:ring focus:ring-border/65 focus:ring-inset not-data-[variant=destructive]:focus:**:text-taupe-800 data-inset:pl-7.5 data-open:bg-taupe-100 data-open:text-taupe-800 data-open:ring data-open:ring-border/65 data-open:ring-inset icon:not-[[class*='size-']]:size-3.5",
        className,
      )}
      {...props}>
      {children}
      <Icons.ChevronRight className="ml-auto" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}
namespace Menu_SubTrigger {
  export type Props = ContextMenuPrimitive.SubmenuTrigger.Props & { inset?: boolean };
}

// menu sub content --->

function Menu_SubContent({ ...props }: Menu_SubContent.Props) {
  return (
    <Menu_Content data-slot="menu-sub-content" className="shadow-lg" side="right" {...props} />
  );
}
namespace Menu_SubContent {
  export type Props = React.ComponentProps<typeof Menu_Content>;
}

// exports --->

export {
  Menu_CheckboxItem as CheckboxItem,
  Menu_Content as Content,
  Menu_Group as Group,
  Menu_Item as Item,
  Menu_Label as Label,
  Menu_Portal as Portal,
  Menu_RadioGroup as RadioGroup,
  Menu_RadioItem as RadioItem,
  Menu_Root as Root,
  Menu_Separator as Separator,
  Menu_Shortcut as Shortcut,
  Menu_Sub as Sub,
  Menu_SubContent as SubContent,
  Menu_SubTrigger as SubTrigger,
  Menu_Trigger as Trigger,
};
