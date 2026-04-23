import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:shadow-focus-accent disabled:opacity-40 disabled:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-foreground-inversed hover:bg-accent-dark active:bg-accent-darker",
        secondary:
          "bg-background border border-border text-foreground hover:bg-background-soft",
        ghost:
          "bg-transparent text-foreground hover:bg-background-soft",
        link:
          "bg-transparent text-accent underline-offset-4 hover:underline px-0 h-auto",
        destructive:
          "bg-danger text-foreground-inversed hover:bg-danger-dark",
        subtle:
          "bg-background-soft text-foreground hover:bg-background-soft/80",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-6 [&_svg]:size-4",
        md: "h-10 px-4 text-sm rounded-8 [&_svg]:size-4",
        lg: "h-12 px-6 text-base rounded-10 [&_svg]:size-5",
        icon: "size-10 rounded-8 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
