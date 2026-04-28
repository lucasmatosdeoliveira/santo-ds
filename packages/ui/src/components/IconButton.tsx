import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "transition-colors duration-default ease-standard",
    "focus-visible:outline-none focus-visible:shadow-focus-accent",
    "disabled:pointer-events-none",
    "[&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-accent text-foreground-on-accent",
          "hover:bg-accent-dark active:bg-accent-darker",
          "disabled:bg-state-disabled disabled:text-foreground-disabled",
        ].join(" "),
        outline: [
          "bg-transparent border border-accent-a24 text-accent",
          "hover:bg-accent-state-hover active:bg-accent-state-pressed",
          "disabled:bg-state-disabled disabled:border-transparent disabled:text-foreground-disabled",
        ].join(" "),
        tonal: [
          "bg-accent-state-subtle text-accent",
          "hover:bg-accent-state-hover active:bg-accent-state-pressed",
          "disabled:bg-state-disabled disabled:text-foreground-disabled",
        ].join(" "),
        elevated: [
          "bg-background text-accent shadow-sm",
          "hover:bg-background-accent-lightest active:bg-accent-state-pressed",
          "disabled:bg-state-disabled disabled:shadow-none disabled:text-foreground-disabled",
        ].join(" "),
        plain: [
          "bg-transparent text-accent",
          "hover:bg-accent-state-hover active:bg-accent-state-pressed",
          "disabled:text-foreground-disabled",
        ].join(" "),
      },
      size: {
        xs: "size-icon-btn-xs rounded-icon-btn-xs [&_svg]:size-icon-btn-icon-xs",
        sm: "size-icon-btn-sm rounded-icon-btn-sm [&_svg]:size-icon-btn-icon-sm",
        md: "size-icon-btn-md rounded-icon-btn-md [&_svg]:size-icon-btn-icon-md",
        lg: "size-icon-btn-lg rounded-icon-btn-lg [&_svg]:size-icon-btn-icon-lg",
        xl: "size-icon-btn-xl rounded-icon-btn-xl [&_svg]:size-icon-btn-icon-xl",
        "2xl": "size-icon-btn-2xl rounded-icon-btn-2xl [&_svg]:size-icon-btn-icon-2xl",
      },
      neutral: { true: "", false: "" },
    },
    compoundVariants: [
      {
        variant: "primary",
        neutral: true,
        class: "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80",
      },
      {
        variant: "outline",
        neutral: true,
        class: "border-border-medium text-foreground hover:bg-state-hover active:bg-state-pressed",
      },
      {
        variant: "tonal",
        neutral: true,
        class: "bg-background-soft text-foreground hover:bg-state-pressed active:bg-state-selected",
      },
      {
        variant: "elevated",
        neutral: true,
        class: "text-foreground hover:bg-background-soft active:bg-state-pressed",
      },
      {
        variant: "plain",
        neutral: true,
        class: "text-foreground hover:bg-state-hover active:bg-state-pressed",
      },
    ],
    defaultVariants: { variant: "tonal", size: "lg", neutral: false },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, neutral, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(iconButtonVariants({ variant, size, neutral, className }))}
      {...props}
    />
  ),
);
IconButton.displayName = "IconButton";
