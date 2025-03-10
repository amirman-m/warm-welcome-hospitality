
import React, { useState } from 'react';
import { Workflow, PhoneCall, CalendarClock, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const CleaningPage = () => {
  const { language, direction } = useLanguage();
  const [dailyCleaning, setDailyCleaning] = useState(true);
  const [selectedTime, setSelectedTime] = useState('');
  
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];
  
  const handleCallCleaning = () => {
    toast({
      title: language === 'en' ? 'Cleaning Request Sent' : 
             language === 'fa' ? 'درخواست نظافت ارسال شد' : 
             'تم إرسال طلب التنظيف',
      description: language === 'en' ? 'Cleaning crew will arrive shortly' : 
                   language === 'fa' ? 'خدمه نظافت به زودی خواهند رسید' : 
                   'سيصل طاقم التنظيف قريباً',
    });
  };
  
  const handleScheduleCleaning = () => {
    if (!selectedTime) {
      toast({
        title: language === 'en' ? 'Please select a time' : 
               language === 'fa' ? 'لطفا زمان را انتخاب کنید' : 
               'الرجاء تحديد وقت',
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: language === 'en' ? 'Cleaning Scheduled' : 
             language === 'fa' ? 'نظافت زمان‌بندی شد' : 
             'تم جدولة التنظيف',
      description: language === 'en' ? `Cleaning scheduled for ${selectedTime}` : 
                   language === 'fa' ? `نظافت برای ساعت ${selectedTime} زمان‌بندی شد` : 
                   `تم جدولة التنظيف في الساعة ${selectedTime}`,
    });
    
    setSelectedTime('');
  };
  
  const toggleDailyCleaning = () => {
    setDailyCleaning(!dailyCleaning);
    
    toast({
      title: !dailyCleaning ? 
             (language === 'en' ? 'Daily Cleaning Activated' : 
              language === 'fa' ? 'نظافت روزانه فعال شد' : 
              'تم تنشيط التنظيف اليومي') :
             (language === 'en' ? 'Daily Cleaning Deactivated' : 
              language === 'fa' ? 'نظافت روزانه غیرفعال شد' : 
              'تم إلغاء تنشيط التنظيف اليومي'),
    });
  };
  
  return (
    <div className={`min-h-screen p-6 pt-20 bg-hotel-light ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
      <LanguageToggle />
      <BackButton />
      
      <div className="max-w-lg mx-auto animate-slide-up">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-hotel-gold flex items-center justify-center mb-3">
            <Workflow className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-medium text-hotel-charcoal">
            {getTranslation('cleaning', language)}
          </h1>
        </div>
        
        {/* Cleaning options */}
        <div className="space-y-4">
          {/* Call cleaning crew */}
          <div 
            className="glass-effect rounded-xl p-6 flex justify-between items-center hover:shadow-md transition-all cursor-pointer active:scale-98"
            onClick={handleCallCleaning}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-hotel-blue bg-opacity-10 flex items-center justify-center mr-4">
                <PhoneCall className="text-hotel-blue w-5 h-5" />
              </div>
              <div className="text-start">
                <h3 className="font-medium">{getTranslation('callCleaning', language)}</h3>
                <p className="text-xs text-hotel-charcoal text-opacity-70">
                  {language === 'en' ? 'Request immediate room cleaning' : 
                   language === 'fa' ? 'درخواست نظافت فوری اتاق' : 
                   'طلب تنظيف فوري للغرفة'}
                </p>
              </div>
            </div>
            <div className="bg-hotel-gold text-white w-8 h-8 rounded-full flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          
          {/* Schedule cleaning */}
          <div className="glass-effect rounded-xl p-6 text-start">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-hotel-blue bg-opacity-10 flex items-center justify-center mr-4">
                <CalendarClock className="text-hotel-blue w-5 h-5" />
              </div>
              <h3 className="font-medium">{getTranslation('scheduleTime', language)}</h3>
            </div>
            
            <div className="mb-4">
              <p className="text-xs text-hotel-charcoal text-opacity-70 mb-3">
                {language === 'en' ? 'Select preferred cleaning time' : 
                 language === 'fa' ? 'زمان ترجیحی نظافت را انتخاب کنید' : 
                 'حدد وقت التنظيف المفضل'}
              </p>
              <div className="grid grid-cols-5 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={cn(
                      "py-2 rounded-md text-sm transition-all",
                      selectedTime === time 
                        ? "bg-hotel-gold text-white" 
                        : "bg-white hover:bg-hotel-blue hover:text-white"
                    )}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              className="w-full bg-hotel-gold text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all active:scale-95"
              onClick={handleScheduleCleaning}
            >
              {language === 'en' ? 'Schedule' : language === 'fa' ? 'زمان‌بندی' : 'جدولة'}
            </button>
          </div>
          
          {/* Daily cleaning toggle */}
          <div className="glass-effect rounded-xl p-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-hotel-blue bg-opacity-10 flex items-center justify-center mr-4">
                <RefreshCw className="text-hotel-blue w-5 h-5" />
              </div>
              <div className="text-start">
                <h3 className="font-medium">{getTranslation('dailyCleaning', language)}</h3>
                <p className="text-xs text-hotel-charcoal text-opacity-70">
                  {language === 'en' ? 'Automatic daily room cleaning' : 
                   language === 'fa' ? 'نظافت روزانه خودکار اتاق' : 
                   'تنظيف يومي تلقائي للغرفة'}
                </p>
              </div>
            </div>
            <button
              className={`w-12 h-6 rounded-full relative transition-all ${
                dailyCleaning ? 'bg-hotel-gold' : 'bg-gray-300'
              }`}
              onClick={toggleDailyCleaning}
            >
              <span 
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
                  dailyCleaning ? (direction === 'rtl' ? 'left-1' : 'right-1') : (direction === 'rtl' ? 'right-1' : 'left-1')
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleaningPage;
