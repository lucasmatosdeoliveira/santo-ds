import type { ReactNode } from "react";
import { tokens } from "@santo-ds/tokens";

type Row = {
  name: string;
  value: string;
  preview?: ReactNode;
};

type Props = {
  prefix: string;
  /** How to render a preview cell for a given token. Return null to skip. */
  renderPreview?: (name: string, value: string) => ReactNode;
  /** Order tokens; defaults to insertion order from tokens. */
  sort?: (a: Row, b: Row) => number;
};

export function TokenTable({ prefix, renderPreview, sort }: Props) {
  const rows: Row[] = Object.entries(tokens)
    .filter(([name]) => name.startsWith(prefix))
    .map(([name, value]) => ({
      name,
      value: String(value),
      preview: renderPreview?.(name, String(value)),
    }));

  if (sort) rows.sort(sort);

  return (
    <div className="overflow-hidden rounded-8 border border-border-soft">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-background-soft">
          <tr>
            <th className="p-3 font-medium">Token</th>
            <th className="p-3 font-medium">Value</th>
            <th className="p-3 font-medium">Preview</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-border-soft">
              <td className="p-3 font-mono text-xs">--{r.name}</td>
              <td className="p-3 font-mono text-xs">{r.value}</td>
              <td className="p-3">{r.preview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
