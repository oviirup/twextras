"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, cva } from "@/lib/utils";

// input group root --->

function InputGroup_Root({ className, ...props }: InputGroup_Root.Props) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-10 w-full min-w-0 items-center rounded-md border border-input bg-input/20 transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-aria-invalid:border-destructive has-aria-invalid:ring-2 has-aria-invalid:ring-destructive/20 has-data-[align=block-end]:rounded-md has-data-[align=block-start]:rounded-md has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:highlight has-[textarea]:rounded-md dark:bg-input/30 dark:has-aria-invalid:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className,
      )}
      {...props}
    />
  );
}
namespace InputGroup_Root {
  export type Props = React.ComponentProps<"div">;
}

// input group addon variants --->

const inputGroupAddonVariants = cva({
  base: "**:slot-kbd:rounded-[calc(var(--radius-sm)-2px)] **:slot-kbd:bg-muted-foreground/10 **:slot-kbd:px-1 **:slot-kbd:text-[0.625rem] flex h-auto cursor-text items-center justify-center gap-1.5 py-2 text-sm/relaxed font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 icon:not-[[class*='size-']]:size-4",
  variants: {
    align: {
      "inline-start": "order-first pl-2 has-[>button]:ml-[-0.275rem] has-[>kbd]:ml-[-0.275rem]",
      "inline-end": "order-last pr-2 has-[>button]:mr-[-0.275rem] has-[>kbd]:mr-[-0.275rem]",
      "block-start":
        "order-first w-full justify-start px-2 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
      "block-end":
        "order-last w-full justify-start px-2 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
    },
    offset: {
      true: "",
    },
  },
  compoundVariants: [
    { align: "inline-start", offset: true, className: "pl-3.5" },
    { align: "inline-end", offset: true, className: "pr-3.5" },
    { align: "block-start", offset: true, className: "px-3.5" },
    { align: "block-end", offset: true, className: "px-3.5" },
  ],
  defaultVariants: {
    align: "inline-start",
  },
});

// input group addon --->

function InputGroup_Addon({
  className,
  align = "inline-start",
  offset,
  ...props
}: InputGroup_Addon.Props) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align, offset }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}
namespace InputGroup_Addon {
  export type Props = React.ComponentProps<"div"> & cva.Props<typeof inputGroupAddonVariants>;
}

// input group button --->

function InputGroup_Button({
  className,
  type = "button",
  variant = "ghost",
  tabIndex = -1,
  ...props
}: InputGroup_Button.Props) {
  return (
    <Button
      type={type}
      variant={variant}
      tabIndex={tabIndex}
      size="sm"
      className={cn("flex items-center gap-1 rounded-full text-sm/relaxed", className)}
      {...props}
    />
  );
}
namespace InputGroup_Button {
  export type Props = Omit<Button.Props, "size" | "type"> & {
    variant?: Button.Props["variant"];
    type?: "button" | "submit" | "reset";
  };
}

// input group text --->

function InputGroup_Text({ className, ...props }: InputGroup_Text.Props) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm/relaxed text-muted-foreground icon:pointer-events-none icon:not-[[class*='size-']]:size-4",
        className,
      )}
      {...props}
    />
  );
}
namespace InputGroup_Text {
  export type Props = React.ComponentProps<"span">;
}

// input group input --->

function InputGroup_Input({ className, ...props }: InputGroup_Input.Props) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "focus-visible:highlight-transparent flex-1 rounded-none border-0 bg-transparent focus-visible:outline-0 aria-invalid:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}
namespace InputGroup_Input {
  export type Props = Input.Props;
}

// input group textarea --->

function InputGroup_Textarea({ className, ...props }: InputGroup_Textarea.Props) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "focus-visible:highlight-transparent flex-1 resize-none rounded-none border-0 bg-transparent focus-visible:outline-0 aria-invalid:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}
namespace InputGroup_Textarea {
  export type Props = Textarea.Props;
}

// exports --->

export {
  InputGroup_Addon as Addon,
  InputGroup_Button as Button,
  InputGroup_Input as Input,
  InputGroup_Root as Root,
  InputGroup_Text as Text,
  InputGroup_Textarea as Textarea,
};
