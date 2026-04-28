import { create } from "@storybook/theming";

/**
 * SantoDS Storybook chrome theme.
 *
 * Mirrors the design tokens used in the components themselves so the
 * Storybook UI feels like part of the design system, not a generic shell.
 *
 * Hard-coded hex values are intentional — Storybook's theme runs in the
 * manager iframe which doesn't load the tokens CSS bundle, so we cannot
 * use `var(--sds-*)`. Keep these in sync with `tokens/dist/css/base.css`.
 */
export const santodsLight = create({
  base: "light",
  brandTitle: "SantoDS",
  brandUrl: "https://github.com/lucasmatosdeoliveira/santo-ds",
  brandTarget: "_blank",

  // Brand color: accent.primary.main from primitive tokens
  colorPrimary: "#2B4DF7",
  colorSecondary: "#2B4DF7",

  // App
  appBg: "#FAFAFA",
  appContentBg: "#FFFFFF",
  appPreviewBg: "#FFFFFF",
  appBorderColor: "#E5E5E5",
  appBorderRadius: 10,

  // Text
  textColor: "#0A0A0A",
  textInverseColor: "#FFFFFF",
  textMutedColor: "#737373",

  // Toolbar default and active colors
  barTextColor: "#525252",
  barSelectedColor: "#2B4DF7",
  barHoverColor: "#2B4DF7",
  barBg: "#FFFFFF",

  // Form colors
  inputBg: "#FFFFFF",
  inputBorder: "#D4D4D4",
  inputTextColor: "#0A0A0A",
  inputBorderRadius: 8,

  // Typography
  fontBase:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode:
    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
});

export const santodsDark = create({
  base: "dark",
  brandTitle: "SantoDS",
  brandUrl: "https://github.com/lucasmatosdeoliveira/santo-ds",
  brandTarget: "_blank",

  colorPrimary: "#5C73F9",
  colorSecondary: "#5C73F9",

  appBg: "#0A0A0A",
  appContentBg: "#171717",
  appPreviewBg: "#0A0A0A",
  appBorderColor: "#262626",
  appBorderRadius: 10,

  textColor: "#FAFAFA",
  textInverseColor: "#0A0A0A",
  textMutedColor: "#A3A3A3",

  barTextColor: "#A3A3A3",
  barSelectedColor: "#5C73F9",
  barHoverColor: "#5C73F9",
  barBg: "#171717",

  inputBg: "#171717",
  inputBorder: "#404040",
  inputTextColor: "#FAFAFA",
  inputBorderRadius: 8,

  fontBase:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode:
    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
});
