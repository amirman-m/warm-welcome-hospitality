
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'fa' | 'ar'>('fa');
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cycle through languages
  useEffect(() => {
    const languages: ('en' | 'fa' | 'ar')[] = ['fa', 'en', 'ar'];
    let currentIndex = languages.indexOf(activeLanguage);
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % languages.length;
      setActiveLanguage(languages[currentIndex]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [activeLanguage]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Create ripple effect at click position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setRipple({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
      
      // Navigate after ripple animation
      setTimeout(() => navigate('/main'), 500);
    }
  };

  // Remove ripple effect after animation completes
  useEffect(() => {
    if (ripple) {
      const timer = setTimeout(() => setRipple(null), 800);
      return () => clearTimeout(timer);
    }
  }, [ripple]);

  return (
    <div 
      ref={containerRef}
      className="h-full w-full relative overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Background hotel image with overlay */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Luxury Hotel" 
          className="object-cover w-full h-full opacity-80 animate-fade-in"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      
      {/* Welcome text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="language-cycle-container px-6 w-full max-w-lg">
          {/* English */}
          <div className={`language-text ${activeLanguage === 'en' ? 'active' : ''}`}>
            <h1 className="text-white font-inter font-light text-3xl sm:text-4xl mb-2">
              {getTranslation('welcome', 'en')}
            </h1>
            <h2 className="text-white font-inter font-bold text-4xl sm:text-5xl">
              {getTranslation('toHotel', 'en')}
            </h2>
          </div>
          
          {/* Persian */}
          <div className={`language-text ${activeLanguage === 'fa' ? 'active' : ''}`}>
            <h1 className="text-white font-vazirmatn font-light text-3xl sm:text-4xl mb-2">
              {getTranslation('welcome', 'fa')}
            </h1>
            <h2 className="text-white font-vazirmatn font-bold text-4xl sm:text-5xl">
              {getTranslation('toHotel', 'fa')}
            </h2>
          </div>
          
          {/* Arabic */}
          <div className={`language-text ${activeLanguage === 'ar' ? 'active' : ''}`}>
            <h1 className="text-white font-vazirmatn font-light text-3xl sm:text-4xl mb-2">
              {getTranslation('welcome', 'ar')}
            </h1>
            <h2 className="text-white font-vazirmatn font-bold text-4xl sm:text-5xl">
              {getTranslation('toHotel', 'ar')}
            </h2>
          </div>
        </div>
        
        {/* Subtle indicator to tap */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center animate-bounce-subtle">
            <div className="w-6 h-6 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
      
      {/* Ripple effect */}
      {ripple && (
        <div 
          className="ripple"
          style={{ 
            left: ripple.x + 'px', 
            top: ripple.y + 'px',
          }} 
        />
      )}
    </div>
  );
};

export default Index;
