
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { Button } from '@/components/ui/button';

interface PassengerSectionProps {
  passengerCount: number;
  setPassengerCount: (value: number) => void;
}

const PassengerSection: React.FC<PassengerSectionProps> = ({
  passengerCount,
  setPassengerCount
}) => {
  const { language } = useLanguage();
  
  const togglePassengerCount = (increment: boolean) => {
    if (increment) {
      setPassengerCount(Math.min(passengerCount + 1, 10));
    } else {
      setPassengerCount(Math.max(passengerCount - 1, 1));
    }
  };
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-3">
        {getTranslation('passengerCount', language)}
      </h2>
      
      <div className="relative">
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <span>
            {passengerCount} {getTranslation(passengerCount === 1 ? 'passenger' : 'passengers', language)}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-gray-200"
              onClick={() => togglePassengerCount(false)}
              disabled={passengerCount <= 1}
            >
              -
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-gray-200"
              onClick={() => togglePassengerCount(true)}
              disabled={passengerCount >= 10}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerSection;
