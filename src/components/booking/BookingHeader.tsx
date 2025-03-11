
import React from 'react';
import { Calendar } from 'lucide-react';
import { getTranslation } from '@/utils/translations';
import { useLanguage } from '@/context/LanguageContext';

const BookingHeader: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-16 h-16 rounded-full bg-hotel-gold flex items-center justify-center mb-3">
        <Calendar className="text-white w-8 h-8" />
      </div>
      <h1 className="text-2xl font-medium text-hotel-charcoal">
        {getTranslation('booking', language)}
      </h1>
    </div>
  );
};

export default BookingHeader;
