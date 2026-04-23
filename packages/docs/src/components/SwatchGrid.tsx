import { tokens } from "@santo-ds/tokens";

type Props = {
  /** Token-name prefix, e.g. `sds-color-primitive-neutral-` */
  prefix: string;
  /** Optional whitelist; if provided, only these full token names render. */
  include?: string[];
  /** How to label each swatch — default strips the prefix. */
  label?: (name: string) => string;
};

export function SwatchGrid({ prefix, include, label }: Props) {
  const entries = Object.entries(tokens)
    .filter(([name]) => (include ? include.includes(name) : name.startsWith(prefix)))
    .map(([name, value]) => ({ name, value: String(value) }));

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {entries.map(({ name, value }) => {
        const displayName = label ? label(name) : name.slice(prefix.length);
        return (
          <div
            key={name}
            className="flex flex-col overflow-hidden rounded-8 border border-border-soft bg-background-soft"
          >
            <div className="h-20" style={{ background: value }} aria-label={value} />
            <div className="p-3 text-xs">
              <div className="font-medium text-foreground">{displayName}</div>
              <div className="font-mono text-foreground-soft">{value}</div>
              <div className="mt-1 truncate font-mono text-[10px] text-foreground-soft">
                --{name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
