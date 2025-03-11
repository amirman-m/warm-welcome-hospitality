
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface BookNowButtonProps {
  onClick: () => void;
}

const BookNowButton: React.FC<BookNowButtonProps> = ({ onClick }) => {
  const { language } = useLanguage();
  
  return (
    <button
      className="w-full bg-hotel-gold text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all active:scale-95"
      onClick={onClick}
    >
      {language === 'en' ? 'Book Now' : language === 'fa' ? 'رزرو کن' : 'احجز الآن'}
    </button>
  );
};

export default BookNowButton;
