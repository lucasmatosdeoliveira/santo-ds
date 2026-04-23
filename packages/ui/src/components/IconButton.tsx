import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const iconButtonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:shadow-focus-accent disabled:opacity-40 disabled:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-accent text-foreground-inversed hover:bg-accent-dark",
        secondary: "bg-background border border-border text-foreground hover:bg-background-soft",
        ghost: "bg-transparent text-foreground hover:bg-background-soft",
      },
      size: {
        sm: "size-8 rounded-6 [&_svg]:size-4",
        md: "size-10 rounded-8 [&_svg]:size-4",
        lg: "size-12 rounded-10 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(iconButtonVariants({ variant, size, className }))} {...props} />
  ),
);
IconButton.displayName = "IconButton";
