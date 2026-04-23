import * as React from "react";
import { Label } from "./Label";
import { cn } from "../lib/utils";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  htmlFor?: string;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ label, htmlFor, helperText, error, required, className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} className="flex items-center gap-1">
          {label}
          {required && <span className="text-danger">*</span>}
        </Label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-danger">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-foreground-soft">{helperText}</p>
      ) : null}
    </div>
  ),
);
Field.displayName = "Field";
