import { useContext } from 'react';
import { LanguageProviderContext } from '@/components/providers/language-provider';

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
