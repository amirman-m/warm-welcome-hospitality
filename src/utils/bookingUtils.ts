
import { ActivityType, MealType, TableInfo } from '@/types/booking';
import { getTranslation } from '@/utils/translations';
import { toast } from '@/hooks/use-toast';

export const getMealName = (meal: MealType, lang: 'en' | 'fa' | 'ar') => {
  return getTranslation(meal, lang);
};

export const getActivityName = (activity: ActivityType, lang: 'en' | 'fa' | 'ar') => {
  switch (activity) {
    case 'table':
      return getTranslation('bookTable', lang);
    case 'tennis':
      return getTranslation('tennis', lang);
    case 'basketball':
      return getTranslation('basketball', lang);
    case 'coffee':
      return getTranslation('coffee', lang);
  }
};

export const handleBooking = (
  language: 'en' | 'fa' | 'ar',
  activeBooking: ActivityType,
  selectedDate: Date | undefined,
  selectedTime: string,
  selectedTable: number | null,
  selectedMeal: MealType,
  showMealSelection: boolean,
  getTotalSelectedItems: () => number,
  restaurantTables: TableInfo[],
  resetSelections: () => void
): boolean => {
  if (!selectedDate) {
    toast({
      title: language === 'en' ? 'Select a date' : language === 'fa' ? 'تاریخ را انتخاب کنید' : 'حدد تاريخًا',
      variant: "destructive",
    });
    return false;
  }

  if (!selectedTime) {
    toast({
      title: language === 'en' ? 'Select a time' : language === 'fa' ? 'زمان را انتخاب کنید' : 'حدد وقتًا',
      variant: "destructive",
    });
    return false;
  }
  
  if (activeBooking === 'table' && !selectedTable) {
    toast({
      title: language === 'en' ? 'Select a table' : language === 'fa' ? 'میز را انتخاب کنید' : 'حدد طاولة',
      variant: "destructive",
    });
    return false;
  }
  
  // We don't need to show a toast here anymore since we'll show the confirmation modal
  
  // Reset selection
  resetSelections();
  
  // Return true to indicate booking was successful
  return true;
};
