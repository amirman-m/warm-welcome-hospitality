import React, { useState, useEffect } from 'react';
import { Calendar, Coffee, Utensils, Clock, CircleDot, GlassWater, Pizza, IceCream, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type MealType = 'breakfast' | 'lunch' | 'dinner';
type ActivityType = 'table' | 'tennis' | 'basketball' | 'coffee';

interface MenuItem {
  id: number;
  name: string;
  nameAr: string;
  nameFa: string;
  quantity: number;
}

interface TableInfo {
  id: number;
  available: boolean;
  seats: number;
  position: {
    row: number;
    col: number;
    type: 'square' | 'rectangle' | 'circle';
    orientation?: 'vertical' | 'horizontal';
  };
}

const drinks: MenuItem[] = [
  { id: 1, name: 'Water', nameAr: 'ماء', nameFa: 'آب', quantity: 0 },
  { id: 2, name: 'Soft Drink', nameAr: 'مشروب غازي', nameFa: 'نوشابه', quantity: 0 },
  { id: 3, name: 'Fresh Juice', nameAr: 'عصير طازج', nameFa: 'آبمیوه تازه', quantity: 0 },
  { id: 4, name: 'Coffee', nameAr: 'قهوة', nameFa: 'قهوه', quantity: 0 },
  { id: 5, name: 'Tea', nameAr: 'شاي', nameFa: 'چای', quantity: 0 },
];

const desserts: MenuItem[] = [
  { id: 1, name: 'Ice Cream', nameAr: 'آيس كريم', nameFa: 'بستنی', quantity: 0 },
  { id: 2, name: 'Cake', nameAr: 'كيك', nameFa: 'کیک', quantity: 0 },
  { id: 3, name: 'Fruit Salad', nameAr: 'سلطة فواكه', nameFa: 'سالاد میوه', quantity: 0 },
];

const meals: MenuItem[] = [
  { id: 1, name: 'Grilled Chicken', nameAr: 'دجاج مشوي', nameFa: 'مرغ کبابی', quantity: 0 },
  { id: 2, name: 'Vegetarian Pasta', nameAr: 'باستا نباتية', nameFa: 'پاستا گیاهی', quantity: 0 },
  { id: 3, name: 'Beef Steak', nameAr: 'ستيك لحم', nameFa: 'استیک گوشت', quantity: 0 },
  { id: 4, name: 'Seafood Platter', nameAr: 'طبق مأكولات بحرية', nameFa: 'بشقاب غذای دریایی', quantity: 0 },
];

// Define the restaurant layout with tables
const restaurantTables: TableInfo[] = [
  // First row (top)
  { id: 1, available: true, seats: 4, position: { row: 0, col: 0, type: 'square' } },
  { id: 2, available: false, seats: 4, position: { row: 0, col: 2, type: 'square' } },
  { id: 3, available: true, seats: 4, position: { row: 0, col: 4, type: 'square' } },
  { id: 4, available: true, seats: 4, position: { row: 0, col: 6, type: 'square' } },
  { id: 5, available: false, seats: 4, position: { row: 0, col: 8, type: 'square' } },
  
  // Second row (center top)
  { id: 6, available: true, seats: 6, position: { row: 2, col: 1, type: 'rectangle', orientation: 'horizontal' } },
  { id: 7, available: true, seats: 6, position: { row: 2, col: 5, type: 'rectangle', orientation: 'horizontal' } },
  
  // Third row (center)
  { id: 8, available: false, seats: 8, position: { row: 4, col: 3, type: 'rectangle', orientation: 'horizontal' } },
  
  // Fourth row (center bottom)
  { id: 9, available: true, seats: 6, position: { row: 6, col: 2, type: 'rectangle', orientation: 'horizontal' } },
  { id: 10, available: true, seats: 4, position: { row: 6, col: 6, type: 'square' } },
  
  // Fifth row (bottom)
  { id: 11, available: false, seats: 4, position: { row: 8, col: 0, type: 'square' } },
  { id: 12, available: true, seats: 4, position: { row: 8, col: 2, type: 'square' } },
  { id: 13, available: true, seats: 4, position: { row: 8, col: 4, type: 'square' } },
  { id: 14, available: true, seats: 4, position: { row: 8, col: 6, type: 'square' } },
  { id: 15, available: true, seats: 4, position: { row: 8, col: 8, type: 'square' } },
];

const BookingPage = () => {
  const { language, direction } = useLanguage();
  const [activeBooking, setActiveBooking] = useState<ActivityType>('table');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [hoveredTable, setHoveredTable] = useState<number | null>(null);
  
  // New state for meal selection
  const [showMealSelection, setShowMealSelection] = useState(false);
  const [selectedDrinks, setSelectedDrinks] = useState<MenuItem[]>(drinks);
  const [selectedDesserts, setSelectedDesserts] = useState<MenuItem[]>(desserts);
  const [selectedMeals, setSelectedMeals] = useState<MenuItem[]>(meals);
  
  // State for collapsible menu sections
  const [drinksExpanded, setDrinksExpanded] = useState(true);
  const [dessertsExpanded, setDessertsExpanded] = useState(true);
  const [mealsExpanded, setMealsExpanded] = useState(true);
  
  // Update time slots when meal type changes
  useEffect(() => {
    const generateTimeSlots = (start: string, end: string) => {
      const slots: string[] = [];
      const [startHour, startMinute] = start.split(':').map(Number);
      const [endHour, endMinute] = end.split(':').map(Number);
      
      let currentHour = startHour;
      let currentMinute = startMinute;
      
      while (
        currentHour < endHour || 
        (currentHour === endHour && currentMinute <= endMinute)
      ) {
        slots.push(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);
        
        currentMinute += 15;
        if (currentMinute >= 60) {
          currentHour += 1;
          currentMinute = 0;
        }
      }
      
      return slots;
    };
    
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
    
    if (language === 'en') {
      successMessage = `Your ${getActivityName(activeBooking, 'en')} has been booked for ${selectedTime}`;
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
      successMessage = `${getActivityName(activeBooking, 'fa')} شما برای ساعت ${selectedTime} رزرو شد`;
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
      successMessage = `تم حجز ${getActivityName(activeBooking, 'ar')} الخاص بك للساعة ${selectedTime}`;
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
  
  const formatTimeSlot = (time: string) => {
    // Format the time to include AM/PM for English users
    if (language === 'en') {
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    return time;
  };
  
  // Render a table in the restaurant map
  const renderTable = (table: TableInfo) => {
    const isSelected = selectedTable === table.id;
    const isHovered = hoveredTable === table.id;
    
    // Define table dimensions based on type
    let tableClassName = '';
    let chairsLayout;
    
    if (table.position.type === 'square') {
      tableClassName = 'w-12 h-12';
      chairsLayout = (
        <>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
        </>
      );
    } else if (table.position.type === 'rectangle' && table.position.orientation === 'horizontal') {
      tableClassName = 'w-24 h-12';
      chairsLayout = (
        <>
          <div className="absolute -top-4 left-1/4 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute -top-4 left-3/4 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute -bottom-4 left-1/4 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute -bottom-4 left-3/4 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
        </>
      );
    } else {
      tableClassName = 'w-16 h-16 rounded-full';
      chairsLayout = (
        <>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
        </>
      );
    }
    
    return (
      <div 
        key={table.id}
        className={`absolute flex items-center justify-center transition-all duration-200 ${
          table.position.row * 50}px ${table.position.col * 50}px`}
        style={{ 
          top: `${table.position.row * 50}px`, 
          left: `${table.position.col * 50}px` 
        }}
      >
        <div className="relative">
          {chairsLayout}
          <button
            disabled={!table.available}
            className={cn(
              `${tableClassName} flex items-center justify-center rounded-lg transition-all duration-200 shadow-md`,
              table.available 
                ? isSelected 
                  ? "bg-hotel-gold text-white scale-110" 
                  : isHovered 
                    ? "bg-hotel-blue bg-opacity-30 text-hotel-charcoal scale-105" 
                    : "bg-white text-hotel-charcoal"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
            onClick={() => table.available && setSelectedTable(table.id)}
            onMouseEnter={() => setHoveredTable(table.id)}
            onMouseLeave={() => setHoveredTable(null)}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">{table.id}</span>
              {(isSelected || isHovered) && (
                <span className="text-xs mt-1 whitespace-nowrap">{table.seats} seats</span>
              )}
            </div>
          </button>
        </div>
      </div>
    );
  };
  
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
  
  // Render meal selection menu for lunch and dinner
  const renderMealSelectionMenu = () => {
    if (!showMealSelection || (selectedMeal !== 'lunch' && selectedMeal !== 'dinner')) {
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
  
  return (
    <div className={`min-h-screen p-6 pt-20 bg-hotel-light ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
      <LanguageToggle />
      <BackButton />
      
      <div className="max-w-lg mx-auto animate-slide-up">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-hotel-gold flex items-center justify-center mb-3">
            <Calendar className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-medium text-hotel-charcoal">
            {getTranslation('booking', language)}
          </h1>
        </div>
        
        {/* Booking type tabs */}
        <div className="glass-effect rounded-xl p-2 mb-6">
          <div className="grid grid-cols-2 gap-2">
            <button 
              className={cn(
                "py-3 rounded-lg transition-all duration-300 flex flex-col items-center justify-center",
                activeBooking === 'table' ? "bg-hotel-gold text-white" : "hover:bg-hotel-cream"
              )}
              onClick={() => setActiveBooking('table')}
            >
              <Utensils className="w-5 h-5 mb-1" />
              <span className="text-sm">{getTranslation('bookTable', language)}</span>
            </button>
            <button 
              className={cn(
                "py-3 rounded-lg transition-all duration-300 flex flex-col items-center justify-center",
                activeBooking === 'tennis' ? "bg-hotel-gold text-white" : "hover:bg-hotel-cream"
              )}
              onClick={() => setActiveBooking('tennis')}
            >
              <Calendar className="w-5 h-5 mb-1" />
              <span className="text-sm">{getTranslation('tennis', language)}</span>
            </button>
            <button 
              className={cn(
                "py-3 rounded-lg transition-all duration-300 flex flex-col items-center justify-center",
                activeBooking === 'basketball' ? "bg-hotel-gold text-white" : "hover:bg-hotel-cream"
              )}
              onClick={() => setActiveBooking('basketball')}
            >
              <Calendar className="w-5 h-5 mb-1" />
              <span className="text-sm">{getTranslation('basketball', language)}</span>
            </button>
            <button 
              className={cn(
                "py-3 rounded-lg transition-all duration-300 flex flex-col items-center justify-center",
                activeBooking === 'coffee' ? "bg-hotel-gold text-white" : "hover:bg-hotel-cream"
              )}
              onClick={() => setActiveBooking('coffee')}
            >
              <Coffee className="w-5 h-5 mb-1" />
              <span className="text-sm">{getTranslation('coffee', language)}</span>
            </button>
          </div>
        </div>
        
        {/* Booking form */}
        <div className="glass-effect rounded-xl p-6 text-start">
          {/* Restaurant booking specific */}
          {activeBooking === 'table' && (
            <div className="mb-6 animate-fade-in">
              <h3 className="font-medium mb-3">{getTranslation('bookTable', language)}</h3>
              
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
              
              <div className="bg-hotel-cream p-4 rounded-lg mb-4">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <CircleDot className="w-4 h-4 mr-1" />
                  {language === 'en' ? 'Select a table' : language === 'fa' ? 'انتخاب میز' : 'اختر طاولة'}
                </h4>
                
                {/* Restaurant Map Layout */}
                <div className="relative w-full h-[450px] bg-gray-100 rounded-lg overflow-hidden mb-2">
                  {/* Restaurant boundary */}
                  <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded-lg"></div>
                  
                  {/* Legend */}
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm text-xs z-10">
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 rounded-sm bg-white border border-gray-300 mr-2"></div>
                      <span>{language === 'en' ? 'Available' : language === 'fa' ? 'در دسترس' : 'متاح'}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 rounded-sm bg-gray-200 mr-2"></div>
                      <span>{language === 'en' ? 'Unavailable' : language === 'fa' ? 'رزرو شده' : 'محجوز'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-sm bg-hotel-gold mr-2"></div>
                      <span>{language === 'en' ? 'Selected' : language === 'fa' ? 'انتخاب شده' : 'مختار'}</span>
                    </div>
                  </div>
                  
                  {/* Render tables */}
                  {restaurantTables.map(table => renderTable(table))}
                </div>
                
                {/* Selected table info */}
                {selectedTable && (
                  <div className="text-sm text-center p-2 bg-white rounded-lg shadow-sm mt-3 animate-fade-in">
                    {language === 'en' 
                      ? `Table ${selectedTable} selected (${restaurantTables.find(t => t.id === selectedTable)?.seats} seats)`
                      : language === 'fa'
                        ? `میز ${selectedTable} انتخاب شده (${restaurantTables.find(t => t.id === selectedTable)?.seats} صندلی)`
                        : `تم اختيار الطاولة ${selectedTable} (${restaurantTables.find(t => t.id === selectedTable)?.seats} مقاعد)`
                    }
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Time selection for all booking types */}
          <div className="mb-6 animate-fade-in">
            <h3 className="font-medium mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Select time' : language === 'fa' ? 'انتخاب زمان' : 'حدد الوقت'}
            </h3>
            <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
              {timeSlots.map((
