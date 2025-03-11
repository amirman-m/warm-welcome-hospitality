
import { useState, useEffect } from 'react';
import { MealType, ActivityType, MenuItem } from '@/types/booking';
import { drinks, desserts, meals, generateTimeSlots } from '@/components/booking/BookingData';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';

export const useBooking = () => {
  const { language } = useLanguage();
  const [activeBooking, setActiveBooking] = useState<ActivityType>('table');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Meal selection state
  const [showMealSelection, setShowMealSelection] = useState(false);
  const [selectedDrinks, setSelectedDrinks] = useState<MenuItem[]>(drinks);
  const [selectedDesserts, setSelectedDesserts] = useState<MenuItem[]>(desserts);
  const [selectedMeals, setSelectedMeals] = useState<MenuItem[]>(meals);
  
  // Update time slots when meal type changes
  useEffect(() => {
    // Reset selected time when meal type changes
    setSelectedTime('');
    
    // Set time slots based on meal type
    switch (selectedMeal) {
      case 'breakfast':
        setTimeSlots(generateTimeSlots('06:00', '10:00'));
        break;
      case 'lunch':
        setTimeSlots(generateTimeSlots('12:00', '15:00'));
        break;
      case 'dinner':
        setTimeSlots(generateTimeSlots('18:30', '21:00'));
        break;
      default:
        setTimeSlots([]);
    }
    
    // Reset meal selection when meal type changes
    setShowMealSelection(false);
    setSelectedDrinks(drinks.map(drink => ({ ...drink, quantity: 0 })));
    setSelectedDesserts(desserts.map(dessert => ({ ...dessert, quantity: 0 })));
    setSelectedMeals(meals.map(meal => ({ ...meal, quantity: 0 })));
  }, [selectedMeal]);

  const updateItemQuantity = (
    itemId: number, 
    operation: 'increment' | 'decrement', 
    type: 'drinks' | 'desserts' | 'meals'
  ) => {
    if (type === 'drinks') {
      setSelectedDrinks(drinks => 
        drinks.map(drink => 
          drink.id === itemId 
            ? { 
                ...drink, 
                quantity: operation === 'increment' 
                  ? drink.quantity + 1 
                  : Math.max(0, drink.quantity - 1) 
              } 
            : drink
        )
      );
    } else if (type === 'desserts') {
      setSelectedDesserts(desserts => 
        desserts.map(dessert => 
          dessert.id === itemId 
            ? { 
                ...dessert, 
                quantity: operation === 'increment' 
                  ? dessert.quantity + 1 
                  : Math.max(0, dessert.quantity - 1) 
              } 
            : dessert
        )
      );
    } else if (type === 'meals') {
      setSelectedMeals(meals => 
        meals.map(meal => 
          meal.id === itemId 
            ? { 
                ...meal, 
                quantity: operation === 'increment' 
                  ? meal.quantity + 1 
                  : Math.max(0, meal.quantity - 1) 
              } 
            : meal
        )
      );
    }
  };

  const getTotalSelectedItems = () => {
    const drinkCount = selectedDrinks.reduce((total, item) => total + item.quantity, 0);
    const dessertCount = selectedDesserts.reduce((total, item) => total + item.quantity, 0);
    const mealCount = selectedMeals.reduce((total, item) => total + item.quantity, 0);
    return drinkCount + dessertCount + mealCount;
  };

  return {
    activeBooking,
    setActiveBooking,
    selectedMeal,
    setSelectedMeal,
    selectedTime,
    setSelectedTime,
    selectedTable,
    setSelectedTable,
    timeSlots,
    selectedDate,
    setSelectedDate,
    showMealSelection,
    setShowMealSelection,
    selectedDrinks,
    selectedDesserts,
    selectedMeals,
    updateItemQuantity,
    getTotalSelectedItems
  };
};
