import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import pt from "../../lang/pt";

i18n.use(initReactI18next).init({
    lng: "pt",
    resources: {
        ...pt,
    },
    fallbackLng: "pt",
    interpolation: {
        escapeValue: false,
    },
    cleanCode: true,
});

export default i18n;
