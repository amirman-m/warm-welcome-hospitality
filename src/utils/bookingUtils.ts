
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
) => {
  if (!selectedDate) {
    toast({
      title: language === 'en' ? 'Select a date' : language === 'fa' ? 'تاریخ را انتخاب کنید' : 'حدد تاريخًا',
      variant: "destructive",
    });
    return;
  }

  if (!selectedTime) {
    toast({
      title: language === 'en' ? 'Select a time' : language === 'fa' ? 'زمان را انتخاب کنید' : 'حدد وقتًا',
      variant: "destructive",
    });
    return;
  }
  
  if (activeBooking === 'table' && !selectedTable) {
    toast({
      title: language === 'en' ? 'Select a table' : language === 'fa' ? 'میز را انتخاب کنید' : 'حدد طاولة',
      variant: "destructive",
    });
    return;
  }
  
  let successMessage = '';
  const dateString = selectedDate.toLocaleDateString(
    language === 'en' ? 'en-US' : language === 'fa' ? 'fa-IR' : 'ar-SA'
  );
  
  if (language === 'en') {
    successMessage = `Your ${getActivityName(activeBooking, 'en')} has been booked for ${dateString} at ${selectedTime}`;
    if (activeBooking === 'table') {
      const tableInfo = restaurantTables.find(t => t.id === selectedTable);
      successMessage += ` (${getMealName(selectedMeal, 'en')}, Table ${selectedTable} - ${tableInfo?.seats} seats)`;
      
      // Add meal selection information if available
      if (showMealSelection && (selectedMeal === 'lunch' || selectedMeal === 'dinner')) {
        const totalItems = getTotalSelectedItems();
        if (totalItems > 0) {
          successMessage += ` with ${totalItems} pre-selected items`;
        }
      }
    }
  } else if (language === 'fa') {
    successMessage = `${getActivityName(activeBooking, 'fa')} شما برای تاریخ ${dateString} ساعت ${selectedTime} رزرو شد`;
    if (activeBooking === 'table') {
      const tableInfo = restaurantTables.find(t => t.id === selectedTable);
      successMessage += ` (${getMealName(selectedMeal, 'fa')}، میز ${selectedTable} - ${tableInfo?.seats} صندلی)`;
      
      // Add meal selection information if available
      if (showMealSelection && (selectedMeal === 'lunch' || selectedMeal === 'dinner')) {
        const totalItems = getTotalSelectedItems();
        if (totalItems > 0) {
          successMessage += ` با ${totalItems} مورد از پیش انتخاب شده`;
        }
      }
    }
  } else {
    successMessage = `تم حجز ${getActivityName(activeBooking, 'ar')} الخاص بك للتاريخ ${dateString} الساعة ${selectedTime}`;
    if (activeBooking === 'table') {
      const tableInfo = restaurantTables.find(t => t.id === selectedTable);
      successMessage += ` (${getMealName(selectedMeal, 'ar')}، طاولة ${selectedTable} - ${tableInfo?.seats} مقاعد)`;
      
      // Add meal selection information if available
      if (showMealSelection && (selectedMeal === 'lunch' || selectedMeal === 'dinner')) {
        const totalItems = getTotalSelectedItems();
        if (totalItems > 0) {
          successMessage += ` مع ${totalItems} عناصر محددة مسبقًا`;
        }
      }
    }
  }
  
  toast({
    title: successMessage,
  });
  
  // Reset selection
  resetSelections();
};
