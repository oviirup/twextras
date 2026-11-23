"use client";

import { AlertDialog as BaseAlert } from "baseui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// alert root --->

function Alert_Root({ ...props }: Alert_Root.Props) {
  return <BaseAlert.Root data-slot="alert" {...props} />;
}
namespace Alert_Root {
  export type Props = BaseAlert.Root.Props;
}

// alert trigger --->

function Alert_Trigger({ ...props }: Alert_Trigger.Props) {
  return <BaseAlert.Trigger data-slot="alert-trigger" {...props} />;
}
namespace Alert_Trigger {
  export type Props = BaseAlert.Trigger.Props;
}

// alert portal --->

function Alert_Portal({ ...props }: Alert_Portal.Props) {
  return <BaseAlert.Portal data-slot="alert-portal" {...props} />;
}
namespace Alert_Portal {
  export type Props = BaseAlert.Portal.Props;
}

// alert close --->

function Alert_Close({ ...props }: Alert_Close.Props) {
  return <BaseAlert.Close data-slot="alert-close" {...props} />;
}
namespace Alert_Close {
  export type Props = BaseAlert.Close.Props;
}

// alert overlay --->

function Alert_Overlay({ className, ...props }: Alert_Overlay.Props) {
  return (
    <BaseAlert.Backdrop
      forceRender
      data-slot="alert-overlay"
      className={cn(
        "fixed inset-0 isolate z-60 bg-black/50 transition-opacity data-transition-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}
namespace Alert_Overlay {
  export type Props = BaseAlert.Backdrop.Props;
}

// alert content --->

function Alert_Content({ className, children, ...props }: Alert_Content.Props) {
  return (
    <Alert_Portal>
      <Alert_Overlay />
      <BaseAlert.Popup
        data-slot="alert-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-60 grid w-full max-w-[calc(100%-2rem)] -translate-1/2 gap-4 rounded-xl bg-popover p-4 text-sm/relaxed text-popover-foreground ring-1 ring-foreground/10 transition-[scale,opacity] ease-out outline-none sm:max-w-sm data-open:duration-250 data-transition-style:scale-95 data-transition-style:opacity-0",
          className,
        )}
        {...props}>
        {children}
      </BaseAlert.Popup>
    </Alert_Portal>
  );
}
namespace Alert_Content {
  export type Props = BaseAlert.Popup.Props;
}

// alert header --->

function Alert_Header({ className, ...props }: Alert_Header.Props) {
  return (
    <div data-slot="alert-header" className={cn("flex flex-col gap-1", className)} {...props} />
  );
}
namespace Alert_Header {
  export type Props = React.ComponentProps<"div">;
}

// alert footer --->

function Alert_Footer({
  className,
  showCloseButton = false,
  children,
  ...props
}: Alert_Footer.Props) {
  return (
    <div
      data-slot="alert-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end",
        className,
      )}
      {...props}>
      {children}
      {showCloseButton && (
        <BaseAlert.Close render={<Button variant="outline" />}>Close</BaseAlert.Close>
      )}
    </div>
  );
}
namespace Alert_Footer {
  export type Props = React.ComponentProps<"div"> & { showCloseButton?: boolean };
}

// alert title --->

function Alert_Title({ className, ...props }: Alert_Title.Props) {
  return (
    <BaseAlert.Title
      data-slot="alert-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}
namespace Alert_Title {
  export type Props = BaseAlert.Title.Props;
}

// alert description --->

function Alert_Description({ className, ...props }: Alert_Description.Props) {
  return (
    <BaseAlert.Description
      data-slot="alert-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
namespace Alert_Description {
  export type Props = BaseAlert.Description.Props;
}

// exports --->

export {
  Alert_Close as Close,
  Alert_Content as Content,
  Alert_Description as Description,
  Alert_Footer as Footer,
  Alert_Header as Header,
  Alert_Overlay as Overlay,
  Alert_Portal as Portal,
  Alert_Root as Root,
  Alert_Title as Title,
  Alert_Trigger as Trigger,
};
