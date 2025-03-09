
type TranslationKey = 
  | 'welcome'
  | 'toHotel'
  | 'wifi'
  | 'information'
  | 'booking'
  | 'taxi'
  | 'cleaning'
  | 'desk'
  | 'chat'
  | 'wifiUsername'
  | 'wifiPassword'
  | 'wifiInstructions'
  | 'aboutHotel'
  | 'entertainment'
  | 'attractions'
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'bookTable'
  | 'tennis'
  | 'basketball'
  | 'coffee'
  | 'destination'
  | 'pickupTime'
  | 'requestTaxi'
  | 'callCleaning'
  | 'scheduleTime'
  | 'dailyCleaning'
  | 'callFrontDesk'
  | 'askQuestion'
  | 'backToMenu';

export const translations: Record<TranslationKey, Record<'en' | 'fa' | 'ar', string>> = {
  welcome: {
    en: 'Welcome to',
    fa: 'به',
    ar: 'مرحبًا بكم في'
  },
  toHotel: {
    en: 'Luxury Hotel',
    fa: 'هتل لوکس خوش آمدید',
    ar: 'الفندق الفاخر'
  },
  wifi: {
    en: 'WiFi',
    fa: 'وای‌فای',
    ar: 'واي فاي'
  },
  information: {
    en: 'Information',
    fa: 'اطلاعات',
    ar: 'معلومات'
  },
  booking: {
    en: 'Booking',
    fa: 'رزرو',
    ar: 'حجز'
  },
  taxi: {
    en: 'Taxi',
    fa: 'تاکسی',
    ar: 'سيارة أجرة'
  },
  cleaning: {
    en: 'Cleaning',
    fa: 'نظافت',
    ar: 'تنظيف'
  },
  desk: {
    en: 'Front Desk',
    fa: 'پذیرش',
    ar: 'استقبال'
  },
  chat: {
    en: 'Chat with Us',
    fa: 'گفتگو با ما',
    ar: 'الدردشة معنا'
  },
  wifiUsername: {
    en: 'Username',
    fa: 'نام کاربری',
    ar: 'اسم المستخدم'
  },
  wifiPassword: {
    en: 'Password',
    fa: 'رمز عبور',
    ar: 'كلمة المرور'
  },
  wifiInstructions: {
    en: 'How to connect to WiFi',
    fa: 'چگونه به وای‌فای متصل شوید',
    ar: 'كيفية الاتصال بشبكة واي فاي'
  },
  aboutHotel: {
    en: 'About the Hotel',
    fa: 'درباره هتل',
    ar: 'حول الفندق'
  },
  entertainment: {
    en: 'Entertainment',
    fa: 'سرگرمی',
    ar: 'ترفيه'
  },
  attractions: {
    en: 'Nearby Attractions',
    fa: 'جاذبه‌های نزدیک',
    ar: 'مناطق الجذب القريبة'
  },
  breakfast: {
    en: 'Breakfast',
    fa: 'صبحانه',
    ar: 'إفطار'
  },
  lunch: {
    en: 'Lunch',
    fa: 'ناهار',
    ar: 'غداء'
  },
  dinner: {
    en: 'Dinner',
    fa: 'شام',
    ar: 'عشاء'
  },
  bookTable: {
    en: 'Book a Table',
    fa: 'رزرو میز',
    ar: 'حجز طاولة'
  },
  tennis: {
    en: 'Tennis Court',
    fa: 'زمین تنیس',
    ar: 'ملعب تنس'
  },
  basketball: {
    en: 'Basketball Court',
    fa: 'زمین بسکتبال',
    ar: 'ملعب كرة السلة'
  },
  coffee: {
    en: 'Coffee Shop',
    fa: 'کافی شاپ',
    ar: 'مقهى'
  },
  destination: {
    en: 'Destination',
    fa: 'مقصد',
    ar: 'الوجهة'
  },
  pickupTime: {
    en: 'Pickup Time',
    fa: 'زمان سوار شدن',
    ar: 'وقت الاستلام'
  },
  requestTaxi: {
    en: 'Request a Taxi',
    fa: 'درخواست تاکسی',
    ar: 'طلب سيارة أجرة'
  },
  callCleaning: {
    en: 'Call Cleaning Crew',
    fa: 'تماس با خدمه نظافت',
    ar: 'اتصل بطاقم التنظيف'
  },
  scheduleTime: {
    en: 'Schedule Cleaning Time',
    fa: 'زمان‌بندی نظافت',
    ar: 'جدولة وقت التنظيف'
  },
  dailyCleaning: {
    en: 'Daily Cleaning Service',
    fa: 'سرویس نظافت روزانه',
    ar: 'خدمة التنظيف اليومية'
  },
  callFrontDesk: {
    en: 'Call Front Desk',
    fa: 'تماس با پذیرش',
    ar: 'اتصل بمكتب الاستقبال'
  },
  askQuestion: {
    en: 'Ask a Question',
    fa: 'پرسیدن سوال',
    ar: 'اسأل سؤالاً'
  },
  backToMenu: {
    en: 'Back to Menu',
    fa: 'بازگشت به منو',
    ar: 'الرجوع إلى القائمة'
  }
};

export const getTranslation = (key: TranslationKey, language: 'en' | 'fa' | 'ar'): string => {
  return translations[key][language];
};
