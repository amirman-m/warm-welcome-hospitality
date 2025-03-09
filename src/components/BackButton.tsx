
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const { language, direction } = useLanguage();
  
  const goBack = () => {
    navigate('/main');
  };

  return (
    <button 
      onClick={goBack}
      className="flex items-center glass-effect px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 absolute top-6 left-6 z-10"
    >
      {direction === 'ltr' ? (
        <ChevronLeft className="w-4 h-4 mr-1" />
      ) : (
        <ChevronRight className="w-4 h-4 ml-1" />
      )}
      <span className="text-sm font-medium">
        {getTranslation('backToMenu', language)}
      </span>
    </button>
  );
};

export default BackButton;
