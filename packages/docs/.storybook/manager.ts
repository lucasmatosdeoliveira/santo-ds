import { addons } from "@storybook/manager-api";
import { santodsLight } from "./theme";

addons.setConfig({
  theme: santodsLight,
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: true },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
