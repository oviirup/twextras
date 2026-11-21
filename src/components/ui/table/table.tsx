import { Children, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// table root --->

function Table_Root({ className, children, ...props }: Table_Root.Props) {
  let caption: ReactNode;
  const content: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Table_Caption) {
      caption = child;
    } else {
      content.push(child);
    }
  });

  return (
    <div data-slot="table-container" className="w-full">
      <div className="overflow-x-auto rounded-md border">
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-sm/relaxed", className)}
          {...props}>
          {content}
        </table>
      </div>
      {caption}
    </div>
  );
}
namespace Table_Root {
  export type Props = React.ComponentProps<"table">;
}

// table header --->

function Table_Header({ className, ...props }: Table_Header.Props) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "bg-sidebar text-sidebar-foreground [&_tr]:border-b [&_tr]:border-sidebar-border [&_tr]:hover:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}
namespace Table_Header {
  export type Props = React.ComponentProps<"thead">;
}

// table body --->

function Table_Body({ className, ...props }: Table_Body.Props) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}
namespace Table_Body {
  export type Props = React.ComponentProps<"tbody">;
}

// table footer --->

function Table_Footer({ className, ...props }: Table_Footer.Props) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}
namespace Table_Footer {
  export type Props = React.ComponentProps<"tfoot">;
}

// table row --->

function Table_Row({ className, ...props }: Table_Row.Props) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "cursor-default border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}
namespace Table_Row {
  export type Props = React.ComponentProps<"tr">;
}

// table head --->

function Table_Head({ className, ...props }: Table_Head.Props) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-3 text-left align-middle font-medium whitespace-nowrap text-sidebar-foreground/70 has-[[role=checkbox]]:pr-0",
        className,
      )}
      {...props}
    />
  );
}
namespace Table_Head {
  export type Props = React.ComponentProps<"th">;
}

// table cell --->

function Table_Cell({ className, ...props }: Table_Cell.Props) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-3 align-middle has-[[role=checkbox]]:pr-0", className)}
      {...props}
    />
  );
}
namespace Table_Cell {
  export type Props = React.ComponentProps<"td">;
}

// table caption --->

function Table_Caption({ className, ...props }: Table_Caption.Props) {
  return (
    <div
      data-slot="table-caption"
      className={cn("mt-3 px-1 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
namespace Table_Caption {
  export type Props = React.ComponentProps<"div">;
}

// exports --->

export {
  Table_Body as Body,
  Table_Caption as Caption,
  Table_Cell as Cell,
  Table_Footer as Footer,
  Table_Head as Head,
  Table_Header as Header,
  Table_Root as Root,
  Table_Row as Row,
};
