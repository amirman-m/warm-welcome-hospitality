
import React, { useState } from 'react';
import { GlassWater, Pizza, IceCream, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface MenuItem {
  id: number;
  name: string;
  nameAr: string;
  nameFa: string;
  quantity: number;
}

interface MealSelectionProps {
  selectedDrinks: MenuItem[];
  selectedDesserts: MenuItem[];
  selectedMeals: MenuItem[];
  updateItemQuantity: (itemId: number, operation: 'increment' | 'decrement', type: 'drinks' | 'desserts' | 'meals') => void;
  showMealSelection: boolean;
}

const MealSelection: React.FC<MealSelectionProps> = ({
  selectedDrinks,
  selectedDesserts,
  selectedMeals,
  updateItemQuantity,
  showMealSelection
}) => {
  const { language } = useLanguage();
  const [drinksExpanded, setDrinksExpanded] = useState(true);
  const [dessertsExpanded, setDessertsExpanded] = useState(true);
  const [mealsExpanded, setMealsExpanded] = useState(true);

  if (!showMealSelection) {
    return null;
  }
  
  const drinksSectionTitle = language === 'en' ? 'Drinks' 
                           : language === 'fa' ? 'نوشیدنی‌ها' 
                           : 'المشروبات';
  
  const dessertsSectionTitle = language === 'en' ? 'Desserts' 
                             : language === 'fa' ? 'دسرها' 
                             : 'الحلويات';
  
  const mealsSectionTitle = language === 'en' ? 'Meals' 
                          : language === 'fa' ? 'غذاها' 
                          : 'الوجبات';

  const renderMenuItem = (
    item: MenuItem, 
    type: 'drinks' | 'desserts' | 'meals'
  ) => {
    const itemName = language === 'en' ? item.name 
                   : language === 'fa' ? item.nameFa 
                   : item.nameAr;
    
    return (
      <div key={item.id} className="flex items-center justify-between py-2 border-b border-hotel-cream">
        <span className="flex-1">{itemName}</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateItemQuantity(item.id, 'decrement', type)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateItemQuantity(item.id, 'increment', type)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="mt-4 bg-hotel-cream p-4 rounded-lg animate-fade-in">
      <h4 className="text-sm font-medium mb-3">
        {language === 'en' ? 'Pre-select your meal (optional)' 
        : language === 'fa' ? 'پیش‌انتخاب غذا (اختیاری)' 
        : 'اختيار وجبتك مسبقًا (اختياري)'}
      </h4>
      
      <ScrollArea className="h-64 pr-4">
        {/* Drinks section */}
        <div className="mb-4">
          <button 
            onClick={() => setDrinksExpanded(!drinksExpanded)}
            className="flex items-center justify-between w-full mb-2 font-medium"
          >
            <div className="flex items-center">
              <GlassWater className="w-4 h-4 mr-2" />
              {drinksSectionTitle}
            </div>
            {drinksExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {drinksExpanded && (
            <div className="pl-6">
              {selectedDrinks.map(drink => renderMenuItem(drink, 'drinks'))}
            </div>
          )}
        </div>
        
        {/* Desserts section */}
        <div className="mb-4">
          <button 
            onClick={() => setDessertsExpanded(!dessertsExpanded)}
            className="flex items-center justify-between w-full mb-2 font-medium"
          >
            <div className="flex items-center">
              <IceCream className="w-4 h-4 mr-2" />
              {dessertsSectionTitle}
            </div>
            {dessertsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {dessertsExpanded && (
            <div className="pl-6">
              {selectedDesserts.map(dessert => renderMenuItem(dessert, 'desserts'))}
            </div>
          )}
        </div>
        
        {/* Meals section */}
        <div className="mb-4">
          <button 
            onClick={() => setMealsExpanded(!mealsExpanded)}
            className="flex items-center justify-between w-full mb-2 font-medium"
          >
            <div className="flex items-center">
              <Pizza className="w-4 h-4 mr-2" />
              {mealsSectionTitle}
            </div>
            {mealsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {mealsExpanded && (
            <div className="pl-6">
              {selectedMeals.map(meal => renderMenuItem(meal, 'meals'))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MealSelection;
