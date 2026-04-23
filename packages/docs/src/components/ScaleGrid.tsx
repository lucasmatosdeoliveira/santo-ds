import { tokens } from "@santo-ds/tokens";

type Props = {
  prefix: string;
  /** How to visualize a single token. */
  render: (value: string, name: string) => React.ReactNode;
  /** Numeric-aware sort on the suffix after the prefix. */
  numericSort?: boolean;
};

export function ScaleGrid({ prefix, render, numericSort }: Props) {
  const entries = Object.entries(tokens)
    .filter(([name]) => name.startsWith(prefix))
    .map(([name, value]) => ({ name, suffix: name.slice(prefix.length), value: String(value) }));

  if (numericSort) {
    entries.sort((a, b) => {
      const na = Number(a.suffix);
      const nb = Number(b.suffix);
      if (Number.isNaN(na) || Number.isNaN(nb)) return a.suffix.localeCompare(b.suffix);
      return na - nb;
    });
  }

  return (
    <div className="flex flex-col divide-y divide-border-soft overflow-hidden rounded-8 border border-border-soft">
      {entries.map(({ name, suffix, value }) => (
        <div key={name} className="flex items-center gap-6 p-4">
          <div className="w-20 shrink-0 font-mono text-xs text-foreground-soft">{suffix}</div>
          <div className="flex-1">{render(value, name)}</div>
          <div className="w-24 shrink-0 text-right font-mono text-xs text-foreground-soft">{value}</div>
          <div className="hidden w-72 shrink-0 truncate font-mono text-[11px] text-foreground-soft md:block">
            --{name}
          </div>
        </div>
      ))}
    </div>
  );
}
