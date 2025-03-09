
import React, { useState } from 'react';
import { Calendar, Coffee, Utensils, Clock, CircleDot } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

type MealType = 'breakfast' | 'lunch' | 'dinner';
type ActivityType = 'table' | 'tennis' | 'basketball' | 'coffee';

const BookingPage = () => {
  const { language, direction } = useLanguage();
  const [activeBooking, setActiveBooking] = useState<'table' | 'tennis' | 'basketball' | 'coffee'>('table');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  
  const tables = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    available: ![2, 5, 8, 11].includes(i + 1), // Some tables are unavailable
  }));
  
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
  ];
  
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
        successMessage += ` (${getMealName(selectedMeal, 'en')}, Table ${selectedTable})`;
      }
    } else if (language === 'fa') {
      successMessage = `${getActivityName(activeBooking, 'fa')} شما برای ساعت ${selectedTime} رزرو شد`;
      if (activeBooking === 'table') {
        successMessage += ` (${getMealName(selectedMeal, 'fa')}، میز ${selectedTable})`;
      }
    } else {
      successMessage = `تم حجز ${getActivityName(activeBooking, 'ar')} الخاص بك للساعة ${selectedTime}`;
      if (activeBooking === 'table') {
        successMessage += ` (${getMealName(selectedMeal, 'ar')}، طاولة ${selectedTable})`;
      }
    }
    
    toast({
      title: successMessage,
    });
    
    // Reset selection
    setSelectedTable(null);
    setSelectedTime('');
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
                <div className="grid grid-cols-4 gap-2">
                  {tables.map((table) => (
                    <button
                      key={table.id}
                      disabled={!table.available}
                      className={cn(
                        "h-12 rounded-md flex items-center justify-center transition-all",
                        table.available 
                          ? selectedTable === table.id 
                            ? "bg-hotel-gold text-white"
                            : "bg-white hover:bg-hotel-blue hover:text-white" 
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      )}
                      onClick={() => table.available && setSelectedTable(table.id)}
                    >
                      {table.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Time selection for all booking types */}
          <div className="mb-6 animate-fade-in">
            <h3 className="font-medium mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Select time' : language === 'fa' ? 'انتخاب زمان' : 'حدد الوقت'}
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={cn(
                    "py-2 px-1 rounded-md text-sm transition-all",
                    selectedTime === time 
                      ? "bg-hotel-gold text-white" 
                      : "bg-white hover:bg-hotel-blue hover:text-white"
                  )}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          
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
