import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:shadow-focus-accent disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-background-soft data-[state=on]:bg-background-soft data-[state=on]:text-foreground",
        outline: "border border-border bg-transparent hover:bg-background-soft data-[state=on]:bg-background-soft",
      },
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-3",
        lg: "h-12 px-5",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));
Toggle.displayName = TogglePrimitive.Root.displayName;

export { toggleVariants };
