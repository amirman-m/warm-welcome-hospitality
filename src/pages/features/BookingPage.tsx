
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { restaurantTables } from '@/components/booking/BookingData';

// Components
import TableSelection from '@/components/booking/TableSelection';
import TimeSelection from '@/components/booking/TimeSelection';
import MealTypeSelector from '@/components/booking/MealTypeSelector';
import MealSelection from '@/components/booking/MealSelection';
import BookingTabs from '@/components/booking/BookingTabs';
import BookingHeader from '@/components/booking/BookingHeader';
import DateSelection from '@/components/booking/DateSelection';
import MealSelectionToggle from '@/components/booking/MealSelectionToggle';
import BookNowButton from '@/components/booking/BookNowButton';

// Hooks and utils
import { useBooking } from '@/hooks/useBooking';
import { handleBooking } from '@/utils/bookingUtils';

const BookingPage = () => {
  const { language, direction } = useLanguage();
  const {
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
  } = useBooking();

  const resetSelections = () => {
    setSelectedTable(null);
    setSelectedTime('');
    setShowMealSelection(false);
  };

  const handleBook = () => {
    return handleBooking(
      language,
      activeBooking,
      selectedDate,
      selectedTime,
      selectedTable,
      selectedMeal,
      showMealSelection,
      getTotalSelectedItems,
      restaurantTables,
      resetSelections
    );
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
          {/* Restaurant booking specific - Meal type selector */}
          {activeBooking === 'table' && (
            <div className="mb-6 animate-fade-in">
              <h3 className="font-medium mb-3">{getTranslation('bookTable', language)}</h3>
              
              <MealTypeSelector 
                selectedMeal={selectedMeal} 
                setSelectedMeal={setSelectedMeal} 
              />
            </div>
          )}
          
          {/* Step 1: Date selection for all booking types */}
          <DateSelection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          
          {/* Step 2: Time selection for all booking types */}
          <TimeSelection 
            timeSlots={timeSlots} 
            selectedTime={selectedTime} 
            setSelectedTime={setSelectedTime} 
          />
          
          {/* Step 3: Table selection for restaurant bookings */}
          {activeBooking === 'table' && selectedTime && (
            <TableSelection 
              tables={restaurantTables} 
              selectedTable={selectedTable} 
              setSelectedTable={setSelectedTable} 
            />
          )}
          
          {/* Meal pre-selection toggle button for lunch and dinner */}
          {activeBooking === 'table' && 
           selectedTime && 
           selectedTable &&
           (selectedMeal === 'lunch' || selectedMeal === 'dinner') && (
            <MealSelectionToggle
              showMealSelection={showMealSelection}
              setShowMealSelection={setShowMealSelection}
            />
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
          <BookNowButton onClick={handleBook} bookingType={activeBooking} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
