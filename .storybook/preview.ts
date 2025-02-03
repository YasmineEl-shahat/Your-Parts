import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/app/globals.css";

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      mobile: {
        name: "Mobile",
        styles: { width: "360px", height: "640px" },
      },
      tablet: {
        name: "Tablet",
        styles: { width: "768px", height: "1024px" },
      },
      desktop: {
        name: "Desktop",
        styles: { width: "1280px", height: "800px" },
      },
    },
  },
  rtlDirection: {
    defaultDirection: "ltr",
    autoLocales: ["ar"],
  },
};
