
import React from 'react';
import { Wifi } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';

const WifiPage = () => {
  const { language, direction } = useLanguage();
  
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

  return (
    <div className={`min-h-screen p-6 pt-20 bg-hotel-light ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
      <LanguageToggle />
      <BackButton />
      
      <div className="max-w-lg mx-auto animate-slide-up">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-hotel-gold flex items-center justify-center mb-3">
            <Wifi className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-medium text-hotel-charcoal">
            {getTranslation('wifi', language)}
          </h1>
        </div>
        
        {/* WiFi credentials */}
        <div className="glass-effect rounded-xl p-6 mb-6 text-start">
          <div className="mb-4">
            <p className="text-sm text-hotel-charcoal opacity-70 mb-1">
              {getTranslation('wifiUsername', language)}
            </p>
            <p className="text-lg font-medium select-all">{wifiData.username}</p>
          </div>
          <div>
            <p className="text-sm text-hotel-charcoal opacity-70 mb-1">
              {getTranslation('wifiPassword', language)}
            </p>
            <p className="text-lg font-medium select-all">{wifiData.password}</p>
          </div>
        </div>
        
        {/* Connection instructions */}
        <div className="glass-effect rounded-xl p-6 text-start">
          <h2 className="text-lg font-medium mb-4">
            {getTranslation('wifiInstructions', language)}
          </h2>
          <ol className="space-y-2 list-decimal list-inside">
            {wifiData.steps[language].map((step, index) => (
              <li key={index} className="text-hotel-charcoal">{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default WifiPage;
