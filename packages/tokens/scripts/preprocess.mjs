#!/usr/bin/env node
/**
 * Converts the raw Figma "Design Tokens" plugin export into Style-Dictionary-ready JSON.
 *
 * Transformations:
 *  - Strip Figma-specific extensions (`extensions.org.lukasoppermann.figmaDesignTokens`).
 *  - Sanitize keys: lowercase, trim, replace spaces/special chars with `-`.
 *    `☼ light` → `light`, `primitive colors` → `primitive`, `[desktop] - fluid` → `desktop-fluid`.
 *  - Rewrite alias references `{primitive colors.neutral.100}` → `{color.primitive.neutral.100}`.
 *  - Remap top-level categories into a cleaner namespace:
 *      primitive colors  → color.primitive
 *      accent colors     → color.accent
 *      semantic colors   → color.semantic.{light|dark}
 *      sizing            → size
 *      border            → border
 *      typography        → typography        (drops legacy `font` styles)
 *      effect            → effect
 *      opacity           → opacity
 *      grids             → grid              (drops legacy `grid` styles)
 *  - Flatten composite shadows (0,1,2…) into an array under `value`.
 *
 * Output: packages/tokens/src/input/*.json (one file per top-level category).
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, "../..", "design-tokens.json");
const OUT_DIR = resolve(ROOT, "src/input");

/* ---------- key sanitization ---------- */

const SUN = "\u263C"; // ☼
const MOON = "\u263E"; // ☾

function sanitizeKey(raw) {
  let k = String(raw).trim();
  // strip astrological symbols used as mode markers
  k = k.replace(new RegExp(`[${SUN}${MOON}]`, "g"), "").trim();
  // brackets and punctuation
  k = k.replace(/[\[\](){}]/g, "");
  // split camelCase before lowercasing (fontSize → font-Size)
  k = k.replace(/([a-z0-9])([A-Z])/g, "$1-$2");
  // collapse whitespace
  k = k.replace(/\s+/g, " ").trim();
  // spaces, slashes, dots, underscores inside labels → dash
  k = k.replace(/[\s/._]+/g, "-");
  // trim leading/trailing dashes
  k = k.replace(/^-+|-+$/g, "");
  return k.toLowerCase();
}

/* ---------- namespace remap ---------- */

// Old top-level key → new top-level path (array).
const NAMESPACE_MAP = {
  "primitive colors": ["color", "primitive"],
  "accent colors": ["color", "accent"],
  "semantic colors": ["color", "semantic"],
  sizing: ["size"],
  border: ["border"],
  typography: ["typography"],
  effect: ["effect"],
  opacity: ["opacity"],
  grids: ["grid"],
};

// Top-level keys to drop entirely.
const DROP_KEYS = new Set([
  "font", // duplicated by `typography` in DTCG form
  "grid", // duplicated by `grids` as proper variables
]);

/* ---------- alias rewrite ---------- */

// Rewrite `{primitive colors.neutral.100}` → `{color.primitive.neutral.100}`
// and sanitize all inner segments.
//
// Figma "Accent colors" is one collection with modes (Primary, Success, Warning, Danger).
// Aliases written as `{accent colors.base}` are mode-implicit — resolve to the canonical
// brand mode (Primary). Alternate accent families remain addressable via their explicit
// paths (`{color.accent.success.base}`) and can be swapped at the CSS-var layer.
const DEFAULT_ACCENT_MODE = "primary";

function rewriteAliasPath(pathStr) {
  const segments = pathStr.split(".").map((s) => s.trim());
  const top = segments[0];
  const rest = segments.slice(1);

  const mapped = NAMESPACE_MAP[top];
  const base = mapped ?? [sanitizeKey(top)];
  const sanitizedRest = rest.map(sanitizeKey);

  if (top === "accent colors" && sanitizedRest.length > 0 && sanitizedRest[0] !== DEFAULT_ACCENT_MODE) {
    const known = new Set(["primary", "success", "warning", "danger"]);
    if (!known.has(sanitizedRest[0])) {
      return [...base, DEFAULT_ACCENT_MODE, ...sanitizedRest].join(".");
    }
  }

  return [...base, ...sanitizedRest].join(".");
}

function rewriteAliasesInString(value) {
  if (typeof value !== "string") return value;
  return value.replace(/\{([^}]+)\}/g, (_, inner) => `{${rewriteAliasPath(inner)}}`);
}

/* ---------- token walking ---------- */

