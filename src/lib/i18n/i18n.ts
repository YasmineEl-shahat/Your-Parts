import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/common.json";
import translationAR from "./ar/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: translationEN,
    },
    ar: {
      common: translationAR,
    },
  },
  debug: false,
  fallbackLng: "en",
  defaultNS: "common", // default namespace
  interpolation: { escapeValue: false },
});

export default i18n;
