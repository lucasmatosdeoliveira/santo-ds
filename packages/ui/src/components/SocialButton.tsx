import * as React from "react";
import { cn } from "../lib/utils";

export interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  provider?: string;
}

export const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ className, icon, provider, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-10 w-full items-center justify-center gap-2 rounded-8 border border-border bg-background px-4 text-sm font-medium text-foreground",
        "transition-colors hover:bg-background-soft",
        "focus-visible:outline-none focus-visible:shadow-focus-accent",
        "disabled:opacity-40 disabled:pointer-events-none [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      {icon}
      {children ?? (provider && `Continue with ${provider}`)}
    </button>
  ),
);
SocialButton.displayName = "SocialButton";
