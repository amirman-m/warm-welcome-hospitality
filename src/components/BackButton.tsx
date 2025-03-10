
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { Button } from '@/components/ui/button';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const { language, direction } = useLanguage();
  
  const handleBackClick = () => {
    console.log("Back button clicked, navigating to /main");
    navigate('/main');
  };

  return (
    <Button 
      onClick={handleBackClick}
      className="flex items-center glass-effect px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 absolute top-6 left-6 z-10"
      aria-label="Back to menu"
      variant="ghost"
    >
      {direction === 'ltr' ? (
        <ChevronLeft className="w-4 h-4 mr-1" />
      ) : (
        <ChevronRight className="w-4 h-4 ml-1" />
      )}
      <span className="text-sm font-medium">
        {getTranslation('backToMenu', language)}
      </span>
    </Button>
  );
};

export default BackButton;
