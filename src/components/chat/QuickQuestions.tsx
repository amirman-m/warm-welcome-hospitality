
import React from 'react';
import { Clock, Wifi, Car } from 'lucide-react';
import { getTranslation } from '@/utils/translations';
import { useLanguage } from '@/context/LanguageContext';

interface QuickQuestionsProps {
  onQuestionClick: (questionKey: 'breakfastTimeQuestion' | 'wifiQuestion' | 'taxiQuestion' | 'checkoutTimeQuestion') => void;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ onQuestionClick }) => {
  const { language } = useLanguage();

  return (
    <div className="mt-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onQuestionClick('breakfastTimeQuestion')}
          className="flex items-center gap-2 text-start p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-hotel-gold/10 flex items-center justify-center">
            <Clock className="w-3 h-3 text-hotel-gold" />
          </div>
          <span className="text-hotel-charcoal text-sm">
            {getTranslation('breakfastTimeQuestion', language)}
          </span>
        </button>
        
        <button
          onClick={() => onQuestionClick('wifiQuestion')}
          className="flex items-center gap-2 text-start p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-hotel-gold/10 flex items-center justify-center">
            <Wifi className="w-3 h-3 text-hotel-gold" />
          </div>
          <span className="text-hotel-charcoal text-sm">
            {getTranslation('wifiQuestion', language)}
          </span>
        </button>
        
        <button
          onClick={() => onQuestionClick('taxiQuestion')}
          className="flex items-center gap-2 text-start p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-hotel-gold/10 flex items-center justify-center">
            <Car className="w-3 h-3 text-hotel-gold" />
          </div>
          <span className="text-hotel-charcoal text-sm">
            {getTranslation('taxiQuestion', language)}
          </span>
        </button>
        
        <button
          onClick={() => onQuestionClick('checkoutTimeQuestion')}
          className="flex items-center gap-2 text-start p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-hotel-gold/10 flex items-center justify-center">
            <Clock className="w-3 h-3 text-hotel-gold" />
          </div>
          <span className="text-hotel-charcoal text-sm">
            {getTranslation('checkoutTimeQuestion', language)}
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuickQuestions;
