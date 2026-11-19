import * as React from "react";
import { cn, cva } from "@/lib/utils";

// empty root --->

function Empty_Root({ className, ...props }: Empty_Root.Props) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance",
        className,
      )}
      {...props}
    />
  );
}
namespace Empty_Root {
  export type Props = React.ComponentProps<"div">;
}

// empty header --->

function Empty_Header({ className, ...props }: Empty_Header.Props) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-1", className)}
      {...props}
    />
  );
}
namespace Empty_Header {
  export type Props = React.ComponentProps<"div">;
}

// empty media variants --->

const emptyMediaVariants = cva({
  base: "mb-2 flex shrink-0 items-center justify-center text-foreground",
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "size-9 rounded-lg border border-border/75 bg-muted icon:not-[[class*='size-']]:size-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// empty media --->

function Empty_Media({ className, variant = "default", ...props }: Empty_Media.Props) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  );
}
namespace Empty_Media {
  export type Props = React.ComponentProps<"div"> & cva.Props<typeof emptyMediaVariants>;
}

// empty title --->

function Empty_Title({ className, ...props }: Empty_Title.Props) {
  return (
    <div data-slot="empty-title" className={cn("text-base font-medium", className)} {...props} />
  );
}
namespace Empty_Title {
  export type Props = React.ComponentProps<"div">;
}

// empty description --->

function Empty_Description({ className, ...props }: Empty_Description.Props) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}
    />
  );
}
namespace Empty_Description {
  export type Props = React.ComponentProps<"div">;
}

// empty content --->

function Empty_Content({ className, ...props }: Empty_Content.Props) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2 text-sm/relaxed text-balance",
        className,
      )}
      {...props}
    />
  );
}
namespace Empty_Content {
  export type Props = React.ComponentProps<"div">;
}

// exports --->

export {
  Empty_Content as Content,
  Empty_Description as Description,
  Empty_Header as Header,
  Empty_Media as Media,
  Empty_Root as Root,
  Empty_Title as Title,
  emptyMediaVariants,
};
