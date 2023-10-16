import { ui, defaultLang, showDefaultLang } from './ui';

type LanguageKey = keyof typeof ui;
type UiData = typeof ui[typeof defaultLang];

export function getLangFromUrl(url: URL): LanguageKey {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as LanguageKey;
  return defaultLang;
}

export function useTranslations(lang: LanguageKey) {
  return function t(key: keyof UiData) {
    const uiData = ui[lang] || ui[defaultLang];
    return uiData[key as keyof typeof uiData] as string;
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
      return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
    }
  }