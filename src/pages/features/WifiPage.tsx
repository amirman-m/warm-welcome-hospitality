
import React, { useState, useEffect } from 'react';
import { Wifi, Key, LockKeyhole, Info, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { cn } from '@/lib/utils';

const WifiPage = () => {
  const { language, direction } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const wifiBackgroundImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
  
  const wifiData = {
    username: 'LuxuryHotel_Guest',
    password: 'Welcome2023',
    steps: {
      en: [
        "Open your device's Wi-Fi settings",
        'Select "LuxuryHotel_Guest" from the available networks',
        'Enter the password provided below',
        'Open your browser and navigate to any website',
        'If a login page appears, enter your room number and last name'
      ],
      fa: [
        'تنظیمات وای‌فای دستگاه خود را باز کنید',
        'از شبکه‌های موجود، "LuxuryHotel_Guest" را انتخاب کنید',
        'رمز عبور ارائه شده در زیر را وارد کنید',
        'مرورگر خود را باز کنید و به هر وب‌سایتی بروید',
        'اگر صفحه ورود ظاهر شد، شماره اتاق و نام خانوادگی خود را وارد کنید'
      ],
      ar: [
        'افتح إعدادات Wi-Fi على جهازك',
        'اختر "LuxuryHotel_Guest" من الشبكات المتاحة',
        'أدخل كلمة المرور المقدمة أدناه',
        'افتح المتصفح وانتقل إلى أي موقع إلكتروني',
        'إذا ظهرت صفحة تسجيل الدخول، أدخل رقم غرفتك واسم عائلتك'
      ]
    }
  };

  // Preload the WiFi background image
  useEffect(() => {
    const img = new Image();
    img.src = wifiBackgroundImage;
    img.onload = () => {
      console.log("WiFi background image loaded successfully");
      setImageLoaded(true);
    };
    img.onerror = (err) => {
      console.error("Failed to load WiFi background image:", err);
      // Fallback to show content even if image fails to load
      setImageLoaded(true);
    };
  }, []);

  // Timer to show WiFi details after 5 seconds
  useEffect(() => {
    if (imageLoaded) {
      console.log("Starting 5-second timer to show WiFi details...");
      const timer = setTimeout(() => {
        console.log("Timer complete - Showing WiFi details");
        setShowDetails(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  // Add console log to verify navigation works
  useEffect(() => {
    console.log("WiFi page mounted - navigation should be working");
    
    return () => {
      console.log("WiFi page unmounting");
    };
  }, []);

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col relative overflow-hidden p-6 pt-20",
        direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'
      )}
      style={{
        backgroundImage: imageLoaded ? `url(${wifiBackgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      
      {/* Navigation controls - moved to separate div with higher z-index */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <BackButton />
        </div>
        <div className="pointer-events-auto">
          <LanguageToggle />
        </div>
      </div>
      
      {/* Header */}
      <div className="relative z-10 flex flex-col items-center mt-4 mb-8 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-hotel-gold flex items-center justify-center mb-4">
          <Wifi className="text-white w-10 h-10" />
        </div>
        <h1 className="text-3xl font-semibold text-white">
          {getTranslation('wifi', language)}
        </h1>
      </div>
      
      {/* Loading indicator (shows for 5 seconds) */}
      {!showDetails && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-hotel-gold border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white text-lg">
            {getTranslation('loadingWifi', language)}
          </p>
        </div>
      )}
      
      {/* WiFi details (appears after 5 seconds) */}
      {showDetails && (
        <div className={cn(
          "relative z-10 flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full",
          showDetails ? "animate-slide-up" : "opacity-0"
        )}>
          {/* WiFi credentials */}
          <div className="glass-effect rounded-xl p-8 mb-6 w-full">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Wifi className="text-hotel-gold w-5 h-5 mr-2" />
                <p className="text-sm text-white opacity-70">
                  {getTranslation('wifiUsername', language)}
                </p>
              </div>
              <div className="bg-black/30 rounded-lg p-3 flex justify-between items-center">
                <p className="text-xl font-medium text-white select-all">{wifiData.username}</p>
                <button 
                  className="text-hotel-gold hover:text-white transition-colors"
                  onClick={() => navigator.clipboard.writeText(wifiData.username)}
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Key className="text-hotel-gold w-5 h-5 mr-2" />
                <p className="text-sm text-white opacity-70">
                  {getTranslation('wifiPassword', language)}
                </p>
              </div>
              <div className="bg-black/30 rounded-lg p-3 flex justify-between items-center">
                <p className="text-xl font-medium text-white select-all">{wifiData.password}</p>
                <button 
                  className="text-hotel-gold hover:text-white transition-colors"
                  onClick={() => navigator.clipboard.writeText(wifiData.password)}
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Connection instructions */}
          <div className="glass-effect rounded-xl p-8 w-full">
            <div className="flex items-center mb-4">
              <LockKeyhole className="text-hotel-gold w-5 h-5 mr-2" />
              <h2 className="text-xl font-medium text-white">
                {getTranslation('wifiInstructions', language)}
              </h2>
            </div>
            <ol className="space-y-3 list-none">
              {wifiData.steps[language].map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-hotel-gold text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-white text-start">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default WifiPage;
