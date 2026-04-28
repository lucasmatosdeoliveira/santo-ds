#!/usr/bin/env node
/**
 * Build Style Dictionary outputs for SantoDS.
 *
 * Inputs:
 *   - packages/tokens/src/input/*.json   (Figma-derived, produced by preprocess.mjs)
 *   - packages/tokens/src/extra/*.json   (hand-managed: motion, z-index, breakpoint,
 *                                         density, dataviz, state, component, semantic.*.extra)
 *
 * Outputs: packages/tokens/dist/{css,js,ts,tailwind}
 *
 * CSS layering:
 *   - `css/base.css`            → `:root` with all mode-agnostic tokens.
 *   - `css/semantic-light.css`  → `:root` with semantic tokens (light values).
 *   - `css/semantic-dark.css`   → `[data-theme="dark"]` with semantic tokens (dark values).
 *   - `css/tokens.css`          → single entry point, imports the three above.
 *
 * Multi-brand:
 *   Set `BRAND=primary|success|warning|danger` to swap the resolved accent family.
 *   Default is `primary`. The build always emits brand-keyed accent tokens
 *   (`color.accent.primary.*`, etc.); this flag only chooses which family the
 *   short alias `accent.*` (and the Tailwind `accent` color) resolves to.
 */

import StyleDictionary from "style-dictionary";
import { readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG = resolve(__dirname, "..");
const INPUT = resolve(PKG, "src/input");
const EXTRA = resolve(PKG, "src/extra");
const DIST = resolve(PKG, "dist");
const PREFIX = "sds";
const BRAND = process.env.BRAND || "primary";

/* ---------- custom transforms ---------- */

StyleDictionary.registerTransform({
  name: "dimension/px",
  type: "value",
  filter: (token) => token.type === "dimension" && typeof token.value === "number",
  transform: (token) => (token.value === 0 ? "0" : `${token.value}px`),
});

StyleDictionary.registerTransform({
  name: "opacity/decimal",
  type: "value",
  filter: (token) =>
    token.type === "dimension" && /^opacity(\.|$)/.test(token.path.join(".")) && typeof token.value === "number",
  transform: (token) => (token.value / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, ""),
});

// state.disabled.opacity is type=dimension but should output as decimal, not pixels.
StyleDictionary.registerTransform({
  name: "state-opacity/decimal",
  type: "value",
  filter: (token) =>
    token.type === "dimension" &&
    /^state\.disabled\.opacity$/.test(token.path.join(".")) &&
    typeof token.value === "number",
  transform: (token) => (token.value / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, ""),
});

StyleDictionary.registerTransform({
  name: "shadow/css",
  type: "value",
  filter: (token) => token.type === "shadow" && Array.isArray(token.value),
  transform: (token) =>
    token.value
      .map((l) => {
        const inset = l.shadowType === "innerShadow" ? "inset " : "";
        return `${inset}${l.offsetX ?? 0}px ${l.offsetY ?? 0}px ${l.radius ?? 0}px ${l.spread ?? 0}px ${l.color ?? "#000"}`;
      })
      .join(", "),
});

StyleDictionary.registerTransform({
  name: "fontweight/number",
  type: "value",
  filter: (token) => token.type === "number" && /font-weight$/.test(token.path.join("-")),
  transform: (token) => String(token.value),
});

StyleDictionary.registerTransform({
  name: "string/unquoted",
  type: "value",
  filter: (token) => token.type === "string" && typeof token.value === "string",
  transform: (token) => token.value,
});

// Pass-through for duration / cubicBezier (already authored as CSS-ready strings).
StyleDictionary.registerTransform({
  name: "passthrough",
  type: "value",
  filter: (token) =>
    (token.type === "duration" || token.type === "cubicBezier") && typeof token.value === "string",
  transform: (token) => token.value,
});

// Plain numbers (z-index, density.scale, etc.) — coerce to string.
StyleDictionary.registerTransform({
  name: "number/string",
  type: "value",
  filter: (token) => token.type === "number" && typeof token.value === "number",
  transform: (token) => String(token.value),
});

StyleDictionary.registerTransform({
  name: "name/sds-kebab",
  type: "name",
  transform: (token, config) => {
    const prefix = config?.prefix ? `${config.prefix}-` : "";
    return (prefix + token.path.join("-")).toLowerCase();
  },
});

const TRANSFORMS = [
  "attribute/cti",
  "name/sds-kebab",
  "state-opacity/decimal",
  "opacity/decimal",
  "dimension/px",
  "shadow/css",
  "fontweight/number",
  "passthrough",
  "number/string",
  "string/unquoted",
];

StyleDictionary.registerTransformGroup({ name: "sds/css", transforms: TRANSFORMS });
StyleDictionary.registerTransformGroup({ name: "sds/js", transforms: TRANSFORMS });

/* ---------- custom CSS format with custom selector ---------- */

StyleDictionary.registerFormat({
  name: "css/variables-scoped",
  format: ({ dictionary, options }) => {
    const selector = options.selector || ":root";
    const { outputReferences } = options;
    const refToVar = (raw) =>
      raw.replace(/\{([^}]+)\}/g, (_, ref) => {
        const varName = (PREFIX ? `${PREFIX}-` : "") + ref.split(".").join("-").toLowerCase();
        return `var(--${varName})`;
      });
    const lines = dictionary.allTokens.map((t) => {
      const rawValue =
        outputReferences && typeof t.original.value === "string" && t.original.value.includes("{")
          ? refToVar(t.original.value)
          : t.value;
      return `  --${t.name}: ${rawValue};`;
    });
    return `${selector} {\n${lines.join("\n")}\n}\n`;
  },
});

