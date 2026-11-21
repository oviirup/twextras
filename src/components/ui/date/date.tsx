"use client";

import { Popover as BasePopover } from "baseui/popover";
import { format } from "date-fns";
import { useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import type { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input";
import { useComposeRefs } from "@/lib/hooks";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// date --->

function formatDate(date: Date | null | undefined) {
  if (!date) return "";
  return format(date, "dd-MM-yyyy");
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: public component name is Date
function Date({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  className,
  inputClassName,
  ref,
  ...props
}: Date.Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const composedInputRef = useComposeRefs(inputRef, ref);

  return (
    <BasePopover.Root>
      <InputGroup.Root className={className}>
        <BasePopover.Trigger
          render={
            <InputGroup.Input
              readOnly
              value={formatDate(value)}
              placeholder={placeholder}
              disabled={disabled}
              className={cn("cursor-default tabular-nums caret-transparent", inputClassName)}
              ref={composedInputRef}
              {...props}
            />
          }
          nativeButton={false}
        />
        <InputGroup.Addon align="inline-end" className="pr-3.5">
          <Icons.Calendar />
        </InputGroup.Addon>
      </InputGroup.Root>
      <BasePopover.Portal>
        <BasePopover.Positioner side="bottom" sideOffset={4} align="start" className="isolate z-50">
          <BasePopover.Popup
            data-slot="date-content"
            className="z-50 rounded-lg bg-popover p-3 text-popover-foreground shadow-xl ring-1 shadow-black/8 ring-foreground/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
            <Calendar
              selected={value}
              onSelect={(day) => {
                onChange?.(day);
              }}
            />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
namespace Date {
  export type Props = Omit<Input.Props, "value" | "onChange" | "readOnly"> & {
    className?: string;
    inputClassName?: string;
    value?: Date | null | undefined;
    onChange?: (date: Date) => void;
  };
}

// exports --->

export { Date };
