import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:shadow-focus-accent [&_svg]:size-3.5",
  {
    variants: {
      variant: {
        neutral:
          "border-border bg-background text-foreground hover:bg-background-soft",
        active:
          "border-accent bg-accent-lightest text-accent-darker",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(chipVariants({ variant, className }))} {...props} />
  ),
);
Chip.displayName = "Chip";
