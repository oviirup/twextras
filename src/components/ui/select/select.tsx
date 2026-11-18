"use client";

import { Select as SelectPrimitive } from "baseui/select";
import { inputVariants } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// select root --->

const Select_Root = SelectPrimitive.Root;

// select group --->

function Select_Group({ className, ...props }: Select_Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}
namespace Select_Group {
  export type Props = SelectPrimitive.Group.Props;
}

// select value --->

function Select_Value({ className, ...props }: Select_Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  );
}
namespace Select_Value {
  export type Props = SelectPrimitive.Value.Props;
}

// select trigger --->

function Select_Trigger({ className, children, ...props }: Select_Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        inputVariants(),
        "flex h-10 w-fit items-center justify-between gap-1.5 whitespace-nowrap data-placeholder:text-muted-foreground icon:not-[[class*='size-']]:size-4",
        "*:slot-select-value:line-clamp-1 *:slot-select-value:flex *:slot-select-value:items-center *:slot-select-value:gap-1.5",
        className,
      )}
      {...props}>
      {children}
      <SelectPrimitive.Icon
        render={<Icons.ChevronDown className="size-4 text-muted-foreground" />}
      />
    </SelectPrimitive.Trigger>
  );
}
namespace Select_Trigger {
  export type Props = SelectPrimitive.Trigger.Props;
}

// select content --->

function Select_Content({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: Select_Content.Props) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50">
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-xl ring-1 shadow-black/8 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}>
          <SelectPrimitive.List className="scrollbar-none">{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}
namespace Select_Content {
  export type Props = SelectPrimitive.Popup.Props &
    Pick<
      SelectPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
    >;
}

// select label --->

function Select_Label({ className, ...props }: Select_Label.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
namespace Select_Label {
  export type Props = SelectPrimitive.GroupLabel.Props;
}

// select item --->

function Select_Item({ className, children, ...props }: Select_Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-md px-3 py-1 text-sm/relaxed outline-hidden select-none focus:bg-taupe-100 focus:text-taupe-800 focus:ring focus:ring-border/65 focus:ring-inset not-data-[variant=destructive]:focus:**:text-taupe-800 data-disabled:pointer-events-none data-disabled:opacity-65 icon:not-[[class*='size-']]:size-3.5 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}>
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex items-center justify-center" />
        }>
        <Icons.Check className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
namespace Select_Item {
  export type Props = SelectPrimitive.Item.Props;
}

// select separator --->

function Select_Separator({ className, ...props }: Select_Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border/50", className)}
      {...props}
    />
  );
}
namespace Select_Separator {
  export type Props = SelectPrimitive.Separator.Props;
}

// exports --->

export {
  Select_Content as Content,
  Select_Group as Group,
  Select_Item as Item,
  Select_Label as Label,
  Select_Root as Root,
  Select_Separator as Separator,
  Select_Trigger as Trigger,
  Select_Value as Value,
};
