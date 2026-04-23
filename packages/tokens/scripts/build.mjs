#!/usr/bin/env node
/**
 * Build Style Dictionary outputs for SantoDS.
 *
 * Inputs:  packages/tokens/src/input/*.json   (produced by preprocess.mjs)
 * Outputs: packages/tokens/dist/{css,js,ts,tailwind}
 *
 * CSS layering:
 *   - `css/base.css`            → `:root` with all mode-agnostic tokens.
 *   - `css/semantic-light.css`  → `:root` with semantic tokens (light values).
 *   - `css/semantic-dark.css`   → `[data-theme="dark"]` with semantic tokens (dark values).
 *   - `css/tokens.css`          → single entry point, imports the three above.
 */

import StyleDictionary from "style-dictionary";
import { readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG = resolve(__dirname, "..");
const INPUT = resolve(PKG, "src/input");
const DIST = resolve(PKG, "dist");
const PREFIX = "sds";

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

StyleDictionary.registerTransform({
  name: "name/sds-kebab",
  type: "name",
  transform: (token, config) => {
    const prefix = config?.prefix ? `${config.prefix}-` : "";
    return (prefix + token.path.join("-")).toLowerCase();
  },
});

StyleDictionary.registerTransformGroup({
  name: "sds/css",
  transforms: [
    "attribute/cti",
    "name/sds-kebab",
    "opacity/decimal",
    "dimension/px",
    "shadow/css",
    "fontweight/number",
    "string/unquoted",
  ],
});

StyleDictionary.registerTransformGroup({
  name: "sds/js",
  transforms: [
    "attribute/cti",
    "name/sds-kebab",
    "opacity/decimal",
    "dimension/px",
    "shadow/css",
    "fontweight/number",
    "string/unquoted",
  ],
});

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

/* ---------- build helper ---------- */

function listInputs(filter) {
  return readdirSync(INPUT)
    .filter((f) => f.endsWith(".json"))
    .filter(filter)
    .map((f) => resolve(INPUT, f));
}

const baseInputs = listInputs((f) => !f.startsWith("semantic."));
const lightInputs = listInputs((f) => f === "semantic.light.json");
const darkInputs = listInputs((f) => f === "semantic.dark.json");
const allLightInputs = [...baseInputs, ...lightInputs]; // for JS/TS output — default theme is light

/**
 * Build a CSS layer. `includeFilter` selects which tokens get written to the file.
 * Base tokens are always included in `source` so semantic references resolve, but
 * filtered out of the output where appropriate. `outputReferences` keeps cross-token
 * references as `var(--...)` calls instead of flattening to hex values.
 */
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

async function buildJsAndTs() {
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
    },
  });
  await sd.buildAllPlatforms();
}

function writeTokensEntry() {
  const entry = `@import "./base.css";\n@import "./semantic-light.css";\n@import "./semantic-dark.css";\n`;
  writeFileSync(resolve(DIST, "css/tokens.css"), entry);
}

