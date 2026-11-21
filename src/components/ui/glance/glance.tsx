"use client";

import { PreviewCard as BasePreviewCard } from "baseui/preview-card";
import { cn } from "@/lib/utils";

// glance root --->

function Glance_Root({ ...props }: Glance_Root.Props) {
  return <BasePreviewCard.Root data-slot="glance" {...props} />;
}
namespace Glance_Root {
  export type Props = BasePreviewCard.Root.Props;
}

// glance trigger --->

function Glance_Trigger({ ...props }: Glance_Trigger.Props) {
  return <BasePreviewCard.Trigger data-slot="glance-trigger" {...props} />;
}
namespace Glance_Trigger {
  export type Props = BasePreviewCard.Trigger.Props;
}

// glance portal --->

function Glance_Portal({ ...props }: Glance_Portal.Props) {
  return <BasePreviewCard.Portal data-slot="glance-portal" {...props} />;
}
namespace Glance_Portal {
  export type Props = BasePreviewCard.Portal.Props;
}

// glance content --->

function Glance_Content({
  align = "center",
  side = "bottom",
  anchor,
  className,
  ...props
}: Glance_Content.Props) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={0}
        side={side}
        sideOffset={4}
        anchor={anchor}>
        <BasePreviewCard.Popup
          data-slot="glance-content"
          className={cn(
            "z-50 max-h-(--available-height) w-72 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-4 text-popover-foreground shadow-lg ring-1 shadow-black/8 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}
        />
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}
namespace Glance_Content {
  export type Props = BasePreviewCard.Popup.Props &
    Pick<BasePreviewCard.Positioner.Props, "align" | "anchor" | "side">;
}

// exports --->

export {
  Glance_Content as Content,
  Glance_Portal as Portal,
  Glance_Root as Root,
  Glance_Trigger as Trigger,
};
