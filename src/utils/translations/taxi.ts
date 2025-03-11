
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
  },
  searchDestination: {
    en: 'Search for a destination',
    fa: 'جستجوی مقصد',
    ar: 'ابحث عن وجهة'
  },
  popularDestinations: {
    en: 'Popular destinations',
    fa: 'مقاصد محبوب',
    ar: 'الوجهات الشعبية'
  },
  selectedDestination: {
    en: 'Selected destination',
    fa: 'مقصد انتخاب شده',
    ar: 'الوجهة المختارة'
  },
  viewRoute: {
    en: 'View Route',
    fa: 'مشاهده مسیر',
    ar: 'عرض المسار'
  }
};
