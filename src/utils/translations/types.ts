
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
  | 'backToMenu'
  
  // Menu items
  | 'wifi'
  | 'information'
  | 'booking'
  | 'taxi'
  | 'cleaning'
  | 'frontDesk'
  | 'chat'
  | 'desk'
  
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
  | 'aboutHotel'
  | 'entertainment'
  | 'attractions'
  
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
  | 'bookTable'
  | 'tennis'
  | 'basketball'
  | 'coffee'
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  
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
  | 'callCleaning'
  | 'scheduleTime'
  | 'dailyCleaning'
  
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
  | 'generalAnswer'
  | 'hotelOnline'
  | 'askAnyQuestion'
  | 'howCanIHelp'
  | 'defaultQuestions'
  | 'tapToStart'
  | 'breakfastTimeQuestion'
  | 'wifiQuestion'
  | 'taxiQuestion'
  | 'checkoutTimeQuestion';
