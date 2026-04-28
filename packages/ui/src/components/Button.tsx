import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center whitespace-nowrap font-medium",
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
        sm: "h-btn-sm px-btn-sm rounded-btn-sm gap-btn text-base [&_svg]:size-btn-icon-sm",
        md: "h-btn-md px-btn-md rounded-btn-md gap-btn text-base [&_svg]:size-btn-icon-md",
        lg: "h-btn-lg px-btn-lg rounded-btn-lg gap-btn text-lg [&_svg]:size-btn-icon-lg",
      },
      neutral: { true: "", false: "" },
      loading: { true: "cursor-wait", false: "" },
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
      { variant: "plain", size: "sm", class: "px-2.5" },
      { variant: "plain", size: "md", class: "px-3" },
      { variant: "plain", size: "lg", class: "px-4" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      neutral: false,
      loading: false,
    },
  },
);

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      neutral,
      loading = false,
      asChild = false,
      disabled,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    const content = asChild ? (
      children
    ) : (
      <>
        {loading ? (
          <Spinner className="size-btn-icon-sm" />
        ) : (
          leadingIcon && <span className="inline-flex">{leadingIcon}</span>
        )}
        {children}
        {!loading && trailingIcon && (
          <span className="inline-flex">{trailingIcon}</span>
        )}
      </>
    );
    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size, neutral, loading, className }))}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
