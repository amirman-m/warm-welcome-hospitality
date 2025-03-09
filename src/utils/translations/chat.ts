
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
  }
};
