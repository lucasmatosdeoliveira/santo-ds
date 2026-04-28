import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/utils";

export type TextVariant =
  | "headline-lg"
  | "headline-md"
  | "headline-sm"
  | "title-xl"
  | "title-lg"
  | "title-md"
  | "title-sm"
  | "title-xs"
  | "title-xxs"
  | "paragraph-lg"
  | "paragraph-md"
  | "paragraph-sm"
  | "paragraph-xs"
  | "label-lg"
  | "label-md"
  | "label-sm"
  | "label-xs"
  | "overline-md"
  | "overline-sm"
  | "reading-only-md";

const VARIANT_TO_TAG: Record<TextVariant, keyof JSX.IntrinsicElements> = {
  "headline-lg": "h1",
  "headline-md": "h1",
  "headline-sm": "h2",
  "title-xl": "h2",
  "title-lg": "h3",
  "title-md": "h4",
  "title-sm": "h5",
  "title-xs": "h6",
  "title-xxs": "h6",
  "paragraph-lg": "p",
  "paragraph-md": "p",
  "paragraph-sm": "p",
  "paragraph-xs": "p",
  "label-lg": "span",
  "label-md": "span",
  "label-sm": "span",
  "label-xs": "span",
  "overline-md": "span",
  "overline-sm": "span",
  "reading-only-md": "p",
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Maps to the `typography.{variant}` composite tokens
   * (font-size + line-height + weight + letter-spacing + family).
   */
  variant?: TextVariant;
  /** Override the rendered HTML element. Defaults to a sensible tag per variant. */
  as?: keyof JSX.IntrinsicElements;
  /** Render as Slot for composition. */
  asChild?: boolean;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ variant = "paragraph-md", as, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : (as ?? VARIANT_TO_TAG[variant]);
    return React.createElement(Comp, {
      ref,
      className: cn(`sds-text-${variant}`, className),
      ...props,
    });
  },
);
Text.displayName = "Text";
