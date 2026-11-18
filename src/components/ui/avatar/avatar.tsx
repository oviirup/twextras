"use client";

import { Avatar as AvatarPrimitive } from "baseui/avatar";
import * as React from "react";
import { cn } from "@/lib/utils";

// avatar root --->

function Avatar_Root({ className, size = "default", ...props }: Avatar_Root.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border data-[size=lg]:size-10 data-[size=sm]:size-6",
        className,
      )}
      {...props}
    />
  );
}
namespace Avatar_Root {
  export type Props = AvatarPrimitive.Root.Props & {
    size?: "default" | "sm" | "lg";
  };
}

// avatar image --->

function Avatar_Image({ className, ...props }: Avatar_Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  );
}
namespace Avatar_Image {
  export type Props = AvatarPrimitive.Image.Props;
}

// avatar fallback --->

function Avatar_Fallback({ className, ...props }: Avatar_Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-xs text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      {...props}
    />
  );
}
namespace Avatar_Fallback {
  export type Props = AvatarPrimitive.Fallback.Props;
}

// avatar badge --->

function Avatar_Badge({ className, ...props }: Avatar_Badge.Props) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:icon:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:icon:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:icon:size-2",
        className,
      )}
      {...props}
    />
  );
}
namespace Avatar_Badge {
  export type Props = React.ComponentProps<"span">;
}

// exports --->

export {
  Avatar_Badge as Badge,
  Avatar_Fallback as Fallback,
  Avatar_Image as Image,
  Avatar_Root as Root,
};
