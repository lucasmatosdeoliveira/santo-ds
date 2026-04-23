import * as React from "react";
import { Calendar } from "lucide-react";
import { Input, type InputProps } from "./Input";
import { cn } from "../lib/utils";

export const DateField = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Input ref={ref} type="date" className={cn("pr-10", className)} {...props} />
      <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground-soft" />
    </div>
  ),
);
DateField.displayName = "DateField";
