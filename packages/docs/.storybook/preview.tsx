import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { santodsLight, santodsDark } from "./theme";
import "../src/app.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: "requiredFirst",
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction",
          "Foundations",
          [
            "Semantic Usage",
            "Colors",
            "Typography",
            "Spacing",
            "Radius",
            "Effects",
            "Opacity",
            "Motion",
            "States",
            "Z-Index",
            "Breakpoints",
            "Density",
            "Component Tokens",
            "Data Viz",
            "Grids",
          ],
          "Components",
          ["Actions", "Inputs", "Display", "Feedback", "Overlay", "Navigation"],
          "*",
        ],
      },
    },
    docs: {
      theme: santodsLight,
      toc: { headingSelector: "h2, h3" },
    },
    backgrounds: { disable: true },
    a11y: {
      // axe-core options — fail on violations of these tags during dev/test.
      element: "#storybook-root",
      config: {},
      options: { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { light: "light", dark: "dark" },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
};

// Suppress unused-import warning when the dark theme is referenced from
// stories that flip docs.theme programmatically.
void santodsDark;

export default preview;
