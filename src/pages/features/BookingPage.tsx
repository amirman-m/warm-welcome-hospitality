
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

// Types
import { MealType, ActivityType, MenuItem } from '@/types/booking';

// Components
import TableSelection from '@/components/booking/TableSelection';
import TimeSelection from '@/components/booking/TimeSelection';
import MealTypeSelector from '@/components/booking/MealTypeSelector';
import MealSelection from '@/components/booking/MealSelection';
import BookingTabs from '@/components/booking/BookingTabs';
import BookingHeader from '@/components/booking/BookingHeader';
import DateSelection from '@/components/booking/DateSelection';

// Data
import { 
  restaurantTables, 
  drinks, 
  desserts, 
  meals,
  generateTimeSlots 
} from '@/components/booking/BookingData';

const BookingPage = () => {
  const { language, direction } = useLanguage();
  const [activeBooking, setActiveBooking] = useState<ActivityType>('table');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // New state for meal selection
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
  
  const handleBook = () => {
    if (!selectedDate) {
      toast({
        title: language === 'en' ? 'Select a date' : language === 'fa' ? 'تاریخ را انتخاب کنید' : 'حدد تاريخًا',
        variant: "destructive",
      });
      return;
    }

    if (!selectedTime) {
      toast({
        title: language === 'en' ? 'Select a time' : language === 'fa' ? 'زمان را انتخاب کنید' : 'حدد وقتًا',
        variant: "destructive",
      });
      return;
    }
    
    if (activeBooking === 'table' && !selectedTable) {
      toast({
        title: language === 'en' ? 'Select a table' : language === 'fa' ? 'میز را انتخاب کنید' : 'حدد طاولة',
        variant: "destructive",
      });
      return;
    }
    
    let successMessage = '';
    const dateString = selectedDate.toLocaleDateString(
      language === 'en' ? 'en-US' : language === 'fa' ? 'fa-IR' : 'ar-SA'
    );
    
    if (language === 'en') {
      successMessage = `Your ${getActivityName(activeBooking, 'en')} has been booked for ${dateString} at ${selectedTime}`;
      if (activeBooking === 'table') {
        const tableInfo = restaurantTables.find(t => t.id === selectedTable);
        successMessage += ` (${getMealName(selectedMeal, 'en')}, Table ${selectedTable} - ${tableInfo?.seats} seats)`;
        
        // Add meal selection information if available
        if (showMealSelection && (selectedMeal === 'lunch' || selectedMeal === 'dinner')) {
          const totalItems = getTotalSelectedItems();
          if (totalItems > 0) {
            successMessage += ` with ${totalItems} pre-selected items`;
          }
        }
      }
    } else if (language === 'fa') {
      successMessage = `${getActivityName(activeBooking, 'fa')} شما برای تاریخ ${dateString} ساعت ${selectedTime} رزرو شد`;
      if (activeBooking === 'table') {
        const tableInfo = restaurantTables.find(t => t.id === selectedTable);
        successMessage += ` (${getMealName(selectedMeal, 'fa')}، میز ${selectedTable} - ${tableInfo?.seats} صندلی)`;
        
        // Add meal selection information if available
        if (showMealSelection && (selectedMeal === 'lunch' || selectedMeal === 'dinner')) {
          const totalItems = getTotalSelectedItems();
          if (totalItems > 0) {
            successMessage += ` با ${totalItems} مورد از پیش انتخاب شده`;
          }
        }
      }
    } else {
      successMessage = `تم حجز ${getActivityName(activeBooking, 'ar')} الخاص بك للتاريخ ${dateString} الساعة ${selectedTime}`;
      if (activeBooking === 'table') {
        const tableInfo = restaurantTables.find(t => t.id === selectedTable);
        successMessage += ` (${getMealName(selectedMeal, 'ar')}، طاولة ${selectedTable} - ${tableInfo?.seats} مقاعد)`;
        
        // Add meal selection information if available
        if (showMealSelection && (selectedMeal === 'lunch' || selectedMeal === 'dinner')) {
          const totalItems = getTotalSelectedItems();
          if (totalItems > 0) {
            successMessage += ` مع ${totalItems} عناصر محددة مسبقًا`;
          }
        }
      }
    }
    
    toast({
      title: successMessage,
    });
    
    // Reset selection
    setSelectedTable(null);
    setSelectedTime('');
    setShowMealSelection(false);
    setSelectedDrinks(drinks.map(drink => ({ ...drink, quantity: 0 })));
    setSelectedDesserts(desserts.map(dessert => ({ ...dessert, quantity: 0 })));
    setSelectedMeals(meals.map(meal => ({ ...meal, quantity: 0 })));
  };
  
  const getTotalSelectedItems = () => {
    const drinkCount = selectedDrinks.reduce((total, item) => total + item.quantity, 0);
    const dessertCount = selectedDesserts.reduce((total, item) => total + item.quantity, 0);
    const mealCount = selectedMeals.reduce((total, item) => total + item.quantity, 0);
    return drinkCount + dessertCount + mealCount;
  };
  
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
  
  const getMealName = (meal: MealType, lang: 'en' | 'fa' | 'ar') => {
    return getTranslation(meal, lang);
  };
  
  const getActivityName = (activity: ActivityType, lang: 'en' | 'fa' | 'ar') => {
    switch (activity) {
      case 'table':
        return getTranslation('bookTable', lang);
      case 'tennis':
        return getTranslation('tennis', lang);
      case 'basketball':
        return getTranslation('basketball', lang);
      case 'coffee':
        return getTranslation('coffee', lang);
    }
  };
  
  return (
    <div className={`min-h-screen p-6 pt-20 bg-hotel-light ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
      <LanguageToggle />
      <BackButton />
      
      <div className="max-w-lg mx-auto animate-slide-up">
        {/* Header */}
        <BookingHeader />
        
        {/* Booking type tabs */}
        <BookingTabs 
          activeBooking={activeBooking} 
          setActiveBooking={setActiveBooking} 
        />
        
        {/* Booking form */}
        <div className="glass-effect rounded-xl p-6 text-start">
          {/* Restaurant booking specific */}
          {activeBooking === 'table' && (
            <div className="mb-6 animate-fade-in">
              <h3 className="font-medium mb-3">{getTranslation('bookTable', language)}</h3>
              
              <MealTypeSelector 
                selectedMeal={selectedMeal} 
                setSelectedMeal={setSelectedMeal} 
              />
              
              <TableSelection 
                tables={restaurantTables} 
                selectedTable={selectedTable} 
                setSelectedTable={setSelectedTable} 
              />
            </div>
          )}
          
          {/* Date selection for all booking types */}
          <DateSelection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          
          {/* Time selection for all booking types */}
          <TimeSelection 
            timeSlots={timeSlots} 
            selectedTime={selectedTime} 
            setSelectedTime={setSelectedTime} 
          />
          
          {/* Meal pre-selection toggle button for lunch and dinner */}
          {activeBooking === 'table' && 
           selectedTime && 
           (selectedMeal === 'lunch' || selectedMeal === 'dinner') && (
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
          )}
          
          {/* Meal selection menu */}
          <MealSelection
            selectedDrinks={selectedDrinks}
            selectedDesserts={selectedDesserts}
            selectedMeals={selectedMeals}
            updateItemQuantity={updateItemQuantity}
            showMealSelection={showMealSelection && (selectedMeal === 'lunch' || selectedMeal === 'dinner')}
          />
          
          {/* Book button */}
          <button
            className="w-full bg-hotel-gold text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all active:scale-95"
            onClick={handleBook}
          >
            {language === 'en' ? 'Book Now' : language === 'fa' ? 'رزرو کن' : 'احجز الآن'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
