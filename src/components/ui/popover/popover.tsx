"use client";

import { Popover as BasePopover } from "baseui/popover";
import { cn } from "@/lib/utils";

// popover root --->

function Popover_Root({ ...props }: Popover_Root.Props) {
  return <BasePopover.Root data-slot="popover" {...props} />;
}
namespace Popover_Root {
  export type Props = BasePopover.Root.Props;
}

// popover trigger --->

function Popover_Trigger({ ...props }: Popover_Trigger.Props) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}
namespace Popover_Trigger {
  export type Props = BasePopover.Trigger.Props;
}

// popover portal --->

function Popover_Portal({ ...props }: Popover_Portal.Props) {
  return <BasePopover.Portal data-slot="popover-portal" {...props} />;
}
namespace Popover_Portal {
  export type Props = BasePopover.Portal.Props;
}

// popover content --->

function Popover_Content({
  align = "center",
  side = "bottom",
  anchor,
  className,
  ...props
}: Popover_Content.Props) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={0}
        side={side}
        sideOffset={4}
        anchor={anchor}>
        <BasePopover.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 max-h-(--available-height) w-72 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-4 text-popover-foreground shadow-lg ring-1 shadow-black/8 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
namespace Popover_Content {
  export type Props = BasePopover.Popup.Props &
    Pick<BasePopover.Positioner.Props, "align" | "anchor" | "side">;
}

// popover title --->

function Popover_Title({ className, ...props }: Popover_Title.Props) {
  return (
    <BasePopover.Title
      data-slot="popover-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}
namespace Popover_Title {
  export type Props = BasePopover.Title.Props;
}

// popover description --->

function Popover_Description({ className, ...props }: Popover_Description.Props) {
  return (
    <BasePopover.Description
      data-slot="popover-description"
      className={cn("mt-1 text-sm/relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}
namespace Popover_Description {
  export type Props = BasePopover.Description.Props;
}

// popover close --->

function Popover_Close({ ...props }: Popover_Close.Props) {
  return <BasePopover.Close data-slot="popover-close" {...props} />;
}
namespace Popover_Close {
  export type Props = BasePopover.Close.Props;
}

// exports --->

export {
  Popover_Close as Close,
  Popover_Content as Content,
  Popover_Description as Description,
  Popover_Portal as Portal,
  Popover_Root as Root,
  Popover_Title as Title,
  Popover_Trigger as Trigger,
};
