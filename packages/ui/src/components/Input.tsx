import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const inputVariants = cva(
  [
    "flex w-full bg-background text-foreground transition-colors",
    "placeholder:text-foreground-soft",
    "focus-visible:outline-none focus-visible:border-foreground/60 focus-visible:shadow-focus-accent",
    "hover:border-foreground/60",
    "disabled:bg-black/[0.06] disabled:border-transparent disabled:text-foreground/40 disabled:cursor-not-allowed disabled:placeholder:text-foreground/40",
    "read-only:bg-transparent read-only:hover:border-border read-only:focus-visible:border-border read-only:focus-visible:shadow-none",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-48 px-12 py-8 text-base rounded-10",
        lg: "h-56 px-12 py-8 text-base rounded-12",
      },
      invalid: {
        true: "border-danger hover:border-danger focus-visible:border-danger focus-visible:shadow-[0_0_0_3px_rgba(216,57,73,0.16)]",
        false: "border border-foreground/[0.16]",
      },
    },
    compoundVariants: [
      { invalid: true, class: "border" },
    ],
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
