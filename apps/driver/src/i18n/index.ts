import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations, getInitialLocale, setLocale } from '@romuo-vtc/shared';

// Initialiser i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: translations.fr },
      en: { translation: translations.en },
    },
    lng: getInitialLocale(),
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

// Sauvegarder la langue quand elle change
i18n.on('languageChanged', (lng) => {
  setLocale(lng);
});

export default i18n;