StyleDictionary.registerFormat({
  name: "ts/tokens-declaration",
  format: ({ dictionary }) => {
    const lines = ["export declare const tokens: {"];
    for (const t of dictionary.allTokens) {
      lines.push(`  "${t.name}": string;`);
    }
    lines.push("};");
    lines.push("export type TokenName = keyof typeof tokens;");
    return lines.join("\n") + "\n";
  },
});

StyleDictionary.registerFormat({
  name: "js/tokens-esm",
  format: ({ dictionary }) => {
    const obj = {};
    for (const t of dictionary.allTokens) obj[t.name] = t.value;
    return `export const tokens = ${JSON.stringify(obj, null, 2)};\nexport default tokens;\n`;
  },
});

/* ---------- typography utility classes (composite token applicator) ---------- */

StyleDictionary.registerFormat({
  name: "css/typography-utilities",
  format: ({ dictionary }) => {
    const cssVar = (path) => `var(--${[PREFIX, ...path].join("-").toLowerCase()})`;
    const groups = new Map();
    for (const t of dictionary.allTokens) {
      if (t.path[0] !== "typography") continue;
      if (t.path.length !== 4) continue;
      const [, role, size, prop] = t.path;
      const key = `${role}-${size}`;
      if (!groups.has(key)) groups.set(key, {});
      groups.get(key)[prop] = cssVar(t.path);
    }
    const css = [];
    css.push("/* Auto-generated from typography composite tokens. */\n");
    for (const [key, props] of groups) {
      const decls = [];
      if (props["font-family"]) decls.push(`font-family: ${props["font-family"]}, ui-sans-serif, system-ui, sans-serif`);
      if (props["font-size"]) decls.push(`font-size: ${props["font-size"]}`);
      if (props["font-weight"]) decls.push(`font-weight: ${props["font-weight"]}`);
      if (props["line-height"]) decls.push(`line-height: ${props["line-height"]}`);
      if (props["letter-spacing"]) decls.push(`letter-spacing: ${props["letter-spacing"]}`);
      if (props["font-style"]) decls.push(`font-style: ${props["font-style"]}`);
      if (props["text-decoration"]) decls.push(`text-decoration: ${props["text-decoration"]}`);
      if (props["text-case"]) {
        // Figma exports "UPPER_CASE", "lower-case", or "none". Map to CSS `text-transform`.
        decls.push(`text-transform: var(--${PREFIX}-text-transform-${key}, none)`);
        // Inline an actual value too, since CSS vars in `var(--x, fallback)` only kick in if --x is unset.
      }
      css.push(`.sds-text-${key} {`);
      for (const d of decls) css.push(`  ${d};`);
      css.push("}");
      css.push("");
    }
    return css.join("\n");
  },
});

