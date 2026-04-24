import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors",
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
        sm: "h-10 px-4 text-base rounded-8 gap-2 [&_svg]:size-4",
        md: "h-12 px-5 text-base rounded-10 gap-2 [&_svg]:size-5",
        lg: "h-14 px-6 text-lg rounded-12 gap-2 [&_svg]:size-5",
      },
      neutral: {
        true: "",
        false: "",
      },
      loading: {
        true: "cursor-wait",
        false: "",
      },
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
      {
        variant: "plain",
        size: "sm",
        class: "px-2.5",
      },
      {
        variant: "plain",
        size: "md",
        class: "px-3",
      },
      {
        variant: "plain",
        size: "lg",
        class: "px-4",
      },
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
          <Spinner className="size-4" />
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
