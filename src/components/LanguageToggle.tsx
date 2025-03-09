
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center justify-center gap-2 glass-effect py-2 px-3 rounded-full animate-fade-in">
      <button
        onClick={() => setLanguage('fa')}
        className={cn(
          "font-vazirmatn text-sm px-2 py-1 rounded-md transition-all duration-300",
          language === 'fa' 
            ? "bg-hotel-gold text-white font-medium" 
            : "text-hotel-charcoal hover:bg-hotel-cream"
        )}
      >
        فارسی
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "font-inter text-sm px-2 py-1 rounded-md transition-all duration-300",
          language === 'en' 
            ? "bg-hotel-gold text-white font-medium" 
            : "text-hotel-charcoal hover:bg-hotel-cream"
        )}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={cn(
          "font-vazirmatn text-sm px-2 py-1 rounded-md transition-all duration-300",
          language === 'ar' 
            ? "bg-hotel-gold text-white font-medium" 
            : "text-hotel-charcoal hover:bg-hotel-cream"
        )}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageToggle;
