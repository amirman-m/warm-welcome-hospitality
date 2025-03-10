
import { Language } from './types';

export const chatTranslations: Record<string, Record<Language, string>> = {
  chat: {
    en: 'Chat with Us',
    fa: 'گفتگو با ما',
    ar: 'تحدث معنا'
  },
  chatWelcomeMessage: {
    en: 'Hello! How can I help you today?',
    fa: 'سلام! چطور میتونم امروز به شما کمک کنم؟',
    ar: 'مرحبًا! كيف يمكنني مساعدتك اليوم؟'
  },
  chatDescription: {
    en: 'Ask any questions about your stay',
    fa: 'هر سوالی در مورد اقامت خود بپرسید',
    ar: 'اطرح أي أسئلة حول إقامتك'
  },
  typeMessage: {
    en: 'Type your message...',
    fa: 'پیام خود را بنویسید...',
    ar: 'اكتب رسالتك...'
  },
  breakfastAnswer: {
    en: 'Breakfast is served from 6:30 AM to 10:30 AM in the main restaurant on the ground floor.',
    fa: 'صبحانه از ساعت ۶:۳۰ تا ۱۰:۳۰ صبح در رستوران اصلی در طبقه همکف سرو می‌شود.',
    ar: 'يتم تقديم وجبة الإفطار من الساعة 6:30 صباحًا حتى 10:30 صباحًا في المطعم الرئيسي في الطابق الأرضي.'
  },
  checkoutAnswer: {
    en: 'Checkout time is at 12:00 PM. Late checkout may be available upon request, subject to availability.',
    fa: 'زمان خروج ساعت ۱۲ ظهر است. خروج با تأخیر ممکن است در صورت درخواست و با توجه به در دسترس بودن امکان‌پذیر باشد.',
    ar: 'وقت المغادرة هو الساعة 12:00 ظهرًا. قد تتوفر المغادرة المتأخرة عند الطلب، وفقًا للتوافر.'
  },
  poolAnswer: {
    en: 'The swimming pool is open daily from 7:00 AM to 10:00 PM. Towels are provided at the pool entrance.',
    fa: 'استخر شنا روزانه از ساعت ۷ صبح تا ۱۰ شب باز است. حوله ها در ورودی استخر ارائه می شوند.',
    ar: 'المسبح مفتوح يوميًا من الساعة 7:00 صباحًا حتى 10:00 مساءً. يتم توفير المناشف عند مدخل المسبح.'
  },
  generalAnswer: {
    en: 'Thank you for your question. Our front desk staff is ready to assist you with this. Would you like me to connect you with them?',
    fa: 'ممنون از سوال شما. کارکنان پذیرش ما آماده کمک به شما در این مورد هستند. آیا می‌خواهید شما را به آنها متصل کنم؟',
    ar: 'شكرًا على سؤالك. موظفو مكتب الاستقبال لدينا مستعدون لمساعدتك في هذا الأمر. هل تريد مني توصيلك بهم؟'
  },
  // New translations
  hotelOnline: {
    en: 'Hotel Online',
    fa: 'خدمات میهمان‌نوازی هتل آنلاین',
    ar: 'خدمات الضيافة الفندقية عبر الإنترنت'
  },
  askAnyQuestion: {
    en: 'Ask any question that you have',
    fa: 'هر سوالی دارید بپرسید',
    ar: 'اسأل أي سؤال لديك'
  },
  howCanIHelp: {
    en: 'How can I help you?',
    fa: 'سلام! چطور می‌توانم به شما کمک کنم؟',
    ar: 'كيف يمكنني مساعدتك؟'
  },
  defaultQuestions: {
    en: 'Default Questions',
    fa: 'سوالات متداول',
    ar: 'الأسئلة الافتراضية'
  },
  tapToStart: {
    en: 'Tap on a question to start:',
    fa: 'روی یک سوال ضربه بزنید تا شروع کنید:',
    ar: 'انقر على سؤال للبدء:'
  },
  breakfastTimeQuestion: {
    en: 'What time is breakfast served?',
    fa: 'ساعت صبحانه چیست؟',
    ar: 'ما هو وقت الإفطار؟'
  },
  wifiQuestion: {
    en: 'How do I connect to the WiFi?',
    fa: 'چگونه به وای‌فای متصل شوم؟',
    ar: 'كيف يمكنني الاتصال بشبكة Wi-Fi؟'
  },
  taxiQuestion: {
    en: 'Can I book a taxi?',
    fa: 'آیا می‌توانم تاکسی رزرو کنم؟',
    ar: 'هل يمكنني حجز سيارة أجرة؟'
  },
  checkoutTimeQuestion: {
    en: 'What are the check-out times?',
    fa: 'زمان تسویه چه ساعتی است؟',
    ar: 'ما هي أوقات المغادرة؟'
  },
  welcomeToHotel: {
    en: 'Welcome to Hotel Services',
    fa: 'به خدمات هتل خوش آمدید',
    ar: 'مرحبًا بكم في خدمات الفندق'
  },
  loadingChat: {
    en: 'Loading chat assistant...',
    fa: 'در حال بارگذاری دستیار گفتگو...',
    ar: 'جاري تحميل مساعد الدردشة...'
  }
};
