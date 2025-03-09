
import { Language } from './types';

export const taxiTranslations: Record<string, Record<Language, string>> = {
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
  }
};
