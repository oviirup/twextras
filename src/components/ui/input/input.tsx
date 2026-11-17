import { Input as InputPrimitive } from "baseui/input";
import { cn, cva } from "@/lib/utils";

// variants --->

const inputVariants = cva({
  base: [
    "min-w-0 rounded-md border border-input bg-input/50 px-3.5 text-sm/relaxed text-foreground transition-colors placeholder:text-muted-foreground focus-visible:highlight",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
    "disabled:pointer-events-none disabled:opacity-65",
  ],
});

// input --->

function Input({ className, type, ...props }: Input.Props) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn("inline-flex h-10 w-full", inputVariants(), className)}
      {...props}
    />
  );
}
namespace Input {
  export type Props = React.ComponentProps<typeof InputPrimitive>;
}

// exports --->

export { Input, inputVariants };
