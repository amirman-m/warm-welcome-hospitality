
import React, { useState, useEffect, useRef } from 'react';
import { Car, MapPin, Clock, Users, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import LocationSearchInput from '@/components/LocationSearchInput';
import SelectedLocationDisplay from '@/components/SelectedLocationDisplay';
import RouteMapDialog from '@/components/RouteMapDialog';
import { loadGoogleMapsApi } from '@/utils/maps';

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
  const [passengerCount, setPassengerCount] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);
  
  // Generate time slots for the dropdown
  const timeSlots = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      timeSlots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }
  }
  
  const popularDestinations = [
    {
      key: 'airport',
      icon: <MapPin className="w-4 h-4" />
    },
    {
      key: 'cityCenter',
      icon: <MapPin className="w-4 h-4" />
    },
    {
      key: 'mall',
      icon: <MapPin className="w-4 h-4" />
    },
    {
      key: 'beach',
      icon: <MapPin className="w-4 h-4" />
    },
    {
      key: 'trainStation',
      icon: <MapPin className="w-4 h-4" />
    }
  ];

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
  
  const handleSelectPopularDestination = (destKey: string) => {
    const dest = getTranslation(destKey, language);
    setDestination(dest);
    setSelectedDestination(dest);
  };
  
  const handleViewRoute = () => {
    setShowRouteMap(true);
  };
  
  const togglePassengerCount = (increment: boolean) => {
    if (increment) {
      setPassengerCount(prev => Math.min(prev + 1, 10));
    } else {
      setPassengerCount(prev => Math.max(prev - 1, 1));
    }
  };
  
  const handleTimeOptionSelect = (option: PickupTimeOption) => {
    setPickupTimeOption(option);
    if (option === 'custom') {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
      setShowTimeSelect(false);
    }
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
          <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-1">
                {getTranslation('requestTaxi', language)}
              </h1>
              <p className="text-sm text-gray-600">
                {getTranslation('bookTaxiSubtitle', language)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Car className="text-amber-600 w-6 h-6" />
            </div>
          </div>
          
          {/* Main Form */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            {/* Destination Section */}
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium mb-3 flex justify-between">
                {getTranslation('destination', language)}
              </h2>
              
              {apiLoaded ? (
                <LocationSearchInput
                  placeholder={getTranslation('enterDestination', language)}
                  value={destination}
                  onChange={setDestination}
                  onSelect={handleSelectDestination}
                  className="pl-10"
                />
              ) : (
                <Input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setSelectedDestination(e.target.value);
                  }}
                  placeholder={getTranslation('enterDestination', language)}
                  className="w-full"
                />
              )}
              
              {/* Selected destination display */}
              {selectedDestination && (
                <SelectedLocationDisplay
                  address={selectedDestination}
                  onViewRoute={handleViewRoute}
                />
              )}
              
              {/* Popular destinations */}
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">
                  {getTranslation('popularDestinations', language)}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularDestinations.map((dest, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="border-gray-200 hover:bg-gray-100 text-gray-700 flex items-center"
                      onClick={() => handleSelectPopularDestination(dest.key)}
                    >
                      {dest.icon}
                      <span className="ml-1">{getTranslation(dest.key, language)}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Pickup Time Section */}
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium mb-3 flex justify-between">
                {getTranslation('pickupTime', language)}
              </h2>
              
              {/* Time options */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <Button
                  variant={pickupTimeOption === 'now' ? "default" : "outline"}
                  className={cn(
                    pickupTimeOption === 'now' ? "bg-hotel-gold text-white" : "border-gray-200"
                  )}
                  onClick={() => handleTimeOptionSelect('now')}
                >
                  {getTranslation('now', language)}
                </Button>
                
                <Button
                  variant={pickupTimeOption === '15min' ? "default" : "outline"}
                  className={cn(
                    pickupTimeOption === '15min' ? "bg-hotel-gold text-white" : "border-gray-200"
                  )}
                  onClick={() => handleTimeOptionSelect('15min')}
                >
                  {getTranslation('fifteenMinutes', language)}
                </Button>
                
                <Button
                  variant={pickupTimeOption === '30min' ? "default" : "outline"}
                  className={cn(
                    pickupTimeOption === '30min' ? "bg-hotel-gold text-white" : "border-gray-200"
                  )}
                  onClick={() => handleTimeOptionSelect('30min')}
                >
                  {getTranslation('thirtyMinutes', language)}
                </Button>
                
                <Button
                  variant={pickupTimeOption === '1hour' ? "default" : "outline"}
                  className={cn(
                    pickupTimeOption === '1hour' ? "bg-hotel-gold text-white" : "border-gray-200"
                  )}
                  onClick={() => handleTimeOptionSelect('1hour')}
                >
                  {getTranslation('oneHour', language)}
                </Button>
                
                <Button
                  variant={pickupTimeOption === 'custom' ? "default" : "outline"}
                  className={cn(
                    "col-span-2",
                    pickupTimeOption === 'custom' ? "bg-hotel-gold text-white" : "border-gray-200"
                  )}
                  onClick={() => handleTimeOptionSelect('custom')}
                >
                  {getTranslation('customTime', language)}
                </Button>
              </div>
              
              {/* Custom date and time selection */}
              {showCalendar && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      {getTranslation('selectDate', language)}
                    </h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between border-gray-200 text-gray-700"
                        >
                          {customDate ? format(customDate, 'PPP') : getTranslation('selectDate', language)}
                          <Calendar className="ml-2 h-4 w-4 text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={customDate}
                          onSelect={setCustomDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      {getTranslation('selectTime', language)}
                    </h3>
                    <Popover open={showTimeSelect} onOpenChange={setShowTimeSelect}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between border-gray-200 text-gray-700"
                        >
                          {customTime || getTranslation('selectTime', language)}
                          <Clock className="ml-2 h-4 w-4 text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60 p-0 max-h-60 overflow-y-auto">
                        <div className="py-1">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => {
                                setCustomTime(time);
                                setShowTimeSelect(false);
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </div>
            
            {/* Passenger Count Section */}
            <div className="p-4">
              <h2 className="text-lg font-medium mb-3">
                {getTranslation('passengerCount', language)}
              </h2>
              
              <div className="relative">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span>
                    {passengerCount} {getTranslation(passengerCount === 1 ? 'passenger' : 'passengers', language)}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-gray-200"
                      onClick={() => togglePassengerCount(false)}
                      disabled={passengerCount <= 1}
                    >
                      -
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-gray-200"
                      onClick={() => togglePassengerCount(true)}
                      disabled={passengerCount >= 10}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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
