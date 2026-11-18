"use client";

import { Dialog as DialogPrimitive } from "baseui/dialog";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// dialog root --->

function Dialog_Root({ ...props }: Dialog_Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
namespace Dialog_Root {
  export type Props = DialogPrimitive.Root.Props;
}

// dialog trigger --->

function Dialog_Trigger({ ...props }: Dialog_Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
namespace Dialog_Trigger {
  export type Props = DialogPrimitive.Trigger.Props;
}

// dialog portal --->

function Dialog_Portal({ ...props }: Dialog_Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
namespace Dialog_Portal {
  export type Props = DialogPrimitive.Portal.Props;
}

// dialog close --->

function Dialog_Close({ ...props }: Dialog_Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
namespace Dialog_Close {
  export type Props = DialogPrimitive.Close.Props;
}

// dialog overlay --->

function Dialog_Overlay({ className, ...props }: Dialog_Overlay.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/80 transition-opacity supports-backdrop-filter:backdrop-blur-xs data-transition-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}
namespace Dialog_Overlay {
  export type Props = DialogPrimitive.Backdrop.Props;
}

// dialog content --->

function Dialog_Content({
  className,
  children,
  showCloseButton = true,
  ...props
}: Dialog_Content.Props) {
  return (
    <Dialog_Portal>
      <Dialog_Overlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-1/2 gap-4 rounded-xl bg-popover p-4 text-sm/relaxed text-popover-foreground ring-1 ring-foreground/10 transition-[scale,opacity] ease-out outline-none sm:max-w-sm data-open:duration-250 data-transition-style:scale-95 data-transition-style:opacity-0",
          className,
        )}
        {...props}>
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={<Button variant="ghost" className="absolute top-2 right-2" icon size="sm" />}>
            <Icons.Close className="size-3 stroke-2.5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </Dialog_Portal>
  );
}
namespace Dialog_Content {
  export type Props = DialogPrimitive.Popup.Props & { showCloseButton?: boolean };
}

// dialog header --->

function Dialog_Header({ className, ...props }: Dialog_Header.Props) {
  return (
    <div data-slot="dialog-header" className={cn("flex flex-col gap-1", className)} {...props} />
  );
}
namespace Dialog_Header {
  export type Props = React.ComponentProps<"div">;
}

// dialog footer --->

function Dialog_Footer({
  className,
  showCloseButton = false,
  children,
  ...props
}: Dialog_Footer.Props) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}>
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>
      )}
    </div>
  );
}
namespace Dialog_Footer {
  export type Props = React.ComponentProps<"div"> & { showCloseButton?: boolean };
}

// dialog title --->

function Dialog_Title({ className, ...props }: Dialog_Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}
namespace Dialog_Title {
  export type Props = DialogPrimitive.Title.Props;
}

// dialog description --->

function Dialog_Description({ className, ...props }: Dialog_Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
namespace Dialog_Description {
  export type Props = DialogPrimitive.Description.Props;
}

// exports --->

export {
  Dialog_Close as Close,
  Dialog_Content as Content,
  Dialog_Description as Description,
  Dialog_Footer as Footer,
  Dialog_Header as Header,
  Dialog_Overlay as Overlay,
  Dialog_Portal as Portal,
  Dialog_Root as Root,
  Dialog_Title as Title,
  Dialog_Trigger as Trigger,
};
