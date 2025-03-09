
import { Language } from './types';

export const chatTranslations: Record<string, Record<Language, string>> = {
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
