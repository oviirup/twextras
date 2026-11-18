import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// pagination root --->

function Pagination_Root({ className, ...props }: Pagination_Root.Props) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}
namespace Pagination_Root {
  export type Props = React.ComponentProps<"nav">;
}

// pagination content --->

function Pagination_Content({ className, ...props }: Pagination_Content.Props) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
}
namespace Pagination_Content {
  export type Props = React.ComponentProps<"ul">;
}

// pagination item --->

function Pagination_Item({ ...props }: Pagination_Item.Props) {
  return <li data-slot="pagination-item" {...props} />;
}
namespace Pagination_Item {
  export type Props = React.ComponentProps<"li">;
}

// pagination link --->

function Pagination_Link({
  className,
  isActive,
  icon,
  size = "sm",
  ...props
}: Pagination_Link.Props) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      icon={icon}
      className={cn(className, "border-primary data-active:text-primary")}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      render={<a {...props} />}
      nonNative
    />
  );
}
namespace Pagination_Link {
  export type Props = React.ComponentProps<"a"> & {
    isActive?: boolean;
  } & Pick<Button.Props, "icon" | "size">;
}

// pagination previous --->

function Pagination_Previous({
  text = "Previous",
  size = "base",
  ...props
}: Pagination_Previous.Props) {
  return (
    <Pagination_Link aria-label="Go to previous page" size={size} {...props}>
      <Icons.ArrowLeft data-icon-start />
      <span className="hidden font-medium sm:block">{text}</span>
    </Pagination_Link>
  );
}
namespace Pagination_Previous {
  export type Props = Pagination_Link.Props & { text?: string };
}

// pagination next --->

function Pagination_Next({
  text = "Next",
  icon = false,
  size = "base",
  ...props
}: Pagination_Next.Props) {
  return (
    <Pagination_Link aria-label="Go to next page" size={size} icon={icon} {...props}>
      <span className="hidden font-medium sm:block">{text}</span>
      <Icons.ArrowRight data-icon-end />
    </Pagination_Link>
  );
}
namespace Pagination_Next {
  export type Props = React.ComponentProps<typeof Pagination_Link> & { text?: string };
}

// pagination ellipsis --->

function Pagination_Ellipsis({ className, ...props }: Pagination_Ellipsis.Props) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-7 items-center justify-center icon:not-[[class*='size-']]:size-3.5",
        className,
      )}
      {...props}>
      <Icons.Ellipsis />
      <span className="sr-only">More pages</span>
    </span>
  );
}
namespace Pagination_Ellipsis {
  export type Props = React.ComponentProps<"span">;
}

// exports --->

export {
  Pagination_Content as Content,
  Pagination_Ellipsis as Ellipsis,
  Pagination_Item as Item,
  Pagination_Link as Link,
  Pagination_Next as Next,
  Pagination_Previous as Previous,
  Pagination_Root as Root,
};