function isToken(obj) {
  return obj && typeof obj === "object" && "value" in obj && "type" in obj;
}

function cleanToken(token) {
  const { type, value, description } = token;
  const out = { type, value };
  if (description && String(description).trim().length > 0) out.description = description;
  return out;
}

/**
 * Shadow tokens come out in two shapes:
 *  - single-layer leaf: `{ type: "custom-shadow", value: {...} }`
 *  - multi-layer:       `{ "0": {custom-shadow}, "1": {custom-shadow}, description?, extensions? }`
 * Normalise both to `{ type: "shadow", value: [layer0, layer1, ...] }`.
 */
function coerceCompositeShadow(node) {
  if (!node || typeof node !== "object") return node;
  // single-layer
  if (isToken(node) && node.type === "custom-shadow") {
    return { type: "shadow", value: [node.value] };
  }
  // multi-layer: numeric keys with custom-shadow children
  const entries = Object.entries(node);
  const numeric = entries.filter(([k]) => /^\d+$/.test(k));
  if (numeric.length === 0) return node;
  const layers = numeric
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([, t]) => t)
    .filter((t) => isToken(t) && t.type === "custom-shadow")
    .map((t) => t.value);
  if (layers.length !== numeric.length) return node; // not all layers are shadows
  return { type: "shadow", value: layers };
}

function walk(node) {
  if (node === null || typeof node !== "object") return node;
  if (Array.isArray(node)) return node.map(walk);

  // Composite shadow pattern (handles both single-layer leaves and multi-layer groups).
  const shadow = coerceCompositeShadow(node);
  if (shadow !== node) return walk(shadow);

  // Token leaf (checked AFTER shadow coercion so we don't short-circuit single-layer shadows).
  if (isToken(node)) {
    const cleaned = cleanToken(node);
    if (typeof cleaned.value === "string") {
      cleaned.value = rewriteAliasesInString(cleaned.value);
    }
    return cleaned;
  }

  // Generic group: recurse with sanitized keys.
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    const sk = sanitizeKey(k);
    if (sk.length === 0) continue;
    out[sk] = walk(v);
  }
  return out;
}

/* ---------- main ---------- */

function main() {
  if (!existsSync(SOURCE)) {
    console.error(`Missing raw token file at ${SOURCE}`);
    process.exit(1);
  }
  const raw = JSON.parse(readFileSync(SOURCE, "utf8"));

  // Clean output dir
  if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  /**
   * Base (mode-agnostic) tokens go into `base` output.
   * Semantic tokens are split into per-mode outputs, with the mode segment
   * stripped from the path so both themes produce the same CSS var names
   * with different values (enabling :root vs [data-theme="dark"] overrides).
   */
  const base = {};
  const modes = {}; // { light: {...}, dark: {...} }

  for (const [rawTop, subtree] of Object.entries(raw)) {
    if (DROP_KEYS.has(rawTop)) continue;
    const walked = walk(subtree);

    if (rawTop === "semantic colors") {
      for (const [modeKey, modeValue] of Object.entries(walked)) {
        modes[modeKey] = modes[modeKey] ?? {};
        setDeep(modes[modeKey], ["color", "semantic"], modeValue);
      }
      continue;
    }

    const mapped = NAMESPACE_MAP[rawTop] ?? [sanitizeKey(rawTop)];
    setDeep(base, mapped, walked);
  }

  // One file per top-level namespace in base.
  for (const [topKey, value] of Object.entries(base)) {
    const filePath = resolve(OUT_DIR, `${topKey}.json`);
    writeFileSync(filePath, JSON.stringify({ [topKey]: value }, null, 2) + "\n");
    console.log(`wrote ${filePath}`);
  }

  // Semantic modes as sibling files.
  for (const [mode, tree] of Object.entries(modes)) {
    const filePath = resolve(OUT_DIR, `semantic.${mode}.json`);
    writeFileSync(filePath, JSON.stringify(tree, null, 2) + "\n");
    console.log(`wrote ${filePath}`);
  }
}

function setDeep(target, path, value) {
  let cur = target;
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    cur[k] = cur[k] ?? {};
    cur = cur[k];
  }
  const last = path[path.length - 1];
  // merge if already present (color.primitive + color.accent land on same root)
  if (cur[last] && typeof cur[last] === "object" && !isToken(cur[last])) {
    cur[last] = { ...cur[last], ...value };
  } else {
    cur[last] = value;
  }
}

main();
