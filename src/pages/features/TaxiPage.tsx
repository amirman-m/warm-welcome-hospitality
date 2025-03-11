
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import RouteMapDialog from '@/components/RouteMapDialog';
import { loadGoogleMapsApi } from '@/utils/maps';

// Import refactored components
import TaxiFormHeader from '@/components/taxi/TaxiFormHeader';
import DestinationSection from '@/components/taxi/DestinationSection';
import TimeSelectionSection from '@/components/taxi/TimeSelectionSection';
import PassengerSection from '@/components/taxi/PassengerSection';

// Replace with your Google Maps API key
const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';

type PickupTimeOption = 'now' | '15min' | '30min' | '1hour' | 'custom';

const TaxiPage = () => {
  const { language, direction } = useLanguage();
  const [destination, setDestination] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const [pickupTimeOption, setPickupTimeOption] = useState<PickupTimeOption>('now');
  const [customDate, setCustomDate] = useState<Date | undefined>(new Date());
  const [customTime, setCustomTime] = useState<string>('');
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);
  
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
  
  const handleViewRoute = () => {
    setShowRouteMap(true);
  };
  
  const formatSelectedTime = () => {
    if (pickupTimeOption === 'now') {
      return getTranslation('now', language);
    } else if (pickupTimeOption === '15min') {
      return getTranslation('fifteenMinutes', language);
    } else if (pickupTimeOption === '30min') {
      return getTranslation('thirtyMinutes', language);
    } else if (pickupTimeOption === '1hour') {
      return getTranslation('oneHour', language);
    } else if (customDate && customTime) {
      return `${format(customDate, 'yyyy/MM/dd')} - ${customTime}`;
    } else {
      return '';
    }
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
    
    const pickupTimeString = formatSelectedTime();
    if (pickupTimeOption === 'custom' && (!customDate || !customTime)) {
      toast({
        title: language === 'en' ? 'Please select date and time' : 
               language === 'fa' ? 'لطفا تاریخ و زمان را انتخاب کنید' : 
               'الرجاء تحديد التاريخ والوقت',
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: language === 'en' ? 'Taxi Booked' : 
               language === 'fa' ? 'تاکسی رزرو شد' : 
               'تم حجز سيارة أجرة',
        description: language === 'en' 
          ? `Your taxi to ${selectedDestination} will arrive at ${pickupTimeString}` 
          : language === 'fa' 
          ? `تاکسی شما به مقصد ${selectedDestination} در ${pickupTimeString} خواهد رسید` 
          : `ستصل سيارة الأجرة الخاصة بك إلى ${selectedDestination} في ${pickupTimeString}`,
      });
      
      // Reset form
      setDestination('');
      setSelectedDestination('');
      setSelectedPlaceId('');
      setPickupTimeOption('now');
      setCustomDate(new Date());
      setCustomTime('');
      setShowCalendar(false);
      setShowTimeSelect(false);
      setPassengerCount(1);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* Background color instead of image for a cleaner look */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-gray-100"></div>
      
      {/* Content Container */}
      <div className={`relative z-10 min-h-screen p-6 pt-20 ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
        <LanguageToggle />
        <BackButton />
        
        <div className="max-w-md mx-auto animate-slide-up">
          {/* Header */}
          <TaxiFormHeader />
          
          {/* Main Form */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            {/* Destination Section */}
            <DestinationSection 
              destination={destination}
              setDestination={setDestination}
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
              setSelectedPlaceId={setSelectedPlaceId}
              onViewRoute={handleViewRoute}
              apiLoaded={apiLoaded}
            />
            
            {/* Pickup Time Section */}
            <TimeSelectionSection 
              pickupTimeOption={pickupTimeOption}
              setPickupTimeOption={setPickupTimeOption}
              customDate={customDate}
              setCustomDate={setCustomDate}
              customTime={customTime}
              setCustomTime={setCustomTime}
              showTimeSelect={showTimeSelect}
              setShowTimeSelect={setShowTimeSelect}
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
            />
            
            {/* Passenger Count Section */}
            <PassengerSection 
              passengerCount={passengerCount}
              setPassengerCount={setPassengerCount}
            />
          </div>
          
          {/* Book Button */}
          <div className="space-y-3">
            <Button
              className="w-full bg-hotel-gold text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md h-12"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="animate-pulse">
                  {language === 'en' ? 'Booking...' : 
                  language === 'fa' ? 'در حال رزرو...' : 
                  'جاري الحجز...'}
                </span>
              ) : (
                getTranslation('bookTaxi', language)
              )}
            </Button>
            
            <p className="text-sm text-center text-gray-500">
              {getTranslation('taxiCoordinationMessage', language)}
            </p>
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
