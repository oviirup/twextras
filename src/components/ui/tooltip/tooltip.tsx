"use client";

import { Tooltip as BaseTooltip } from "baseui/tooltip";
import { cn } from "@/lib/utils";

// tooltip provider --->

function Tooltip_Provider({ delay = 0, ...props }: Tooltip_Provider.Props) {
  return <BaseTooltip.Provider data-slot="tooltip-provider" delay={delay} {...props} />;
}
namespace Tooltip_Provider {
  export type Props = BaseTooltip.Provider.Props;
}

// tooltip root --->

function Tooltip_Root({ ...props }: Tooltip_Root.Props) {
  return <BaseTooltip.Root data-slot="tooltip" {...props} />;
}
namespace Tooltip_Root {
  export type Props = BaseTooltip.Root.Props;
}

// tooltip trigger --->

function Tooltip_Trigger({ ...props }: Tooltip_Trigger.Props) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />;
}
namespace Tooltip_Trigger {
  export type Props = BaseTooltip.Trigger.Props;
}

// tooltip content --->

function Tooltip_Content({
  className,
  side = "top",
  align = "center",
  anchor,
  children,
  ...props
}: Tooltip_Content.Props) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        align={align}
        alignOffset={0}
        side={side}
        sideOffset={4}
        anchor={anchor}
        className="isolate z-50">
        <BaseTooltip.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-sm text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}>
          {children}
          <BaseTooltip.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
namespace Tooltip_Content {
  export type Props = BaseTooltip.Popup.Props &
    Pick<BaseTooltip.Positioner.Props, "align" | "anchor" | "side">;
}

// exports --->

export {
  Tooltip_Content as Content,
  Tooltip_Provider as Provider,
  Tooltip_Root as Root,
  Tooltip_Trigger as Trigger,
};
