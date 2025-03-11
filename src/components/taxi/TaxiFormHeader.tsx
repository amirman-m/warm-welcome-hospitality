
import React from 'react';
import { Car } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';

const TaxiFormHeader: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-gray-800 mb-1">
          {getTranslation('requestTaxi', language)}
        </h1>
        <p className="text-sm text-gray-600">
          {getTranslation('bookTaxiSubtitle', language)}
        </p>
      </div>
      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
        <Car className="text-amber-600 w-6 h-6" />
      </div>
    </div>
  );
};

export default TaxiFormHeader;
