
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface MealSelectionToggleProps {
  showMealSelection: boolean;
  setShowMealSelection: (show: boolean) => void;
}

const MealSelectionToggle: React.FC<MealSelectionToggleProps> = ({
  showMealSelection,
  setShowMealSelection
}) => {
  const { language } = useLanguage();

  return (
    <div className="mb-4 animate-fade-in">
      <Button
        variant="outline"
        className={cn(
          "w-full",
          showMealSelection ? "bg-hotel-cream" : ""
        )}
        onClick={() => setShowMealSelection(!showMealSelection)}
      >
        {showMealSelection ? 
          (language === 'en' ? 'Hide meal selection' 
          : language === 'fa' ? 'مخفی کردن انتخاب غذا' 
          : 'إخفاء اختيار الوجبة') 
          : 
          (language === 'en' ? 'Pre-select your meal (optional)' 
          : language === 'fa' ? 'پیش‌انتخاب غذا (اختیاری)' 
          : 'اختيار وجبتك مسبقًا (اختياري)')
        }
      </Button>
    </div>
  );
};

export default MealSelectionToggle;
