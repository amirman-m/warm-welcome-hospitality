
import React from 'react';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type PickupTimeOption = 'now' | '15min' | '30min' | '1hour' | 'custom';

interface TimeSelectionSectionProps {
  pickupTimeOption: PickupTimeOption;
  setPickupTimeOption: (option: PickupTimeOption) => void;
  customDate: Date | undefined;
  setCustomDate: (date: Date | undefined) => void;
  customTime: string;
  setCustomTime: (time: string) => void;
  showTimeSelect: boolean;
  setShowTimeSelect: (show: boolean) => void;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
}

const TimeSelectionSection: React.FC<TimeSelectionSectionProps> = ({
  pickupTimeOption,
  setPickupTimeOption,
  customDate,
  setCustomDate,
  customTime,
  setCustomTime,
  showTimeSelect,
  setShowTimeSelect,
  showCalendar,
  setShowCalendar
}) => {
  const { language } = useLanguage();
  
  // Generate time slots for the dropdown
  const timeSlots = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      timeSlots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }
  }
  
  const handleTimeOptionSelect = (option: PickupTimeOption) => {
    setPickupTimeOption(option);
    if (option === 'custom') {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
      setShowTimeSelect(false);
    }
  };
  
  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-medium mb-3 flex justify-between">
        {getTranslation('pickupTime', language)}
      </h2>
      
      {/* Time options */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <Button
          variant={pickupTimeOption === 'now' ? "default" : "outline"}
          className={cn(
            pickupTimeOption === 'now' ? "bg-hotel-gold text-white" : "border-gray-200"
          )}
          onClick={() => handleTimeOptionSelect('now')}
        >
          {getTranslation('now', language)}
        </Button>
        
        <Button
          variant={pickupTimeOption === '15min' ? "default" : "outline"}
          className={cn(
            pickupTimeOption === '15min' ? "bg-hotel-gold text-white" : "border-gray-200"
          )}
          onClick={() => handleTimeOptionSelect('15min')}
        >
          {getTranslation('fifteenMinutes', language)}
        </Button>
        
        <Button
          variant={pickupTimeOption === '30min' ? "default" : "outline"}
          className={cn(
            pickupTimeOption === '30min' ? "bg-hotel-gold text-white" : "border-gray-200"
          )}
          onClick={() => handleTimeOptionSelect('30min')}
        >
          {getTranslation('thirtyMinutes', language)}
        </Button>
        
        <Button
          variant={pickupTimeOption === '1hour' ? "default" : "outline"}
          className={cn(
            pickupTimeOption === '1hour' ? "bg-hotel-gold text-white" : "border-gray-200"
          )}
          onClick={() => handleTimeOptionSelect('1hour')}
        >
          {getTranslation('oneHour', language)}
        </Button>
        
        <Button
          variant={pickupTimeOption === 'custom' ? "default" : "outline"}
          className={cn(
            "col-span-2",
            pickupTimeOption === 'custom' ? "bg-hotel-gold text-white" : "border-gray-200"
          )}
          onClick={() => handleTimeOptionSelect('custom')}
        >
          {getTranslation('customTime', language)}
        </Button>
      </div>
      
      {/* Custom date and time selection */}
      {showCalendar && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <div>
            <h3 className="text-sm font-medium mb-2">
              {getTranslation('selectDate', language)}
            </h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border-gray-200 text-gray-700"
                >
                  {customDate ? format(customDate, 'PPP') : getTranslation('selectDate', language)}
                  <Clock className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={customDate}
                  onSelect={setCustomDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">
              {getTranslation('selectTime', language)}
            </h3>
            <Popover open={showTimeSelect} onOpenChange={setShowTimeSelect}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border-gray-200 text-gray-700"
                >
                  {customTime || getTranslation('selectTime', language)}
                  <Clock className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-0 max-h-60 overflow-y-auto">
                <div className="py-1">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        setCustomTime(time);
                        setShowTimeSelect(false);
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSelectionSection;
