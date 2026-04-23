import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        neutral: "bg-background-soft text-foreground border border-border-soft",
        accent: "bg-accent-lightest text-accent-darker",
        success: "bg-success-light text-success-dark",
        warning: "bg-warning-light text-warning-dark",
        danger: "bg-danger-light text-danger-dark",
        solid: "bg-accent text-foreground-inversed",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { badgeVariants };
