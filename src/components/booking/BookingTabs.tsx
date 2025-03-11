
import React from 'react';
import { Calendar, Coffee, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTranslation } from '@/utils/translations';
import { useLanguage } from '@/context/LanguageContext';

type ActivityType = 'table' | 'tennis' | 'basketball' | 'coffee';

interface BookingTabsProps {
  activeBooking: ActivityType;
  setActiveBooking: (activity: ActivityType) => void;
}

const BookingTabs: React.FC<BookingTabsProps> = ({
  activeBooking,
  setActiveBooking
}) => {
  const { language } = useLanguage();

  return (
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
  );
};

export default BookingTabs;
