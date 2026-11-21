"use client";

import { Accordion as BaseAccordion } from "baseui/accordion";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// accordion root --->

function Accordion_Root({ className, ...props }: Accordion_Root.Props) {
  return (
    <BaseAccordion.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col rounded-md", className)}
      {...props}
    />
  );
}
namespace Accordion_Root {
  export type Props = BaseAccordion.Root.Props;
}

// accordion item --->

function Accordion_Item({ className, ...props }: Accordion_Item.Props) {
  return (
    <BaseAccordion.Item
      data-slot="accordion-item"
      className={cn(
        "border highlight-ring not-last:border-b-0 first:rounded-t-inherit last:rounded-b-inherit has-focus-visible:z-1 has-focus-visible:highlight data-open:bg-muted/50",
        className,
      )}
      {...props}
    />
  );
}
namespace Accordion_Item {
  export type Props = BaseAccordion.Item.Props;
}

// accordion trigger --->

function Accordion_Trigger({ className, children, ...props }: Accordion_Trigger.Props) {
  return (
    <BaseAccordion.Header className="flex">
      <BaseAccordion.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger **:slot-accordion-trigger-icon:ml-auto **:slot-accordion-trigger-icon:size-4 **:slot-accordion-trigger-icon:text-muted-foreground relative flex flex-1 items-start justify-between gap-6 border border-transparent p-2 text-left text-sm/relaxed font-medium transition-all outline-none hover:underline aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className,
        )}
        {...props}>
        {children}
        <Icons.ChevronDown
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <Icons.ChevronUp
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}
namespace Accordion_Trigger {
  export type Props = BaseAccordion.Trigger.Props;
}

// accordion content --->

function Accordion_Content({ className, children, ...props }: Accordion_Content.Props) {
  return (
    <BaseAccordion.Panel
      data-slot="accordion-content"
      className="overflow-hidden px-2 text-sm/relaxed data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}>
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-4 data-transition-style:h-0 **:[a]:link **:[p]:not-last:mb-4",
          className,
        )}>
        {children}
      </div>
    </BaseAccordion.Panel>
  );
}
namespace Accordion_Content {
  export type Props = BaseAccordion.Panel.Props;
}

// exports --->

export {
  Accordion_Content as Content,
  Accordion_Item as Item,
  Accordion_Root as Root,
  Accordion_Trigger as Trigger,
};
