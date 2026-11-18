"use client";

import { Separator as SeparatorPrimitive } from "baseui/separator";
import { cn, cva } from "@/lib/utils";

// separator variants --->

const separatorVariants = cva({
  base: "shrink-0 bg-center select-none",
  variants: {
    orientation: {
      horizontal: "w-full border-t",
      vertical: "h-full self-stretch border-r",
    },
    dashed: {
      true: "mask-linear-90 mask-linear-from-transparent mask-linear-from-50% mask-linear-to-black mask-linear-to-50% mask-size-[12px] mask-center",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", dashed: true, class: "mask-linear-90" },
    { orientation: "vertical", dashed: true, class: "mask-linear-0" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    dashed: false,
  },
});

// separator --->

function Separator({ className, orientation = "horizontal", dashed, ...props }: Separator.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(separatorVariants({ orientation, dashed }), className)}
      {...props}
    />
  );
}
namespace Separator {
  export type Props = SeparatorPrimitive.Props & { dashed?: boolean };
}

// exports --->

export { Separator, separatorVariants };
