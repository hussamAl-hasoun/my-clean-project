import React, { createContext, useState, useEffect, useContext } from "react";

type Language = "ar" | "en";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  getTranslatedText: (arabicText: string, englishText: string) => string;
  toggleLanguage: () => void;
};

export const LanguageProviderContext = createContext<LanguageProviderState | null>(null);

export function LanguageProvider({
  children,
  defaultLanguage = "ar",
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem("language") as Language) || defaultLanguage
  );

  useEffect(() => {
    // تحديث اتجاه الصفحة بناءً على اللغة
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    
    // حفظ التفضيل في localStorage
    localStorage.setItem("language", language);
  }, [language]);

  const getTranslatedText = (arabicText: string, englishText: string): string => {
    return language === "ar" ? arabicText : englishText;
  };

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <LanguageProviderContext.Provider 
      value={{
        language,
        setLanguage: (language: Language) => {
          localStorage.setItem("language", language);
          setLanguage(language);
        },
        getTranslatedText,
        toggleLanguage,
      }}
    >
      <div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div>
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
