import * as React from "react";
import { cn } from "@/lib/utils";

// skeleton --->

function Skeleton({ className, ...props }: Skeleton.Props) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
namespace Skeleton {
  export type Props = React.ComponentProps<"div">;
}

// exports --->

export { Skeleton };
