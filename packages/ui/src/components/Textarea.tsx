import * as React from "react";
import { cn } from "../lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-8 border border-border bg-background px-3 py-2 text-sm text-foreground",
        "placeholder:text-foreground-soft",
        "focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-focus-accent",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
