import { Link } from "@/components/ui/link";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// breadcrumb root --->

function Breadcrumb_Root({ ...props }: Breadcrumb_Root.Props) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}
namespace Breadcrumb_Root {
  export type Props = React.ComponentProps<"nav">;
}

// breadcrumb list --->

function Breadcrumb_List({ className, ...props }: Breadcrumb_List.Props) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
namespace Breadcrumb_List {
  export type Props = React.ComponentProps<"ol">;
}

// breadcrumb item --->

function Breadcrumb_Item({ className, ...props }: Breadcrumb_Item.Props) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}
namespace Breadcrumb_Item {
  export type Props = React.ComponentProps<"li">;
}

// breadcrumb link --->

function Breadcrumb_Link({ className, ...props }: Breadcrumb_Link.Props) {
  return (
    <Link
      data-slot="breadcrumb-link"
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
}
namespace Breadcrumb_Link {
  export type Props = React.ComponentProps<typeof Link>;
}

// breadcrumb page --->

function Breadcrumb_Page({ className, ...props }: Breadcrumb_Page.Props) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  );
}
namespace Breadcrumb_Page {
  export type Props = React.ComponentProps<"span">;
}

// breadcrumb separator --->

function Breadcrumb_Separator({ className, ...props }: Breadcrumb_Separator.Props) {
  return (
    <li
      data-slot="breadcrumb-separator"
      aria-hidden="true"
      className={cn("inline-flex items-center text-muted-foreground icon:size-3.5", className)}
      {...props}>
      <Icons.ChevronRight />
    </li>
  );
}
namespace Breadcrumb_Separator {
  export type Props = React.ComponentProps<"li">;
}

// exports --->

export {
  Breadcrumb_Item as Item,
  Breadcrumb_Link as Link,
  Breadcrumb_List as List,
  Breadcrumb_Page as Page,
  Breadcrumb_Root as Root,
  Breadcrumb_Separator as Separator,
};
