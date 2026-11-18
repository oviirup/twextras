import * as React from "react";
import { cn } from "@/lib/utils";

// card root --->

function Card_Root({ className, size = "default", ...props }: Card_Root.Props) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-lg bg-card py-(--card-spacing) text-sm/relaxed text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
        className,
      )}
      {...props}
    />
  );
}
namespace Card_Root {
  export type Props = React.ComponentProps<"div"> & { size?: "default" | "sm" };
}

// card header --->

function Card_Header({ className, ...props }: Card_Header.Props) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header has-slot-card-action:grid-cols-[1fr_auto] has-slot-card-description:grid-rows-[auto_auto] @container/card-header grid auto-rows-min items-start gap-1 rounded-t-lg px-(--card-spacing) [.border-b]:pb-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}
namespace Card_Header {
  export type Props = React.ComponentProps<"div">;
}

// card title --->

function Card_Title({ className, ...props }: Card_Title.Props) {
  return <div data-slot="card-title" className={cn("text-sm font-medium", className)} {...props} />;
}
namespace Card_Title {
  export type Props = React.ComponentProps<"div">;
}

// card description --->

function Card_Description({ className, ...props }: Card_Description.Props) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm/relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}
namespace Card_Description {
  export type Props = React.ComponentProps<"div">;
}

// card action --->

function Card_Action({ className, ...props }: Card_Action.Props) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}
namespace Card_Action {
  export type Props = React.ComponentProps<"div">;
}

// card content --->

function Card_Content({ className, ...props }: Card_Content.Props) {
  return (
    <div data-slot="card-content" className={cn("px-(--card-spacing)", className)} {...props} />
  );
}
namespace Card_Content {
  export type Props = React.ComponentProps<"div">;
}

// card footer --->

function Card_Footer({ className, ...props }: Card_Footer.Props) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-lg px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}
namespace Card_Footer {
  export type Props = React.ComponentProps<"div">;
}

// exports --->

export {
  Card_Action as Action,
  Card_Content as Content,
  Card_Description as Description,
  Card_Footer as Footer,
  Card_Header as Header,
  Card_Root as Root,
  Card_Title as Title,
};
