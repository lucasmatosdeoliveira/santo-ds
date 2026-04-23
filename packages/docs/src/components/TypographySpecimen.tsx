import { tokens } from "@santo-ds/tokens";

type Props = {
  /** Prefix like `sds-typography-headline-` */
  prefix: string;
  /** Size keys in display order, e.g. ["lg","md","sm"] */
  sizes: string[];
  /** Text used in every preview */
  sample: string;
};

/**
 * Typography tokens land flat as sub-properties:
 *   sds-typography-headline-lg-font-size, -line-height, -font-family, -font-weight, -letter-spacing
 *
 * Some entries (e.g. title.xl.medium) have an extra weight segment, which we
 * detect at render time and show alongside the base size.
 */
export function TypographySpecimen({ prefix, sizes, sample }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => {
        const base = `${prefix}${size}-`;
        const hasDirectSize = Object.keys(tokens).some((k) => k === `${base}font-size`);

        if (hasDirectSize) {
          return <Specimen key={size} label={size} base={base} sample={sample} />;
        }

        // Nested weight variants (e.g. title.xl.medium)
        const weightKeys = Array.from(
          new Set(
            Object.keys(tokens)
              .filter((k) => k.startsWith(base) && k.endsWith("-font-size"))
              .map((k) => k.slice(base.length, -"-font-size".length))
          )
        );
        return (
          <div key={size} className="flex flex-col gap-3">
            <div className="text-xs font-mono text-foreground-soft">{size}</div>
            {weightKeys.map((w) => (
              <Specimen key={w} label={`${size} · ${w}`} base={`${base}${w}-`} sample={sample} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Specimen({ label, base, sample }: { label: string; base: string; sample: string }) {
  const fontSize = tokens[`${base}font-size` as keyof typeof tokens] as string | undefined;
  const lineHeight = tokens[`${base}line-height` as keyof typeof tokens] as string | undefined;
  const fontWeight = tokens[`${base}font-weight` as keyof typeof tokens] as string | undefined;
  const fontFamily = tokens[`${base}font-family` as keyof typeof tokens] as string | undefined;
  const letterSpacing = tokens[`${base}letter-spacing` as keyof typeof tokens] as string | undefined;
  const textCase = tokens[`${base}text-case` as keyof typeof tokens] as string | undefined;

  return (
    <div className="flex flex-col gap-2 rounded-8 border border-border-soft p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="text-xs font-mono text-foreground-soft">{label}</div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-foreground-soft">
          <span>{fontSize}</span>
          <span>lh {lineHeight}</span>
          <span>w {fontWeight}</span>
          <span>{fontFamily}</span>
          {letterSpacing && letterSpacing !== "0" && <span>ls {letterSpacing}</span>}
        </div>
      </div>
      <div
        className="text-foreground"
        style={{
          fontSize,
          lineHeight,
          fontWeight: fontWeight as string,
          fontFamily,
          letterSpacing,
          textTransform: textCase === "uppercase" ? "uppercase" : undefined,
        }}
      >
        {sample}
      </div>
    </div>
  );
}
