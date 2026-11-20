import { Button as BaseButton } from "baseui/button";
import { cn, cva } from "@/lib/utils";

// button variants --->

const buttonVariants = cva({
  base: [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-medium tracking-wide whitespace-nowrap transition-colors select-none focus-visible:z-1 focus-visible:highlight disabled:pointer-events-none disabled:opacity-65",
    "icon:data-icon-end:-mr-1 icon:data-icon-start:-ml-1",
  ],
  variants: {
    variant: {
      base: "bg-primary text-primary-foreground highlight-primary hocus:brightness-110",
      secondary: "bg-secondary text-secondary-foreground hocus:bg-secondary/75",
      outline: "border-2 hocus:bg-secondary/35",
      ghost: "text-secondary-foreground hocus:bg-secondary/50",
    },
    size: {
      base: "h-10 px-4 text-sm icon:size-5",
      sm: "h-8 gap-1.5 px-3 text-sm icon:size-4",
      lg: "h-12 px-5 text-base icon:size-5",
    },
    icon: {
      true: "aspect-square p-0",
    },
  },
  defaultVariants: {
    variant: "base",
    size: "base",
  },
});

// button --->

function Button({ className, variant, size, icon, nonNative, ...props }: Button.Props) {
  return (
    <BaseButton
      data-slot="button"
      data-variant={variant}
      data-size={size}
      nativeButton={nonNative ? false : undefined}
      className={cn(buttonVariants({ variant, size, icon }), className)}
      {...props}
    />
  );
}
namespace Button {
  export type Props = Omit<BaseButton.Props, "nativeButton"> & {
    nonNative?: boolean;
  } & cva.Props<typeof buttonVariants>;
}

// exports --->

export { Button, buttonVariants };
