
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import BookingConfirmation from './BookingConfirmation';

interface BookNowButtonProps {
  onClick: () => boolean | void; // Return boolean to indicate if booking was successful
  bookingType?: string;
}

const BookNowButton: React.FC<BookNowButtonProps> = ({ onClick, bookingType = 'table' }) => {
  const { language } = useLanguage();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  
  const handleClick = () => {
    // Call the original onClick handler
    const result = onClick();
    
    // If the booking was successful (or onClick doesn't return a value)
    if (result !== false) {
      // Generate a random 5-digit number
      const code = Math.floor(10000 + Math.random() * 90000).toString();
      setConfirmationCode(code);
      setShowConfirmation(true);
    }
  };
  
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };
  
  return (
    <>
      <button
        className="w-full bg-hotel-gold text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all active:scale-95"
        onClick={handleClick}
      >
        {language === 'en' ? 'Book Now' : language === 'fa' ? 'رزرو کن' : 'احجز الآن'}
      </button>
      
      {showConfirmation && (
        <BookingConfirmation 
          bookingType={bookingType} 
          confirmationCode={confirmationCode}
          onClose={handleCloseConfirmation}
        />
      )}
    </>
  );
};

export default BookNowButton;
