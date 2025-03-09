
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fa' | 'en' | 'ar';
export type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');
  const [direction, setDirection] = useState<Direction>('rtl');

  useEffect(() => {
    // Update direction based on language
    if (language === 'en') {
      setDirection('ltr');
    } else {
      setDirection('rtl');
    }
    
    // Update document direction
    document.documentElement.dir = direction;
    
    // Set lang attribute
    document.documentElement.lang = language;
  }, [language, direction]);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
