"use client";

import { Avatar as BaseAvatar } from "baseui/avatar";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import FallbackImage from "./fallback.png";

// avatar root --->

function Avatar_Root({ className, size = "default", ...props }: Avatar_Root.Props) {
  return (
    <BaseAvatar.Root
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
  export type Props = BaseAvatar.Root.Props & {
    size?: "default" | "sm" | "lg";
  };
}

// avatar image --->

function Avatar_Image({
  className,
  src,
  alt = "",
  sizes = "40px",
  quality,
  ...props
}: Avatar_Image.Props) {
  const imageSrc = typeof src === "string" ? src : "src" in src ? src.src : src.default.src;

  return (
    <BaseAvatar.Image
      data-slot="avatar-image"
      keepMounted
      src={imageSrc}
      alt={alt}
      sizes={sizes}
      render={<Image fill src={src} alt={alt} quality={quality} />}
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  );
}
namespace Avatar_Image {
  export type Props = Omit<BaseAvatar.Image.Props, "src"> & Pick<ImageProps, "src" | "quality">;
}

// avatar fallback --->

function Avatar_Fallback({ className, children, ...props }: Avatar_Fallback.Props) {
  return (
    <BaseAvatar.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-xs text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      {...props}>
      {children ?? (
        <Image
          src={FallbackImage}
          alt=""
          width={FallbackImage.width}
          height={FallbackImage.height}
          className="size-full rounded-full object-cover"
        />
      )}
    </BaseAvatar.Fallback>
  );
}
namespace Avatar_Fallback {
  export type Props = BaseAvatar.Fallback.Props;
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
