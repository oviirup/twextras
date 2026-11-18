import { inputVariants } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// textarea --->

function Textarea({ className, ...props }: Textarea.Props) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-10 w-full resize-none py-2.25",
        inputVariants(),
        className,
      )}
      {...props}
    />
  );
}
namespace Textarea {
  export type Props = React.ComponentProps<"textarea">;
}

// exports --->

export { Textarea };
