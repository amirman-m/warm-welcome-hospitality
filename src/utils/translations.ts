
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
  | 'backToMenu'
  | 'chatWelcomeMessage'
  | 'breakfastAnswer'
  | 'checkoutAnswer'
  | 'poolAnswer'
  | 'generalAnswer'
  | 'chatDescription'
  | 'typeMessage';

type Language = 'en' | 'fa' | 'ar';

export const translations: Record<string, Record<Language, string>> = {
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
  },
  chatWelcomeMessage: {
    en: "Hello! I'm the hotel's virtual assistant. How can I help you today?",
    fa: "سلام! من دستیار مجازی هتل هستم. چگونه می‌توانم امروز به شما کمک کنم؟",
    ar: "مرحبًا! أنا المساعد الافتراضي للفندق. كيف يمكنني مساعدتك اليوم؟"
  },
  breakfastAnswer: {
    en: "Breakfast is served from 6:30 AM to 10:30 AM in our main restaurant on the ground floor.",
    fa: "صبحانه از ساعت ۶:۳۰ تا ۱۰:۳۰ صبح در رستوران اصلی ما در طبقه همکف سرو می‌شود.",
    ar: "يتم تقديم وجبة الإفطار من الساعة 6:30 صباحًا حتى 10:30 صباحًا في مطعمنا الرئيسي في الطابق الأرضي."
  },
  checkoutAnswer: {
    en: "Check-out time is at 12:00 PM. Late check-out can be arranged based on availability for an additional fee.",
    fa: "زمان خروج ساعت ۱۲:۰۰ ظهر است. خروج با تأخیر می‌تواند با توجه به موجود بودن اتاق و با پرداخت هزینه اضافی ترتیب داده شود.",
    ar: "وقت المغادرة هو الساعة 12:00 ظهرًا. يمكن ترتيب المغادرة المتأخرة حسب التوفر مقابل رسوم إضافية."
  },
  poolAnswer: {
    en: "Our swimming pool is open from 7:00 AM to 10:00 PM. Towels are provided at the pool entrance.",
    fa: "استخر ما از ساعت ۷:۰۰ صبح تا ۱۰:۰۰ شب باز است. حوله‌ها در ورودی استخر ارائه می‌شوند.",
    ar: "حوض السباحة لدينا مفتوح من الساعة 7:00 صباحًا حتى 10:00 مساءً. يتم توفير المناشف عند مدخل حوض السباحة."
  },
  generalAnswer: {
    en: "Thank you for your question. Our concierge team will assist you with this matter. Please call the front desk or visit us for more detailed information.",
    fa: "از سؤال شما متشکریم. تیم پذیرش ما به شما در این مورد کمک خواهد کرد. لطفاً برای اطلاعات بیشتر با پذیرش تماس بگیرید یا به ما مراجعه کنید.",
    ar: "شكرًا على سؤالك. سيساعدك فريق الكونسيرج في هذا الأمر. يرجى الاتصال بمكتب الاستقبال أو زيارتنا لمزيد من المعلومات التفصيلية."
  },
  chatDescription: {
    en: "Ask any questions about your stay",
    fa: "هرگونه سوالی درباره اقامت خود بپرسید",
    ar: "اطرح أي أسئلة حول إقامتك"
  },
  typeMessage: {
    en: "Type your message...",
    fa: "پیام خود را بنویسید...",
    ar: "اكتب رسالتك..."
  }
};

export const getTranslation = (key: TranslationKey, language: 'en' | 'fa' | 'ar'): string => {
  return translations[key][language];
};
