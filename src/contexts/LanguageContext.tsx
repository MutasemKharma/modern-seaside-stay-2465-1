import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { ar } from "../locales/ar";
import { en } from "../locales/en";

type Translations = typeof ar;

export type SupportedLocale = "ar" | "en";

interface LanguageContextType {
  language: SupportedLocale;
  setLanguage: (lang: SupportedLocale) => void;
  t: Translations;
}

const translations: Record<SupportedLocale, Translations> = {
  ar,
  en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<SupportedLocale>("ar");

  useEffect(() => {
    const savedLanguage = (localStorage.getItem("language") as SupportedLocale | null) ?? "ar";
    if (translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: SupportedLocale) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
