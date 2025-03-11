
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface TimeSelectionProps {
  timeSlots: string[];
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({
  timeSlots,
  selectedTime,
  setSelectedTime
}) => {
  const { language } = useLanguage();

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

  return (
    <div className="mb-6 animate-fade-in">
      <h3 className="font-medium mb-3 flex items-center">
        <Clock className="w-4 h-4 mr-2" />
        {getTranslation('selectTime', language)}
      </h3>
      <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
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
            {formatTimeSlot(time)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection;
