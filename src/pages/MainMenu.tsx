
import React from 'react';
import { Wifi, Info, Calendar, Car, Workflow, PhoneCall, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import FeatureCard from '@/components/FeatureCard';

const MainMenu = () => {
  const { language, direction } = useLanguage();

  // Function to get welcome message based on selected language
  const getWelcomeMessage = () => {
    if (language === 'fa') {
      return 'خوش آمدید، آقای علی قاسمی';
    } else if (language === 'ar') {
      return 'مرحباً، السيد علي قاسمي';
    } else {
      return 'Welcome, Mr. Ali Ghasemi';
    }
  };

  return (
    <div 
      className={`min-h-screen p-6 ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'} relative`}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625')",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-0" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        <LanguageToggle />
        
        {/* Welcome message replacing hotel logo and name */}
        <div className="mt-10 mb-8 flex flex-col items-center animate-slide-down">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-3 shadow-lg">
            <span className="text-white text-2xl font-bold">AG</span>
          </div>
          <h1 className="text-2xl font-medium text-white drop-shadow-md">
            {getWelcomeMessage()}
          </h1>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in">
          <FeatureCard 
            icon={Wifi}
            title={getTranslation('wifi', language)}
            route="/wifi"
          />
          <FeatureCard 
            icon={Info}
            title={getTranslation('information', language)}
            route="/information"
          />
          <FeatureCard 
            icon={Calendar}
            title={getTranslation('booking', language)}
            route="/booking"
          />
          <FeatureCard 
            icon={Car}
            title={getTranslation('taxi', language)}
            route="/taxi"
          />
          <FeatureCard 
            icon={Workflow}
            title={getTranslation('cleaning', language)}
            route="/cleaning"
          />
          <FeatureCard 
            icon={PhoneCall}
            title={getTranslation('desk', language)}
            route="/desk"
          />
          <FeatureCard 
            icon={MessageSquare}
            title={getTranslation('chat', language)}
            route="/chat"
            className="col-span-2 md:col-span-3"
          />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
