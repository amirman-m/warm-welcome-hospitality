
// Define the common language type
export type Language = 'en' | 'fa' | 'ar';

// Main translation key type that combines all feature-specific keys
export type TranslationKey = 
  | CommonKeys
  | WifiKeys
  | InformationKeys
  | BookingKeys
  | TaxiKeys
  | CleaningKeys
  | FrontDeskKeys
  | ChatKeys;

// Common UI and navigation keys
export type CommonKeys = 
  | 'welcome'
  | 'toHotel'
  | 'wifi'
  | 'information'
  | 'booking'
  | 'taxi'
  | 'cleaning'
  | 'desk'
  | 'chat'
  | 'backToMenu';

// WiFi feature specific keys
export type WifiKeys =
  | 'wifiUsername'
  | 'wifiPassword'
  | 'wifiInstructions';

// Information feature specific keys
export type InformationKeys =
  | 'aboutHotel'
  | 'entertainment'
  | 'attractions';

// Booking feature specific keys
export type BookingKeys =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'bookTable'
  | 'tennis'
  | 'basketball'
  | 'coffee';

// Taxi feature specific keys
export type TaxiKeys =
  | 'destination'
  | 'pickupTime'
  | 'requestTaxi';

// Cleaning feature specific keys
export type CleaningKeys =
  | 'callCleaning'
  | 'scheduleTime'
  | 'dailyCleaning';

// Front desk feature specific keys
export type FrontDeskKeys =
  | 'callFrontDesk'
  | 'askQuestion';

// Chat feature specific keys
export type ChatKeys =
  | 'chatWelcomeMessage'
  | 'breakfastAnswer'
  | 'checkoutAnswer'
  | 'poolAnswer'
  | 'generalAnswer'
  | 'chatDescription'
  | 'typeMessage';
