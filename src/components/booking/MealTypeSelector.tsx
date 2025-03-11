
import React from 'react';
import { cn } from '@/lib/utils';
import { getTranslation } from '@/utils/translations';
import { useLanguage } from '@/context/LanguageContext';

type MealType = 'breakfast' | 'lunch' | 'dinner';

interface MealTypeSelectorProps {
  selectedMeal: MealType;
  setSelectedMeal: (meal: MealType) => void;
}

const MealTypeSelector: React.FC<MealTypeSelectorProps> = ({
  selectedMeal,
  setSelectedMeal
}) => {
  const { language } = useLanguage();

  return (
    <div className="flex mb-4">
      <button 
        className={cn(
          "flex-1 py-2 text-sm border-b-2 transition-all",
          selectedMeal === 'breakfast' 
            ? "border-hotel-gold font-medium" 
            : "border-transparent hover:border-hotel-blue"
        )}
        onClick={() => setSelectedMeal('breakfast')}
      >
        {getTranslation('breakfast', language)}
      </button>
      <button 
        className={cn(
          "flex-1 py-2 text-sm border-b-2 transition-all",
          selectedMeal === 'lunch' 
            ? "border-hotel-gold font-medium" 
            : "border-transparent hover:border-hotel-blue"
        )}
        onClick={() => setSelectedMeal('lunch')}
      >
        {getTranslation('lunch', language)}
      </button>
      <button 
        className={cn(
          "flex-1 py-2 text-sm border-b-2 transition-all",
          selectedMeal === 'dinner' 
            ? "border-hotel-gold font-medium" 
            : "border-transparent hover:border-hotel-blue"
        )}
        onClick={() => setSelectedMeal('dinner')}
      >
        {getTranslation('dinner', language)}
      </button>
    </div>
  );
};

export default MealTypeSelector;
