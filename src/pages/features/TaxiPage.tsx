import React, { useState, useEffect } from 'react';
import { Car, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { toast } from '@/hooks/use-toast';
import DynamicBackground from '@/components/DynamicBackground';

const TaxiPage = () => {
  const { language, direction } = useLanguage();
  const [destination, setDestination] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
  ];
  
  const popularDestinations = {
    en: ['Airport', 'City Center', 'Shopping Mall', 'Museum District', 'Beach'],
    fa: ['فرودگاه', 'مرکز شهر', 'مرکز خرید', 'منطقه موزه', 'ساحل'],
    ar: ['المطار', 'وسط المدينة', 'مركز التسوق', 'منطقة المتحف', 'الشاطئ']
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = () => {
    if (!destination.trim()) {
      toast({
        title: language === 'en' ? 'Please enter a destination' : 
               language === 'fa' ? 'لطفا مقصد را وارد کنید' : 
               'الرجاء إدخال الوجهة',
        variant: "destructive",
      });
      return;
    }
    
    if (!pickupTime) {
      toast({
        title: language === 'en' ? 'Please select a pickup time' : 
               language === 'fa' ? 'لطفا زمان سوار شدن را انتخاب کنید' : 
               'الرجاء تحديد وقت الاستلام',
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: language === 'en' ? 'Taxi Requested' : 
               language === 'fa' ? 'تاکسی درخواست شد' : 
               'تم طلب سيارة أجرة',
        description: language === 'en' ? `Your taxi to ${destination} will arrive at ${pickupTime}` : 
                     language === 'fa' ? `تاکسی شما به مقصد ${destination} در ساعت ${pickupTime} خواهد رسید` : 
                     `ستصل سيارة الأجرة الخاصة بك إلى ${destination} في الساعة ${pickupTime}`,
      });
      
      setDestination('');
      setPickupTime('');
    }, 1500);
  };
  
  return (
    <DynamicBackground>
      <div className={`min-h-screen ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
        <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <BackButton />
          </div>
          <div className="pointer-events-auto">
            <LanguageToggle />
          </div>
        </div>
        
        {!showContent ? (
          <div className="flex-1 flex items-center justify-center min-h-screen">
            <div className="text-center animate-pulse p-6 glass-effect rounded-2xl max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-full bg-hotel-gold mx-auto flex items-center justify-center mb-4">
                <Car className="text-white w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {getTranslation('taxi', language)}
              </h1>
              <p className="text-white/80">
                {getTranslation('loadingTaxi', language) || 'Loading taxi service...'}
              </p>
            </div>
          </div>
        ) : (
          <div className="pt-24 px-6 pb-6 animate-slide-up max-w-lg mx-auto">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-hotel-gold flex items-center justify-center mb-3">
                <Car className="text-white w-8 h-8" />
              </div>
              <h1 className="text-2xl font-medium text-white">
                {getTranslation('taxi', language)}
              </h1>
            </div>
            
            <div className="glass-effect rounded-xl p-6 text-start">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {getTranslation('destination', language)}
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-hotel-cream bg-white focus:outline-none focus:ring-2 focus:ring-hotel-gold transition-all"
                  placeholder={language === 'en' ? 'Enter destination' : 
                              language === 'fa' ? 'مقصد را وارد کنید' : 
                              'أدخل الوجهة'}
                />
                
                <div className="mt-3">
                  <p className="text-xs text-hotel-charcoal opacity-70 mb-2">
                    {language === 'en' ? 'Popular destinations:' : 
                    language === 'fa' ? 'مقاصد محبوب:' : 
                    'الوجهات الشعبية:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popularDestinations[language].map((dest, index) => (
                      <button
                        key={index}
                        className="text-xs bg-hotel-cream hover:bg-hotel-beige px-3 py-1 rounded-full transition-all"
                        onClick={() => setDestination(dest)}
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {getTranslation('pickupTime', language)}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      className={`py-2 px-1 rounded-md text-sm transition-all ${
                        pickupTime === time 
                          ? 'bg-hotel-gold text-white' 
                          : 'bg-white hover:bg-hotel-blue hover:text-white'
                      }`}
                      onClick={() => setPickupTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                className="w-full bg-hotel-gold text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">
                    {language === 'en' ? 'Requesting...' : 
                    language === 'fa' ? 'در حال درخواست...' : 
                    'جاري الطلب...'}
                  </span>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {getTranslation('requestTaxi', language)}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </DynamicBackground>
  );
};

export default TaxiPage;
