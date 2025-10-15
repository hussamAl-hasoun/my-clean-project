
import { useContext } from 'react';
import { LanguageProviderContext } from '@/components/providers/language-provider';

export function useLanguage() {
  const context = useContext(LanguageProviderContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
