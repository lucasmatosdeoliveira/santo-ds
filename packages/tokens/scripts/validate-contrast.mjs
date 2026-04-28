#!/usr/bin/env node
/**
 * WCAG contrast validation for SantoDS semantic pairs.
 *
 * Resolves CSS variable references in the generated token files, composites
 * alpha overlays onto their effective backgrounds, and computes WCAG 2.x
 * contrast ratios for a curated list of critical foreground/background pairs.
 *
 * Exits with code 1 on any failure. Wire into CI to catch theme regressions
 * before they ship (e.g., a token rename that drops accent contrast below 3:1).
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG = resolve(__dirname, "..");
const DIST = resolve(PKG, "dist/css");

/* ---------- CSS var resolver ---------- */

function parseCssVars(filePath) {
  if (!existsSync(filePath)) return new Map();
  const content = readFileSync(filePath, "utf8");
  const map = new Map();
  // Match `--name: value;` declarations.
  const re = /--([a-z0-9-]+):\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(content))) {
    map.set(m[1], m[2].trim());
  }
  return map;
}

/** Resolve `var(--x)` references chain-wise until we hit a literal hex/rgba. */
function resolveVar(name, vars, seen = new Set()) {
  if (seen.has(name)) throw new Error(`Cycle resolving --${name}`);
  seen.add(name);
  const val = vars.get(name);
  if (!val) return null;
  const m = /^var\(--([a-z0-9-]+)\)$/i.exec(val);
  if (m) return resolveVar(m[1], vars, seen);
  return val;
}

/* ---------- color math ---------- */

function parseColor(s) {
  // #rgb / #rrggbb / #rrggbbaa
  let m = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(s.trim());
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a };
  }
  m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)$/i.exec(s.trim());
  if (m) {
    return {
      r: Number(m[1]),
      g: Number(m[2]),
      b: Number(m[3]),
      a: m[4] !== undefined ? Number(m[4]) : 1,
    };
  }
  throw new Error(`Cannot parse color: ${s}`);
}

/** Composite `over` (foreground with alpha) over `under` (assumed opaque). */
function composite(over, under) {
  const a = over.a;
  return {
    r: over.r * a + under.r * (1 - a),
    g: over.g * a + under.g * (1 - a),
    b: over.b * a + under.b * (1 - a),
    a: 1,
  };
}

function relativeLuminance({ r, g, b }) {
  const lin = (c) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : ((cs + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(a, b) {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

/* ---------- pairs to check ---------- */

/**
 * Critical pairs we care about for AA compliance. Format:
 * [foregroundVar, backgroundVar, minRatio, label]
 *
 * minRatio: 4.5 = AA normal text, 3 = AA large/non-text.
 */
const PAIRS = [
  // Body text on default background
  ["sds-color-semantic-font-default-main",     "sds-color-semantic-background-default-main",  4.5,  "body text"],
  ["sds-color-semantic-font-default-soft",     "sds-color-semantic-background-default-main",  4.5,  "secondary text"],
  ["sds-color-semantic-font-default-softer",   "sds-color-semantic-background-default-main",  3.0,  "tertiary text (large)"],
  // Accent text on default background
  ["sds-color-semantic-font-default-accent",   "sds-color-semantic-background-default-main",  4.5,  "accent text / link"],
  // On-accent text on accent surface (primary button label)
  ["sds-color-semantic-font-on-accent-main",   "sds-color-semantic-background-default-accent", 4.5, "primary button label"],
  // True inversed text on inversed surface (e.g., callout card)
  ["sds-color-semantic-font-inversed-main",    "sds-color-semantic-background-inversed-main",  4.5, "inversed surface text"],
  // Border contrast vs surface (3:1 for non-text borders)
  ["sds-color-semantic-border-default-medium", "sds-color-semantic-background-default-main",  1.4,  "input border (informational)"],
  // Icon contrast
  ["sds-color-semantic-icon-default-main",     "sds-color-semantic-background-default-main",  3.0,  "icon"],
  ["sds-color-semantic-icon-default-soft",     "sds-color-semantic-background-default-main",  3.0,  "icon soft"],
];

/* ---------- runner ---------- */

function runForTheme(themeName, semanticPath) {
  const baseVars = parseCssVars(resolve(DIST, "base.css"));
  const semanticVars = parseCssVars(resolve(DIST, semanticPath));
  const merged = new Map([...baseVars, ...semanticVars]);

  const failures = [];
  console.log(`\n[${themeName}]`);
  for (const [fgVar, bgVar, minRatio, label] of PAIRS) {
    const bgRaw = resolveVar(bgVar, merged);
    const fgRaw = resolveVar(fgVar, merged);
    if (!bgRaw || !fgRaw) {
      console.log(`  ⚠  ${label}: missing token (${fgVar} on ${bgVar})`);
      continue;
    }
    const bg = parseColor(bgRaw);
    const fgRaw2 = parseColor(fgRaw);
    const fg = fgRaw2.a < 1 ? composite(fgRaw2, bg) : fgRaw2;
    const ratio = contrastRatio(fg, bg);
    const ok = ratio >= minRatio;
    const sym = ok ? "✓" : "✗";
    const padded = label.padEnd(28);
    console.log(`  ${sym}  ${padded}  ${ratio.toFixed(2)}:1  (min ${minRatio}:1)`);
    if (!ok) failures.push({ fgVar, bgVar, ratio, minRatio, label, themeName });
  }
  return failures;
}

const lightFailures = runForTheme("light", "semantic-light.css");
const darkFailures = runForTheme("dark", "semantic-dark.css");
const failures = [...lightFailures, ...darkFailures];

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} contrast failure(s):`);
  for (const f of failures) {
    console.error(`  [${f.themeName}] ${f.label}: ${f.ratio.toFixed(2)}:1 (need ${f.minRatio}:1)`);
  }
  process.exit(1);
} else {
  console.log("\n✓ all checked pairs meet contrast thresholds");
}
