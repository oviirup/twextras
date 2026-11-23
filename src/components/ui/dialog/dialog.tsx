"use client";

import { Dialog as BaseDialog } from "baseui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// dialog root --->

function Dialog_Root({ ...props }: Dialog_Root.Props) {
  return <BaseDialog.Root data-slot="dialog" {...props} />;
}
namespace Dialog_Root {
  export type Props = BaseDialog.Root.Props;
}

// dialog trigger --->

function Dialog_Trigger({ ...props }: Dialog_Trigger.Props) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" {...props} />;
}
namespace Dialog_Trigger {
  export type Props = BaseDialog.Trigger.Props;
}

// dialog portal --->

function Dialog_Portal({ ...props }: Dialog_Portal.Props) {
  return <BaseDialog.Portal data-slot="dialog-portal" {...props} />;
}
namespace Dialog_Portal {
  export type Props = BaseDialog.Portal.Props;
}

// dialog close --->

function Dialog_Close({ ...props }: Dialog_Close.Props) {
  return <BaseDialog.Close data-slot="dialog-close" {...props} />;
}
namespace Dialog_Close {
  export type Props = BaseDialog.Close.Props;
}

// dialog overlay --->

function Dialog_Overlay({ className, ...props }: Dialog_Overlay.Props) {
  return (
    <BaseDialog.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/50 transition-opacity data-transition-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}
namespace Dialog_Overlay {
  export type Props = BaseDialog.Backdrop.Props;
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
      <BaseDialog.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-1/2 gap-4 rounded-xl bg-popover p-4 text-sm/relaxed text-popover-foreground ring-1 ring-foreground/10 transition-[scale,opacity] ease-out outline-none sm:max-w-sm data-open:duration-250 data-transition-style:scale-95 data-transition-style:opacity-0",
          className,
        )}
        {...props}>
        {children}
        {showCloseButton && (
          <BaseDialog.Close
            data-slot="dialog-close"
            render={<Button variant="ghost" className="absolute top-2 right-2" icon size="sm" />}>
            <Icons.Close className="size-3 stroke-2.5" />
            <span className="sr-only">Close</span>
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
    </Dialog_Portal>
  );
}
namespace Dialog_Content {
  export type Props = BaseDialog.Popup.Props & { showCloseButton?: boolean };
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
        <BaseDialog.Close render={<Button variant="outline" />}>Close</BaseDialog.Close>
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
    <BaseDialog.Title
      data-slot="dialog-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}
namespace Dialog_Title {
  export type Props = BaseDialog.Title.Props;
}

// dialog description --->

function Dialog_Description({ className, ...props }: Dialog_Description.Props) {
  return (
    <BaseDialog.Description
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
  export type Props = BaseDialog.Description.Props;
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
