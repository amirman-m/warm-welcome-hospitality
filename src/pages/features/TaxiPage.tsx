
import React, { useState, useEffect, useRef } from 'react';
import { Car, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LocationSearchInput from '@/components/LocationSearchInput';
import SelectedLocationDisplay from '@/components/SelectedLocationDisplay';
import RouteMapDialog from '@/components/RouteMapDialog';
import { loadGoogleMapsApi } from '@/utils/maps';

// Replace with your Google Maps API key
const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE'; 

const TaxiPage = () => {
  const { language, direction } = useLanguage();
  const [destination, setDestination] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);
  
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
  ];
  
  const popularDestinations = {
    en: ['Dubai Mall', 'Burj Khalifa', 'Palm Jumeirah', 'Dubai Marina', 'Airport'],
    fa: ['دبی مال', 'برج خلیفه', 'نخل جمیرا', 'مارینا دبی', 'فرودگاه'],
    ar: ['دبي مول', 'برج خليفة', 'نخلة جميرا', 'مرسى دبي', 'المطار']
  };

  // Load Google Maps API on component mount
  useEffect(() => {
    const loadApi = async () => {
      try {
        await loadGoogleMapsApi(GOOGLE_MAPS_API_KEY);
        setApiLoaded(true);
      } catch (error) {
        console.error('Failed to load Google Maps API:', error);
        toast({
          title: language === 'en' ? 'Error loading maps' : 
                 language === 'fa' ? 'خطا در بارگیری نقشه' : 
                 'خطأ في تحميل الخرائط',
          variant: "destructive",
        });
      }
    };
    
    loadApi();
  }, [language]);
  
  const handleSelectDestination = (address: string, placeId: string) => {
    setDestination(address);
    setSelectedDestination(address);
    setSelectedPlaceId(placeId);
  };
  
  const handleViewRoute = () => {
    setShowRouteMap(true);
  };
  
  const handleSubmit = () => {
    if (!selectedDestination.trim()) {
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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: language === 'en' ? 'Taxi Requested' : 
               language === 'fa' ? 'تاکسی درخواست شد' : 
               'تم طلب سيارة أجرة',
        description: language === 'en' ? `Your taxi to ${selectedDestination} will arrive at ${pickupTime}` : 
                     language === 'fa' ? `تاکسی شما به مقصد ${selectedDestination} در ساعت ${pickupTime} خواهد رسید` : 
                     `ستصل سيارة الأجرة الخاصة بك إلى ${selectedDestination} في الساعة ${pickupTime}`,
      });
      
      // Reset form
      setDestination('');
      setSelectedDestination('');
      setSelectedPlaceId('');
      setPickupTime('');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1559221236-b987549d06c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
          filter: "brightness(0.7) blur(2px)",
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[1px]" />
      
      {/* Content Container - Using relative positioning to appear above the background */}
      <div className={`relative z-10 min-h-screen p-6 pt-20 ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
        <LanguageToggle />
        <BackButton />
        
        <div className="max-w-lg mx-auto animate-slide-up">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-hotel-gold flex items-center justify-center mb-3 shadow-lg">
              <Car className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-medium text-white drop-shadow-md">
              {getTranslation('taxi', language)}
            </h1>
          </div>
          
          {/* Taxi request form */}
          <div className="bg-white/85 backdrop-blur-md shadow-xl rounded-xl p-6 text-start border border-white/40">
            {/* Destination input with Google Places */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {getTranslation('destination', language)}
              </label>
              
              {apiLoaded ? (
                <>
                  <LocationSearchInput
                    placeholder={
                      language === 'en' ? 'Search for a destination' : 
                      language === 'fa' ? 'جستجوی مقصد' : 
                      'ابحث عن وجهة'
                    }
                    value={destination}
                    onChange={setDestination}
                    onSelect={handleSelectDestination}
                    className="pl-10" // Add padding for the icon
                  />
                  
                  {/* Selected destination display */}
                  {selectedDestination && (
                    <SelectedLocationDisplay
                      address={selectedDestination}
                      onViewRoute={handleViewRoute}
                    />
                  )}
                </>
              ) : (
                // Fallback input when Google Maps API is not loaded
                <div>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      setSelectedDestination(e.target.value);
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-hotel-cream bg-white focus:outline-none focus:ring-2 focus:ring-hotel-gold transition-all"
                    placeholder={language === 'en' ? 'Enter destination' : 
                                language === 'fa' ? 'مقصد را وارد کنید' : 
                                'أدخل الوجهة'}
                  />
                </div>
              )}
              
              {/* Popular destinations */}
              <div className="mt-3">
                <p className="text-xs text-hotel-charcoal opacity-70 mb-2">
                  {language === 'en' ? 'Popular destinations:' : 
                  language === 'fa' ? 'مقاصد محبوب:' : 
                  'الوجهات الشعبية:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularDestinations[language].map((dest, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs border-hotel-cream hover:bg-hotel-gold hover:text-white"
                      onClick={() => {
                        setDestination(dest);
                        setSelectedDestination(dest);
                      }}
                    >
                      {dest}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Pickup time selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-hotel-gold" />
                {getTranslation('pickupTime', language)}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={cn(
                      "py-2 px-1 rounded-md text-sm transition-all",
                      pickupTime === time 
                        ? "bg-hotel-gold text-white shadow-md" 
                        : "bg-white border border-hotel-cream hover:bg-hotel-blue hover:text-white"
                    )}
                    onClick={() => setPickupTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Submit button */}
            <Button
              className="w-full bg-hotel-gold text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md h-12"
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
            </Button>
          </div>
        </div>
      </div>
      
      {/* Route Map Dialog */}
      <RouteMapDialog
        open={showRouteMap}
        onOpenChange={setShowRouteMap}
        destination={selectedDestination}
      />
    </div>
  );
};

export default TaxiPage;
