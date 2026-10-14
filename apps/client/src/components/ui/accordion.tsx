import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { cn } from "cn";
import type { ReactNode } from "react";

const accordionItemVariants = {
  plain: "",
  tile: "rounded-lg bg-secondary px-5 transition-colors data-open:bg-primary data-open:text-primary-foreground",
} as const;

const accordionTriggerVariants = {
  plain: "text-foreground",
  tile: "min-h-16 items-center py-4 text-base font-medium hover:no-underline data-open:text-primary-foreground",
} as const;

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

// The item carries no rule of its own: tiles are separated by a step in tone.
function AccordionItem({
  className,
  variant,
  ...props
}: AccordionPrimitive.Item.Props & {
  variant?: keyof typeof accordionItemVariants;
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants[variant ?? "plain"], className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  icon,
  variant,
  ...props
}: AccordionPrimitive.Trigger.Props & {
  icon?: ReactNode;
  variant?: keyof typeof accordionTriggerVariants;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4",
          accordionTriggerVariants[variant ?? "plain"],
          className,
        )}
        {...props}
      >
        {children}
        {icon ?? (
          <>
            <IconChevronDown
              data-slot="accordion-trigger-icon"
              className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
            />
            <IconChevronUp
              data-slot="accordion-trigger-icon"
              className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
            />
          </>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
