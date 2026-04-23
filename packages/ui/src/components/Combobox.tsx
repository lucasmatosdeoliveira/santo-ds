import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { cn } from "../lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  ({ options, value, onValueChange, placeholder = "Select\u2026", emptyMessage = "No results.", className, disabled }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const selected = options.find((o) => o.value === value);
    const filtered = query
      ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
      : options;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-8 border border-border bg-background px-3 py-2 text-sm",
              selected ? "text-foreground" : "text-foreground-soft",
              "focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-focus-accent",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              className,
            )}
          >
            <span className="truncate">{selected?.label ?? placeholder}</span>
            <ChevronsUpDown className="size-4 opacity-60 shrink-0 ml-2" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <div className="flex flex-col">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search\u2026"
              className="h-10 border-0 border-b border-border-soft px-3 text-sm bg-transparent placeholder:text-foreground-soft focus:outline-none"
            />
            <div className="max-h-60 overflow-auto p-1">
              {filtered.length === 0 ? (
                <div className="px-2 py-4 text-center text-sm text-foreground-soft">{emptyMessage}</div>
              ) : (
                filtered.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => {
                      onValueChange?.(option.value);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-6 px-2 py-1.5 text-sm text-left",
                      "hover:bg-background-soft focus:outline-none focus:bg-background-soft",
                      "disabled:opacity-40 disabled:pointer-events-none",
                    )}
                  >
                    <Check className={cn("size-4", value === option.value ? "opacity-100" : "opacity-0")} />
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);
Combobox.displayName = "Combobox";
