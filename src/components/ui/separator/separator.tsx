"use client";

import { Separator as SeparatorPrimitive } from "baseui/separator";
import { cn } from "@/lib/utils";

// separator --->

function Separator({ className, orientation = "horizontal", ...props }: Separator.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-orientation-horizontal:h-px data-orientation-horizontal:w-full data-orientation-vertical:w-px data-orientation-vertical:self-stretch",
        className,
      )}
      {...props}
    />
  );
}
namespace Separator {
  export type Props = SeparatorPrimitive.Props;
}

// exports --->

export { Separator };
