import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const inputVariants = cva(
  [
    "flex w-full bg-background text-foreground",
    "transition-colors duration-default ease-standard",
    "placeholder:text-foreground-soft",
    "focus-visible:outline-none focus-visible:border-foreground-soft focus-visible:shadow-focus-accent",
    "hover:border-foreground-soft",
    "disabled:bg-state-disabled disabled:border-transparent disabled:text-foreground-disabled disabled:cursor-not-allowed disabled:placeholder:text-foreground-disabled",
    "read-only:bg-transparent read-only:hover:border-border-medium read-only:focus-visible:border-border-medium read-only:focus-visible:shadow-none",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-input-sm px-input rounded-input-sm text-base",
        lg: "h-input-lg px-input rounded-input-lg text-base",
      },
      invalid: {
        true: "border-danger hover:border-danger focus-visible:border-danger focus-visible:shadow-focus-danger",
        false: "border border-border-medium",
      },
    },
    compoundVariants: [{ invalid: true, class: "border" }],
    defaultVariants: { size: "sm", invalid: false },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", size, invalid, "aria-invalid": ariaInvalid, ...props }, ref) => {
    const isInvalid = invalid ?? (ariaInvalid === true || ariaInvalid === "true");
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={isInvalid || undefined}
        className={cn(inputVariants({ size, invalid: isInvalid }), className)}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
