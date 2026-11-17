"use client";

import { Checkbox as BaseCheckbox } from "baseui/checkbox";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// checkbox --->

export function Checkbox({ className, ...props }: Checkbox.Props) {
  return (
    <BaseCheckbox.Root
      data-slot="checkbox"
      className={cn(
        "peer relative inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-input transition-colors focus-visible:highlight",
        "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-65",
        className,
      )}
      {...props}>
      <BaseCheckbox.Indicator
        data-slot="checkbox-indicator"
        className="pointer-events-none size-4 stroke-2.5 text-primary-foreground duration-300 stroke-dasharray-[19.744] stroke-dashoffset-[19.744] stroke-linecap-round stroke-linejoin-round data-checked:transition-[stroke-dashoffset] data-checked:stroke-dashoffset-[0]"
        render={<Icons.Check />}
        keepMounted
      />
    </BaseCheckbox.Root>
  );
}
export namespace Checkbox {
  export type Props = BaseCheckbox.Root.Props;
}
