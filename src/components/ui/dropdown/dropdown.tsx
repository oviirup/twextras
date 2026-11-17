"use client";

import { Menu as BaseMenu } from "baseui/menu";
import { Icons } from "@/lib/icons";
import { cn, cva } from "@/lib/utils";

// dropdown root --->

function Dropdown_Root({ ...props }: Dropdown_Root.Props) {
  return <BaseMenu.Root data-slot="dropdown" {...props} />;
}
namespace Dropdown_Root {
  export type Props = BaseMenu.Root.Props;
}

// dropdown portal --->

function Dropdown_Portal({ ...props }: Dropdown_Portal.Props) {
  return <BaseMenu.Portal data-slot="dropdown-portal" {...props} />;
}
namespace Dropdown_Portal {
  export type Props = BaseMenu.Portal.Props;
}

// dropdown trigger --->

function Dropdown_Trigger({ ...props }: Dropdown_Trigger.Props) {
  return <BaseMenu.Trigger data-slot="dropdown-trigger" {...props} />;
}
namespace Dropdown_Trigger {
  export type Props = BaseMenu.Trigger.Props;
}

// dropdown content --->

function Dropdown_Content({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: Dropdown_Content.Props) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}>
        <BaseMenu.Popup
          data-slot="dropdown-content"
          className={cn(
            "z-50 max-h-(--available-height) w-max min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-xl ring-1 shadow-black/8 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}
namespace Dropdown_Content {
  export type Props = BaseMenu.Popup.Props &
    Pick<BaseMenu.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;
}

// dropdown group --->

function Dropdown_Group({ ...props }: Dropdown_Group.Props) {
  return <BaseMenu.Group data-slot="dropdown-group" {...props} />;
}
namespace Dropdown_Group {
  export type Props = BaseMenu.Group.Props;
}

// dropdown label --->

function Dropdown_Label({ className, inset, ...props }: Dropdown_Label.Props) {
  return (
    <BaseMenu.GroupLabel
      data-slot="dropdown-label"
      data-inset={inset}
      className={cn("px-2 py-1.5 text-sm text-muted-foreground data-inset:pl-7.5", className)}
      {...props}
    />
  );
}
namespace Dropdown_Label {
  export type Props = BaseMenu.GroupLabel.Props & { inset?: boolean };
}

// dropdown item variants --->

const dropdownItemVariants = cva({
  base: [
    "group/dropdown-item relative flex min-h-7 cursor-default items-center gap-2 rounded-md px-2.5 py-1 text-sm leading-none outline-none select-none data-inset:pl-7.5 icon:not-[[class*='size-']]:size-4",
    "focus:bg-accent focus:text-accent-foreground focus:ring focus:ring-inset",
    "data-disabled:pointer-events-none data-disabled:opacity-65",
  ],
  variants: {
    variant: {
      default: "focus:ring-border/65 focus:**:text-accent-foreground",
      destructive:
        "text-destructive focus:bg-destructive/8 focus:text-destructive focus:ring-destructive/4 icon:text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// dropdown item --->

function Dropdown_Item({ className, inset, variant = "default", ...props }: Dropdown_Item.Props) {
  return (
    <BaseMenu.Item
      data-slot="dropdown-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(dropdownItemVariants({ variant }), className)}
      {...props}
    />
  );
}
namespace Dropdown_Item {
  export type Props = BaseMenu.Item.Props & { inset?: boolean } & cva.Props<
      typeof dropdownItemVariants
    >;
}

// dropdown checkbox item --->

function Dropdown_Checkbox({
  className,
  children,
  checked,
  inset,
  ...props
}: Dropdown_Checkbox.Props) {
  return (
    <BaseMenu.CheckboxItem
      data-slot="dropdown-checkbox"
      data-inset={inset}
      className={cn(dropdownItemVariants({ variant: "default" }), "w-full pr-7.5", className)}
      checked={checked}
      {...props}>
      <BaseMenu.CheckboxItemIndicator
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-checkbox-indicator">
        <Icons.Check />
      </BaseMenu.CheckboxItemIndicator>

      {children}
    </BaseMenu.CheckboxItem>
  );
}
namespace Dropdown_Checkbox {
  export type Props = BaseMenu.CheckboxItem.Props & { inset?: boolean };
}

// dropdown radio group --->

function Dropdown_RadioGroup({ ...props }: Dropdown_RadioGroup.Props) {
  return <BaseMenu.RadioGroup data-slot="dropdown-radio-group" {...props} />;
}
namespace Dropdown_RadioGroup {
  export type Props = BaseMenu.RadioGroup.Props;
}

// dropdown radio item --->

function Dropdown_Radio({ className, children, inset, ...props }: Dropdown_Radio.Props) {
  return (
    <BaseMenu.RadioItem
      data-slot="dropdown-radio"
      data-inset={inset}
      className={cn(dropdownItemVariants({ variant: "default" }), "w-full pr-8", className)}
      {...props}>
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-radio-indicator">
        <BaseMenu.RadioItemIndicator>
          <Icons.Check className="size-4" />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  );
}
namespace Dropdown_Radio {
  export type Props = BaseMenu.RadioItem.Props & { inset?: boolean };
}

// dropdown separator --->

function Dropdown_Separator({ className, ...props }: Dropdown_Separator.Props) {
  return (
    <BaseMenu.Separator
      data-slot="dropdown-separator"
      className={cn("-mx-1 my-1 h-px bg-border/50", className)}
      {...props}
    />
  );
}
namespace Dropdown_Separator {
  export type Props = BaseMenu.Separator.Props;
}

// exports --->

export {
  Dropdown_Checkbox as Checkbox,
  Dropdown_Content as Content,
  Dropdown_Group as Group,
  Dropdown_Item as Item,
  Dropdown_Label as Label,
  Dropdown_Portal as Portal,
  Dropdown_Radio as Radio,
  Dropdown_RadioGroup as RadioGroup,
  Dropdown_Root as Root,
  Dropdown_Separator as Separator,
  Dropdown_Trigger as Trigger,
  dropdownItemVariants as dropdownMenuItemVariants,
};
