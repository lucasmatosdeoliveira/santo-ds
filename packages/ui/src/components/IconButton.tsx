import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center transition-colors",
    "focus-visible:outline-none focus-visible:shadow-focus-accent",
    "disabled:pointer-events-none",
    "[&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-accent text-foreground-inversed",
          "hover:bg-accent-dark active:bg-accent-darker",
          "disabled:bg-black/[0.06] disabled:text-foreground/40",
        ].join(" "),
        outline: [
          "bg-transparent border border-accent/30 text-accent",
          "hover:bg-accent/[0.04] active:bg-accent/[0.08]",
          "disabled:bg-black/[0.06] disabled:border-transparent disabled:text-foreground/40",
        ].join(" "),
        tonal: [
          "bg-accent/10 text-accent",
          "hover:bg-accent/[0.16] active:bg-accent/20",
          "disabled:bg-black/[0.06] disabled:text-foreground/40",
        ].join(" "),
        elevated: [
          "bg-background text-accent shadow-sm",
          "hover:bg-accent-lightest active:bg-accent/[0.08]",
          "disabled:bg-black/[0.06] disabled:shadow-none disabled:text-foreground/40",
        ].join(" "),
        plain: [
          "bg-transparent text-accent",
          "hover:bg-accent/[0.04] active:bg-accent/[0.08]",
          "disabled:text-foreground/40",
        ].join(" "),
      },
      size: {
        xs: "size-6 rounded-6 [&_svg]:size-4",
        sm: "size-7 rounded-6 [&_svg]:size-4",
        md: "size-8 rounded-6 [&_svg]:size-4",
        lg: "size-10 rounded-8 [&_svg]:size-5",
        xl: "size-12 rounded-10 [&_svg]:size-5",
        "2xl": "size-14 rounded-12 [&_svg]:size-6",
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
        class:
          "border-border text-foreground hover:bg-background-soft active:bg-black/[0.08]",
      },
      {
        variant: "tonal",
        neutral: true,
        class:
          "bg-background-soft text-foreground hover:bg-black/[0.08] active:bg-black/[0.12]",
      },
      {
        variant: "elevated",
        neutral: true,
        class:
          "text-foreground hover:bg-background-soft active:bg-black/[0.08]",
      },
      {
        variant: "plain",
        neutral: true,
        class:
          "text-foreground hover:bg-background-soft active:bg-black/[0.08]",
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
