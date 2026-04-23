import { tokens } from "@santo-ds/tokens";

const BREAKPOINTS = ["desktop", "tablet", "mobile"] as const;

export function GridsSpec() {
  return (
    <div className="flex flex-col gap-8">
      {BREAKPOINTS.map((bp) => {
        const cols = Number(tokens[`sds-grid-${bp}-columns` as keyof typeof tokens] ?? 12);
        const width = tokens[`sds-grid-${bp}-width` as keyof typeof tokens] ?? "100%";
        const gutter = tokens[`sds-grid-${bp}-gutter` as keyof typeof tokens] ?? "16px";
        const screenWidth = tokens[`sds-grid-${bp}-screen-width` as keyof typeof tokens] ?? "auto";

        return (
          <section key={bp} className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-medium capitalize text-foreground">{bp}</h3>
              <div className="flex gap-4 font-mono text-[11px] text-foreground-soft">
                <span>screen {String(screenWidth)}</span>
                <span>cols {cols}</span>
                <span>width {String(width)}</span>
                <span>gutter {String(gutter)}</span>
              </div>
            </div>
            <div
              className="grid rounded-8 border border-border-soft bg-background-soft p-4"
              style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: String(gutter),
              }}
            >
              {Array.from({ length: cols }).map((_, i) => (
                <div key={i} className="h-16 rounded-4 bg-accent/16" />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
