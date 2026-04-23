import { tokens } from "@santo-ds/tokens";

type Props = {
  prefix: string;
};

export function EffectGrid({ prefix }: Props) {
  const entries = Object.entries(tokens).filter(([name]) => name.startsWith(prefix));
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {entries.map(([name, value]) => (
        <div
          key={name}
          className="flex flex-col gap-3 rounded-8 border border-border-soft bg-background-soft p-6"
        >
          <div
            className="h-20 w-full rounded-8 bg-background"
            style={{ boxShadow: String(value) }}
          />
          <div className="text-sm font-medium text-foreground">{name.slice(prefix.length)}</div>
          <div className="truncate font-mono text-[10px] text-foreground-soft">--{name}</div>
          <div className="line-clamp-2 font-mono text-[10px] text-foreground-soft">{String(value)}</div>
        </div>
      ))}
    </div>
  );
}
