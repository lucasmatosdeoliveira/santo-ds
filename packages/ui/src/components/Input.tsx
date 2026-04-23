import * as React from "react";
import { cn } from "../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-8 border border-border bg-background px-3 py-2 text-sm text-foreground",
        "placeholder:text-foreground-soft",
        "focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-focus-accent",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
