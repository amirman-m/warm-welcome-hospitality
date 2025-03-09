
export type Language = 'en' | 'fa' | 'ar';

export type TranslationKey = 
  // Common keys
  | 'welcome'
  | 'toHotel'
  | 'mainMenu'
  | 'language'
  | 'back'
  | 'submit'
  | 'success'
  | 'error'
  | 'loading'
  
  // Menu items
  | 'wifi'
  | 'information'
  | 'booking'
  | 'taxi'
  | 'cleaning'
  | 'frontDesk'
  | 'chat'
  
  // WiFi
  | 'wifiUsername'
  | 'wifiPassword'
  | 'wifiInstructions'
  
  // Information
  | 'hotelInfo'
  | 'amenities'
  | 'localAttractions'
  | 'contactUs'
  | 'hotelDescription'
  | 'amenitiesList'
  | 'attractionsList'
  | 'contactInfo'
  
  // Booking
  | 'checkIn'
  | 'checkOut'
  | 'adults'
  | 'children'
  | 'roomType'
  | 'bookNow'
  | 'bookedSuccessfully'
  | 'standardRoom'
  | 'deluxeRoom'
  | 'suiteRoom'
  
  // Taxi
  | 'destination'
  | 'pickupTime'
  | 'requestTaxi'
  
  // Cleaning
  | 'cleaningType'
  | 'cleaningTime'
  | 'requestCleaning'
  | 'fullCleaning'
  | 'quickCleaning'
  | 'towelsOnly'
  
  // Front Desk
  | 'callFrontDesk'
  | 'askQuestion'
  
  // Chat
  | 'chatWelcomeMessage'
  | 'chatDescription'
  | 'typeMessage'
  | 'breakfastAnswer'
  | 'checkoutAnswer'
  | 'poolAnswer'
  | 'generalAnswer';
