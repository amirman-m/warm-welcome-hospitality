
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
  | 'loadingWifi'
  
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
  | 'loadingInformation'  // Added this key
  
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
  | 'loadingBooking'   // Added this key
  | 'selectMeal'       // Added this key
  | 'selectTime'       // Added this key
  | 'selectTable'      // Added this key
  | 'booked'           // Added this key
  | 'book'             // Added this key
  
  // Taxi
  | 'destination'
  | 'pickupTime'
  | 'requestTaxi'
  | 'loadingTaxi'      // Added this key
  
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
  | 'loadingCleaning'  // Added this key
  
  // Front Desk
  | 'callFrontDesk'
  | 'askQuestion'
  | 'loadingDesk'      // Added this key
  
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
  | 'checkoutTimeQuestion'
  | 'welcomeToHotel'
  | 'loadingChat';
