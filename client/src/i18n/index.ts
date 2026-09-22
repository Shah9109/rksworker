import hi from './hi.json';
import en from './en.json';

type Language = 'hi' | 'en';

const translations: Record<Language, any> = { hi, en };

export const getTranslation = (lang: Language, keyPath: string): string => {
  const keys = keyPath.split('.');
  let result: any = translations[lang] || translations.hi;
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      return keyPath;
    }
  }
  return typeof result === 'string' ? result : keyPath;
};