/* ---------- Tailwind preset (auto-generated from tokens) ---------- */

StyleDictionary.registerFormat({
  name: "tailwind/preset",
  format: ({ dictionary }) => {
    const cssVar = (path) => `var(--${[PREFIX, ...path].join("-").toLowerCase()})`;

    /** Build a flat key→cssVar map from tokens whose path starts with `prefixPath`. */
    const collect = (prefixPath, opts = {}) => {
      const { stripLast, dropLast, defaultLast = ["main", "base"], includeOnly } = opts;
      const out = {};
      for (const t of dictionary.allTokens) {
        if (t.path.length <= prefixPath.length) continue;
        if (!prefixPath.every((p, i) => p === t.path[i])) continue;
        let rest = t.path.slice(prefixPath.length);
        if (includeOnly && !rest.every((seg) => includeOnly.includes(seg) || true)) {
          // includeOnly currently unused beyond truthy gate — keeping for future
        }
        const last = rest[rest.length - 1];
        if (dropLast && dropLast.includes(last)) rest = rest.slice(0, -1);
        const isDefault = defaultLast.includes(last);
        const key = isDefault
          ? rest.slice(0, -1).join("-") || "DEFAULT"
          : rest.join("-");
        const finalKey = key === "" ? "DEFAULT" : key;
        const cur = out[finalKey];
        if (isDefault || cur === undefined) {
          out[finalKey] = cssVar(t.path);
        }
      }
      return out;
    };

    /** Nested form: [{a,b,c}] → { a: { b: { c: cssVar }}} (DEFAULT for "main"/"base"). */
    const collectNested = (prefixPath, opts = {}) => {
      const { defaultLast = ["main", "base"] } = opts;
      const root = {};
      for (const t of dictionary.allTokens) {
        if (t.path.length <= prefixPath.length) continue;
        if (!prefixPath.every((p, i) => p === t.path[i])) continue;
        const rest = t.path.slice(prefixPath.length);
        const last = rest[rest.length - 1];
        const isDefault = defaultLast.includes(last);
        const segs = isDefault ? rest.slice(0, -1) : rest;
        let cur = root;
        for (let i = 0; i < segs.length; i++) {
          const k = segs[i];
          if (i === segs.length - 1) {
            if (isDefault || cur[k] === undefined) {
              cur[k] = isDefault
                ? { DEFAULT: cssVar(t.path), ...(typeof cur[k] === "object" ? cur[k] : {}) }
                : cssVar(t.path);
            }
          } else {
            if (typeof cur[k] !== "object" || cur[k] === null) cur[k] = {};
            cur = cur[k];
          }
        }
        if (isDefault && segs.length === 0) {
          root.DEFAULT = cssVar(t.path);
        }
      }
      return root;
    };

    const has = (path) => dictionary.allTokens.some((t) => path.every((p, i) => p === t.path[i]));

    const colors = {};

    // Semantic groups → flatten one level (background/border/font/icon/effect/on-background/static).
    for (const group of ["background", "border", "font", "icon", "effect", "on-background", "static"]) {
      if (!has(["color", "semantic", group])) continue;
      const nested = collectNested(["color", "semantic", group]);
      // Flatten "default" into root, keep "inversed" as nested key.
      const flat = {};
      for (const [k, v] of Object.entries(nested)) {
        if (k === "default" && typeof v === "object") {
          for (const [vk, vv] of Object.entries(v)) flat[vk] = vv;
        } else {
          flat[k] = v;
        }
      }
      colors[
        group === "font" ? "foreground"
        : group === "on-background" ? "on-background"
        : group
      ] = flat;
    }

    // State layer (theme-aware).
    if (has(["color", "semantic", "state"])) colors.state = collect(["color", "semantic", "state"]);
    if (has(["color", "semantic", "accent-state"]))
      colors["accent-state"] = collect(["color", "semantic", "accent-state"]);

    // Brand-resolved accent (selected family).
    if (has(["color", "accent", BRAND])) {
      colors.accent = {
        ...collect(["color", "accent", BRAND]),
      };
      // Promote "base" alias to DEFAULT for `bg-accent` / `text-accent`.
      colors.accent.DEFAULT = cssVar(["color", "accent", BRAND, "base"]);
    }
    // Brand families surfaced explicitly so consumers can address them by role.
    for (const fam of ["primary", "success", "warning", "danger"]) {
      if (!has(["color", "accent", fam])) continue;
      const flat = collect(["color", "accent", fam]);
      flat.DEFAULT = cssVar(["color", "accent", fam, "base"]);
      colors[fam] = flat;
    }

    // Data-viz palette.
    if (has(["dataviz"])) colors.dataviz = collectNested(["dataviz"]);

    // Spacing — auto from `size.*`.
    const spacing = { 0: "0" };
    for (const t of dictionary.allTokens) {
      if (t.path[0] !== "size") continue;
      const k = t.path.slice(1).join("-");
      spacing[k] = cssVar(t.path);
    }

    // Border radius — auto from `border.radius.*`.
    const borderRadius = { none: "0", full: "9999px" };
    for (const t of dictionary.allTokens) {
      if (t.path[0] !== "border" || t.path[1] !== "radius") continue;
      const k = t.path.slice(2).join("-");
      borderRadius[k] = cssVar(t.path);
    }

    // Border width — auto from `border.width.*`.
    const borderWidth = {};
    for (const t of dictionary.allTokens) {
      if (t.path[0] !== "border" || t.path[1] !== "width") continue;
      const k = t.path.slice(2).join("-");
      borderWidth[k] = cssVar(t.path);
    }

    // Box shadow — `effect.shadow.*` (sm/md/lg + inversed.X), `effect.focus.*`, `effect.highlight.*`.
    const boxShadow = {};
    for (const t of dictionary.allTokens) {
      if (t.path[0] !== "effect") continue;
      const [, ...rest] = t.path;
      // effect.shadow.sm → "sm", effect.shadow.md → DEFAULT + "md"
      let key = rest.join("-");
      if (rest[0] === "shadow") key = rest.slice(1).join("-");
      else if (rest[0] === "focus") key = `focus-${rest.slice(1).join("-")}`;
      else if (rest[0] === "highlight") key = `highlight-${rest.slice(1).join("-")}`;
      if (!key) key = "DEFAULT";
      boxShadow[key] = cssVar(t.path);
    }
    if (boxShadow.md && !boxShadow.DEFAULT) boxShadow.DEFAULT = boxShadow.md;

    // Opacity — auto from `opacity.*`.
    const opacity = {};
    for (const t of dictionary.allTokens) {
      if (t.path[0] !== "opacity") continue;
      opacity[t.path.slice(1).join("-")] = cssVar(t.path);
    }

    // Z-index.
    const zIndex = {};
    for (const t of dictionary.allTokens) {
      if (t.path[0] !== "z-index") continue;
      zIndex[t.path.slice(1).join("-")] = cssVar(t.path);
    }

    // Screens (Tailwind expects raw values, not CSS vars — Tailwind doesn't read vars at config time).
    const screens = {};
    for (const t of dictionary.allTokens) {
      if (t.path[0] !== "breakpoint") continue;
      const k = t.path.slice(1).join("-");
      // Resolve to raw value (e.g., "640px") — `t.value` after `dimension/px` transform.
      if (t.value !== "0") screens[k] = t.value;
    }

    // Transition duration / timing function.
    const transitionDuration = {};
    const transitionTimingFunction = {};
    for (const t of dictionary.allTokens) {
      if (t.path[0] !== "motion") continue;
      const k = t.path.slice(2).join("-");
      if (t.path[1] === "duration") transitionDuration[k] = cssVar(t.path);
      else if (t.path[1] === "easing") transitionTimingFunction[k] = cssVar(t.path);
    }

    // Font family — keep static; typography composites are exposed via individual vars.
    const fontFamily = { sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"] };

    // Component tokens — surface as Tailwind utilities so components can write
    // `h-btn-md`, `px-btn-sm`, `size-icon-btn-xs`, `rounded-input-lg`, `gap-btn`.
    const COMPONENT_ALIAS = {
      "button": "btn",
      "icon-button": "icon-btn",
      "input": "input",
    };
    const componentSizes = {};
    const componentRadii = {};
    const componentPaddings = {};
    const componentGaps = {};
    for (const t of dictionary.allTokens) {
      if (t.path[0] !== "component") continue;
      const cmp = COMPONENT_ALIAS[t.path[1]] ?? t.path[1];
      const role = t.path[2];
      const variant = t.path.slice(3).join("-");
      const key = variant ? `${cmp}-${variant}` : cmp;
      if (role === "height" || role === "size") {
        componentSizes[key] = cssVar(t.path);
      } else if (role === "icon-size") {
        componentSizes[`${cmp}-icon${variant ? `-${variant}` : ""}`] = cssVar(t.path);
      } else if (role === "padding-x") {
        // Class will be `px-btn-sm` → reads padding[btn-sm].
        componentPaddings[key] = cssVar(t.path);
      } else if (role === "padding-y") {
        // Disambiguate with -y suffix so `py-input-y` reads the right value.
        componentPaddings[variant ? `${cmp}-y-${variant}` : `${cmp}-y`] = cssVar(t.path);
      } else if (role === "radius") {
        componentRadii[key] = cssVar(t.path);
      } else if (role === "gap") {
        componentGaps[key] = cssVar(t.path);
      }
    }

    // Merge component tokens into spacing-derived scales so utilities resolve.
    const height = { ...spacing, ...componentSizes };
    const width = { ...spacing, ...componentSizes };
    const padding = { ...spacing, ...componentPaddings };
    const gap = { ...spacing, ...componentGaps };
    const mergedRadius = { ...borderRadius, ...componentRadii };

    const dump = (obj) => JSON.stringify(obj, null, 2).replace(/^/gm, "      ").trim();

    return `/**
 * Tailwind preset for SantoDS — auto-generated from token tree.
 *
 * Consumers: import and spread in tailwind.config.{js,ts}:
 *   import santoPreset from "@santo-ds/tokens/tailwind";
 *   export default { presets: [santoPreset], content: [...] };
 *
 * Brand: built with BRAND=${BRAND}. Override at build time to swap which accent family
 * the short \`accent.*\` keys resolve to.
 */
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: ${dump(colors)},
      spacing: ${dump(spacing)},
      size: ${dump(height)},
      height: ${dump(height)},
      width: ${dump(width)},
      padding: ${dump(padding)},
      gap: ${dump(gap)},
      borderRadius: ${dump(mergedRadius)},
      borderWidth: ${dump(borderWidth)},
      boxShadow: ${dump(boxShadow)},
      opacity: ${dump(opacity)},
      zIndex: ${dump(zIndex)},
      screens: ${dump(screens)},
      transitionDuration: ${dump(transitionDuration)},
      transitionTimingFunction: ${dump(transitionTimingFunction)},
      fontFamily: ${dump(fontFamily)},
    },
  },
};
`;
  },
});

/* ---------- input collection ---------- */

function listInputs(dir, filter) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .filter(filter)
    .map((f) => resolve(dir, f));
}

