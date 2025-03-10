
import React, { useState, useEffect } from 'react';
import { Calendar, Coffee, Utensils, Clock, CircleDot } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import DynamicBackground from '@/components/DynamicBackground';

type MealType = 'breakfast' | 'lunch' | 'dinner';
type ActivityType = 'table' | 'tennis' | 'basketball' | 'coffee';

const BookingPage = () => {
  const { language, direction } = useLanguage();
  const [activeBooking, setActiveBooking] = useState<'table' | 'tennis' | 'basketball' | 'coffee'>('table');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);
  
  const tables = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    available: ![2, 5, 8, 11].includes(i + 1), // Some tables are unavailable
  }));
  
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
    <DynamicBackground>
      <div className={`min-h-screen ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
        <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <BackButton />
          </div>
          <div className="pointer-events-auto">
            <LanguageToggle />
          </div>
        </div>
        
        {!showContent ? (
          <div className="flex-1 flex items-center justify-center min-h-screen">
            <div className="text-center animate-pulse p-6 glass-effect rounded-2xl max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-full bg-hotel-gold mx-auto flex items-center justify-center mb-4">
                <Calendar className="text-white w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {getTranslation('booking', language)}
              </h1>
              <p className="text-white/80">
                {getTranslation('loadingBooking', language) || 'Loading booking options...'}
              </p>
            </div>
          </div>
        ) : (
          <div className="pt-24 px-6 pb-6 animate-slide-up max-w-lg mx-auto">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-hotel-gold flex items-center justify-center mb-3">
                <Calendar className="text-white w-8 h-8" />
              </div>
              <h1 className="text-2xl font-medium text-white">
                {getTranslation('booking', language)}
              </h1>
            </div>
            
            <div className="glass-effect rounded-xl p-2 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className={cn(
                    "py-3 rounded-lg transition-all duration-300 flex flex-col items-center justify-center",
                    activeBooking === 'table' 
                      ? 'bg-hotel-gold text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  )}
                  onClick={() => setActiveBooking('table')}
                >
                  <Utensils className="w-6 h-6 mb-1" />
                  <span>{getTranslation('bookTable', language)}</span>
                </button>
                
                <button 
                  className={cn(
                    "py-3 rounded-lg transition-all duration-300 flex flex-col items-center justify-center",
                    activeBooking === 'coffee' 
                      ? 'bg-hotel-gold text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  )}
                  onClick={() => setActiveBooking('coffee')}
                >
                  <Coffee className="w-6 h-6 mb-1" />
                  <span>{getTranslation('coffee', language)}</span>
                </button>
              </div>
            </div>
            
            {activeBooking === 'table' && (
              <div className="glass-effect rounded-xl p-5 mb-6">
                <h2 className="font-medium text-white mb-3">
                  {getTranslation('selectMeal', language)}
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className={cn(
                      "py-2 px-3 rounded-lg text-sm transition-all",
                      selectedMeal === 'breakfast'
                        ? 'bg-hotel-gold text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    )}
                    onClick={() => setSelectedMeal('breakfast')}
                  >
                    {getTranslation('breakfast', language)}
                  </button>
                  <button
                    className={cn(
                      "py-2 px-3 rounded-lg text-sm transition-all",
                      selectedMeal === 'lunch'
                        ? 'bg-hotel-gold text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    )}
                    onClick={() => setSelectedMeal('lunch')}
                  >
                    {getTranslation('lunch', language)}
                  </button>
                  <button
                    className={cn(
                      "py-2 px-3 rounded-lg text-sm transition-all",
                      selectedMeal === 'dinner'
                        ? 'bg-hotel-gold text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    )}
                    onClick={() => setSelectedMeal('dinner')}
                  >
                    {getTranslation('dinner', language)}
                  </button>
                </div>
              </div>
            )}
            
            <div className="glass-effect rounded-xl p-5 mb-6">
              <h2 className="font-medium text-white mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {getTranslation('selectTime', language)}
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={cn(
                      "py-2 rounded-lg text-sm transition-all",
                      selectedTime === time
                        ? 'bg-hotel-gold text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    )}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            
            {activeBooking === 'table' && (
              <div className="glass-effect rounded-xl p-5 mb-6">
                <h2 className="font-medium text-white mb-3 flex items-center">
                  <CircleDot className="w-5 h-5 mr-2" />
                  {getTranslation('selectTable', language)}
                </h2>
                <div className="grid grid-cols-4 gap-2">
                  {tables.map((table) => (
                    <button
                      key={table.id}
                      disabled={!table.available}
                      className={cn(
                        "relative py-2 rounded-lg text-sm transition-all",
                        selectedTable === table.id
                          ? 'bg-hotel-gold text-white'
                          : table.available
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-gray-400/20 text-gray-400 cursor-not-allowed'
                      )}
                      onClick={() => table.available && setSelectedTable(table.id)}
                    >
                      {table.id}
                      {!table.available && (
                        <span className="absolute inset-0 flex items-center justify-center text-xs">
                          {getTranslation('booked', language)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button
              className="w-full bg-hotel-gold text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all active:scale-95"
              onClick={handleBook}
            >
              {getTranslation('book', language)}
            </button>
          </div>
        )}
      </div>
    </DynamicBackground>
  );
};

export default BookingPage;