function writeTailwindPreset() {
  const content = `/**
 * Tailwind preset for SantoDS. Maps CSS variables into Tailwind's theme so
 * utility classes (\`bg-background-default-soft\`, \`text-font-default\`, etc.)
 * resolve to the current mode's values automatically.
 *
 * Consumers: import and spread in tailwind.config.{js,ts}:
 *   import santoPreset from "@santo-ds/tokens/tailwind";
 *   export default { presets: [santoPreset], content: [...] };
 */
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // semantic — mode-aware via CSS vars
        background: {
          DEFAULT: "var(--${PREFIX}-color-semantic-background-default-main)",
          soft: "var(--${PREFIX}-color-semantic-background-default-soft)",
          accent: "var(--${PREFIX}-color-semantic-background-default-accent)",
          inversed: "var(--${PREFIX}-color-semantic-background-inversed-main)",
        },
        border: {
          DEFAULT: "var(--${PREFIX}-color-semantic-border-default-main)",
          soft: "var(--${PREFIX}-color-semantic-border-default-soft)",
          accent: "var(--${PREFIX}-color-semantic-border-default-accent)",
        },
        foreground: {
          DEFAULT: "var(--${PREFIX}-color-semantic-font-default-main)",
          soft: "var(--${PREFIX}-color-semantic-font-default-soft)",
          accent: "var(--${PREFIX}-color-semantic-font-default-accent)",
          inversed: "var(--${PREFIX}-color-semantic-font-inversed-main)",
        },
        icon: {
          DEFAULT: "var(--${PREFIX}-color-semantic-icon-default-main)",
          soft: "var(--${PREFIX}-color-semantic-icon-default-soft)",
          accent: "var(--${PREFIX}-color-semantic-icon-default-accent)",
        },
        accent: {
          lightest: "var(--${PREFIX}-color-accent-primary-lightest)",
          lighter: "var(--${PREFIX}-color-accent-primary-lighter)",
          light: "var(--${PREFIX}-color-accent-primary-light)",
          DEFAULT: "var(--${PREFIX}-color-accent-primary-base)",
          dark: "var(--${PREFIX}-color-accent-primary-dark)",
          darker: "var(--${PREFIX}-color-accent-primary-darker)",
          darkest: "var(--${PREFIX}-color-accent-primary-darkest)",
        },
        success: {
          DEFAULT: "var(--${PREFIX}-color-accent-success-base)",
          light: "var(--${PREFIX}-color-accent-success-light)",
          dark: "var(--${PREFIX}-color-accent-success-dark)",
        },
        warning: {
          DEFAULT: "var(--${PREFIX}-color-accent-warning-base)",
          light: "var(--${PREFIX}-color-accent-warning-light)",
          dark: "var(--${PREFIX}-color-accent-warning-dark)",
        },
        danger: {
          DEFAULT: "var(--${PREFIX}-color-accent-danger-base)",
          light: "var(--${PREFIX}-color-accent-danger-light)",
          dark: "var(--${PREFIX}-color-accent-danger-dark)",
        },
      },
      spacing: {
        0: "0",
        1: "var(--${PREFIX}-size-1)",
        2: "var(--${PREFIX}-size-2)",
        4: "var(--${PREFIX}-size-4)",
        6: "var(--${PREFIX}-size-6)",
        8: "var(--${PREFIX}-size-8)",
        10: "var(--${PREFIX}-size-10)",
        12: "var(--${PREFIX}-size-12)",
        14: "var(--${PREFIX}-size-14)",
        16: "var(--${PREFIX}-size-16)",
        18: "var(--${PREFIX}-size-18)",
        20: "var(--${PREFIX}-size-20)",
        24: "var(--${PREFIX}-size-24)",
        28: "var(--${PREFIX}-size-28)",
        32: "var(--${PREFIX}-size-32)",
        40: "var(--${PREFIX}-size-40)",
        48: "var(--${PREFIX}-size-48)",
        56: "var(--${PREFIX}-size-56)",
        64: "var(--${PREFIX}-size-64)",
        72: "var(--${PREFIX}-size-72)",
        80: "var(--${PREFIX}-size-80)",
        88: "var(--${PREFIX}-size-88)",
        96: "var(--${PREFIX}-size-96)",
        104: "var(--${PREFIX}-size-104)",
      },
      borderRadius: {
        none: "0",
        4: "var(--${PREFIX}-border-radius-4)",
        6: "var(--${PREFIX}-border-radius-6)",
        8: "var(--${PREFIX}-border-radius-8)",
        10: "var(--${PREFIX}-border-radius-10)",
        12: "var(--${PREFIX}-border-radius-12)",
        16: "var(--${PREFIX}-border-radius-16)",
        20: "var(--${PREFIX}-border-radius-20)",
        24: "var(--${PREFIX}-border-radius-24)",
        32: "var(--${PREFIX}-border-radius-32)",
        full: "9999px",
      },
      borderWidth: {
        hairline: "var(--${PREFIX}-border-width-hairline)",
        thick: "var(--${PREFIX}-border-width-thick)",
        thicker: "var(--${PREFIX}-border-width-thicker)",
        medium: "var(--${PREFIX}-border-width-medium)",
        heavy: "var(--${PREFIX}-border-width-heavy)",
      },
      boxShadow: {
        sm: "var(--${PREFIX}-effect-shadow-sm)",
        DEFAULT: "var(--${PREFIX}-effect-shadow-md)",
        md: "var(--${PREFIX}-effect-shadow-md)",
        lg: "var(--${PREFIX}-effect-shadow-lg)",
        inversed: "var(--${PREFIX}-effect-shadow-inversed)",
        "focus-accent": "var(--${PREFIX}-effect-focus-accent)",
        "focus-neutral": "var(--${PREFIX}-effect-focus-neutral)",
        "highlight-accent": "var(--${PREFIX}-effect-highlight-accent)",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      opacity: {
        8: "var(--${PREFIX}-opacity-8)",
        16: "var(--${PREFIX}-opacity-16)",
        24: "var(--${PREFIX}-opacity-24)",
        32: "var(--${PREFIX}-opacity-32)",
        40: "var(--${PREFIX}-opacity-40)",
        48: "var(--${PREFIX}-opacity-48)",
        56: "var(--${PREFIX}-opacity-56)",
        64: "var(--${PREFIX}-opacity-64)",
        72: "var(--${PREFIX}-opacity-72)",
        80: "var(--${PREFIX}-opacity-80)",
        88: "var(--${PREFIX}-opacity-88)",
        96: "var(--${PREFIX}-opacity-96)",
      },
    },
  },
};
`;
  mkdirSync(resolve(DIST, "tailwind"), { recursive: true });
  writeFileSync(resolve(DIST, "tailwind/preset.js"), content);
}

/* ---------- main ---------- */

const isSemantic = (token) => token.path[0] === "color" && token.path[1] === "semantic";
const isBase = (token) => !isSemantic(token);

async function main() {
  if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  // Base: no cross-file refs needed; resolve values inline.
  await buildCssLayer({
    source: baseInputs,
    destination: "base.css",
    selector: ":root",
    includeFilter: isBase,
    outputReferences: true,
  });
  // Semantic light: include base in source so refs resolve, filter out base, keep refs as var().
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

  await buildJsAndTs();
  writeTailwindPreset();

  console.log("✓ tokens built → dist/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
