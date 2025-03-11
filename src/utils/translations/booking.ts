
import { Language } from './types';

export const bookingTranslations: Record<string, Record<Language, string>> = {
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
  selectDate: {
    en: 'Select date',
    fa: 'انتخاب تاریخ',
    ar: 'حدد التاريخ'
  }
};
