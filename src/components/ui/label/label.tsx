"use client";

import { cn } from "@/lib/utils";

// label --->

function Label({ className, ...props }: Label.Props) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm/relaxed leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
namespace Label {
  export type Props = React.ComponentProps<"label">;
}

// exports --->

export { Label };
