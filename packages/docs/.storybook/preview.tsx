import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/app.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
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
        ],
      },
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

export default preview;
