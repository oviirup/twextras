"use client";

import { Dialog as BaseSheet } from "baseui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// sheet root --->

function Sheet_Root({ ...props }: Sheet_Root.Props) {
  return <BaseSheet.Root data-slot="sheet" {...props} />;
}
namespace Sheet_Root {
  export type Props = BaseSheet.Root.Props;
}

// sheet trigger --->

function Sheet_Trigger({ ...props }: Sheet_Trigger.Props) {
  return <BaseSheet.Trigger data-slot="sheet-trigger" {...props} />;
}
namespace Sheet_Trigger {
  export type Props = BaseSheet.Trigger.Props;
}

// sheet close --->

function Sheet_Close({ ...props }: Sheet_Close.Props) {
  return <BaseSheet.Close data-slot="sheet-close" {...props} />;
}
namespace Sheet_Close {
  export type Props = BaseSheet.Close.Props;
}

// sheet portal --->

function Sheet_Portal({ ...props }: Sheet_Portal.Props) {
  return <BaseSheet.Portal data-slot="sheet-portal" {...props} />;
}
namespace Sheet_Portal {
  export type Props = BaseSheet.Portal.Props;
}

// sheet overlay --->

function Sheet_Overlay({ className, ...props }: Sheet_Overlay.Props) {
  return (
    <BaseSheet.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/80 transition-opacity duration-150 supports-backdrop-filter:backdrop-blur-xs data-transition-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}
namespace Sheet_Overlay {
  export type Props = BaseSheet.Backdrop.Props;
}

// sheet content --->

function Sheet_Content({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: Sheet_Content.Props) {
  return (
    <Sheet_Portal>
      <Sheet_Overlay />
      <BaseSheet.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col bg-popover bg-clip-padding text-sm/relaxed text-popover-foreground shadow-lg shadow-black/8 transition duration-200 ease-in-out data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-transition-style:opacity-0 data-[side=left]:data-transition-style:-translate-x-10 data-[side=right]:data-transition-style:translate-x-10",
          className,
        )}
        {...props}>
        {children}
        {showCloseButton && (
          <BaseSheet.Close
            data-slot="sheet-close"
            render={<Button variant="ghost" icon size="sm" className="absolute top-4 right-4" />}>
            <Icons.Close className="size-4" />
            <span className="sr-only">Close</span>
          </BaseSheet.Close>
        )}
      </BaseSheet.Popup>
    </Sheet_Portal>
  );
}
namespace Sheet_Content {
  export type Props = BaseSheet.Popup.Props & {
    side?: "left" | "right";
    showCloseButton?: boolean;
  };
}

// sheet header --->

function Sheet_Header({ className, ...props }: Sheet_Header.Props) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}
namespace Sheet_Header {
  export type Props = React.ComponentProps<"div">;
}

// sheet footer --->

function Sheet_Footer({ className, ...props }: Sheet_Footer.Props) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-6", className)}
      {...props}
    />
  );
}
namespace Sheet_Footer {
  export type Props = React.ComponentProps<"div">;
}

// sheet title --->

function Sheet_Title({ className, ...props }: Sheet_Title.Props) {
  return (
    <BaseSheet.Title
      data-slot="sheet-title"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  );
}
namespace Sheet_Title {
  export type Props = BaseSheet.Title.Props;
}

// sheet description --->

function Sheet_Description({ className, ...props }: Sheet_Description.Props) {
  return (
    <BaseSheet.Description
      data-slot="sheet-description"
      className={cn("text-sm/relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}
namespace Sheet_Description {
  export type Props = BaseSheet.Description.Props;
}

// exports --->

export {
  Sheet_Close as Close,
  Sheet_Content as Content,
  Sheet_Description as Description,
  Sheet_Footer as Footer,
  Sheet_Header as Header,
  Sheet_Overlay as Overlay,
  Sheet_Portal as Portal,
  Sheet_Root as Root,
  Sheet_Title as Title,
  Sheet_Trigger as Trigger,
};
