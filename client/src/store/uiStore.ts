import { create } from 'zustand';

export type Language = 'hi' | 'en';

interface UIState {
  language: Language;
  darkMode: boolean;
  setLanguage: (lang: Language) => void;
  toggleDarkMode: () => void;
}

const savedLang = (localStorage.getItem('wp_lang') as Language) || 'hi';

export const useUIStore = create<UIState>((set) => ({
  language: savedLang,
  darkMode: false,
  setLanguage: (lang) => {
    localStorage.setItem('wp_lang', lang);
    set({ language: lang });
  },
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
