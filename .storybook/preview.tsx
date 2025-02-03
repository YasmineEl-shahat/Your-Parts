import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/app/globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/lib/i18n/i18n";

export const i18nDecorator = (Story) => (
  <I18nextProvider i18n={i18n}>
    <Story />
  </I18nextProvider>
);

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
  i18nDecorator,
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