const isModeFile = (f) => /^semantic\.(light|dark)(\.extra)?\.json$/.test(f);

const baseInputs = [
  ...listInputs(INPUT, (f) => !isModeFile(f)),
  ...listInputs(EXTRA, (f) => !isModeFile(f)),
];
const lightInputs = [
  ...listInputs(INPUT, (f) => f === "semantic.light.json"),
  ...listInputs(EXTRA, (f) => f === "semantic.light.extra.json"),
];
const darkInputs = [
  ...listInputs(INPUT, (f) => f === "semantic.dark.json"),
  ...listInputs(EXTRA, (f) => f === "semantic.dark.extra.json"),
];
const allLightInputs = [...baseInputs, ...lightInputs]; // for JS/TS/Tailwind output — default theme is light

/* ---------- build helpers ---------- */

async function buildCssLayer({ source, destination, selector, includeFilter, outputReferences }) {
  const sd = new StyleDictionary({
    source,
    log: { verbosity: "silent", errors: { brokenReferences: "throw" } },
    prefix: PREFIX,
    platforms: {
      css: {
        transformGroup: "sds/css",
        prefix: PREFIX,
        buildPath: DIST + "/css/",
        files: [
          {
            destination,
            format: "css/variables-scoped",
            options: { selector, outputReferences: !!outputReferences },
            filter: includeFilter,
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

async function buildJsTsAndTailwind() {
  const sd = new StyleDictionary({
    source: allLightInputs,
    log: { verbosity: "silent" },
    prefix: PREFIX,
    platforms: {
      js: {
        transformGroup: "sds/js",
        prefix: PREFIX,
        buildPath: DIST + "/js/",
        files: [{ destination: "tokens.js", format: "js/tokens-esm" }],
      },
      ts: {
        transformGroup: "sds/js",
        prefix: PREFIX,
        buildPath: DIST + "/ts/",
        files: [{ destination: "tokens.d.ts", format: "ts/tokens-declaration" }],
      },
      tailwind: {
        transformGroup: "sds/js",
        prefix: PREFIX,
        buildPath: DIST + "/tailwind/",
        files: [{ destination: "preset.js", format: "tailwind/preset" }],
      },
      typography: {
        transformGroup: "sds/css",
        prefix: PREFIX,
        buildPath: DIST + "/css/",
        files: [{ destination: "typography.css", format: "css/typography-utilities" }],
      },
    },
  });
  await sd.buildAllPlatforms();
}

function writeTokensEntry() {
  const entry = `@import "./base.css";\n@import "./semantic-light.css";\n@import "./semantic-dark.css";\n@import "./typography.css";\n`;
  writeFileSync(resolve(DIST, "css/tokens.css"), entry);
}

/* ---------- main ---------- */

const isSemantic = (token) => token.path[0] === "color" && token.path[1] === "semantic";
const isBase = (token) => !isSemantic(token);

async function main() {
  if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  await buildCssLayer({
    source: baseInputs,
    destination: "base.css",
    selector: ":root",
    includeFilter: isBase,
    outputReferences: true,
  });
  await buildCssLayer({
    source: [...baseInputs, ...lightInputs],
    destination: "semantic-light.css",
    selector: ":root",
    includeFilter: isSemantic,
    outputReferences: true,
  });
  await buildCssLayer({
    source: [...baseInputs, ...darkInputs],
    destination: "semantic-dark.css",
    selector: '[data-theme="dark"]',
    includeFilter: isSemantic,
    outputReferences: true,
  });
  writeTokensEntry();

  await buildJsTsAndTailwind();

  console.log(`✓ tokens built → dist/  (BRAND=${BRAND})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
