
import { Language, TranslationKey } from './types';
import { commonTranslations } from './common';
import { wifiTranslations } from './wifi';
import { informationTranslations } from './information';
import { bookingTranslations } from './booking';
import { taxiTranslations } from './taxi';
import { cleaningTranslations } from './cleaning';
import { frontDeskTranslations } from './frontDesk';
import { chatTranslations } from './chat';

// Combine all translation objects
export const translations: Record<string, Record<Language, string>> = {
  ...commonTranslations,
  ...wifiTranslations,
  ...informationTranslations,
  ...bookingTranslations,
  ...taxiTranslations,
  ...cleaningTranslations,
  ...frontDeskTranslations,
  ...chatTranslations
};

// The function to get a translation
export const getTranslation = (key: TranslationKey, language: Language): string => {
  return translations[key][language];
};

// Re-export types
export * from './types';
