
import { MenuItem, TableInfo } from '@/types/booking';

// Define restaurant tables
export const restaurantTables: TableInfo[] = [
  // First row (top)
  { id: 1, available: true, seats: 4, position: { row: 0, col: 0, type: 'square' } },
  { id: 2, available: false, seats: 4, position: { row: 0, col: 2, type: 'square' } },
  { id: 3, available: true, seats: 4, position: { row: 0, col: 4, type: 'square' } },
  { id: 4, available: true, seats: 4, position: { row: 0, col: 6, type: 'square' } },
  { id: 5, available: false, seats: 4, position: { row: 0, col: 8, type: 'square' } },
  
  // Second row (center top)
  { id: 6, available: true, seats: 6, position: { row: 2, col: 1, type: 'rectangle', orientation: 'horizontal' } },
  { id: 7, available: true, seats: 6, position: { row: 2, col: 5, type: 'rectangle', orientation: 'horizontal' } },
  
  // Third row (center)
  { id: 8, available: false, seats: 8, position: { row: 4, col: 3, type: 'rectangle', orientation: 'horizontal' } },
  
  // Fourth row (center bottom)
  { id: 9, available: true, seats: 6, position: { row: 6, col: 2, type: 'rectangle', orientation: 'horizontal' } },
  { id: 10, available: true, seats: 4, position: { row: 6, col: 6, type: 'square' } },
  
  // Fifth row (bottom)
  { id: 11, available: false, seats: 4, position: { row: 8, col: 0, type: 'square' } },
  { id: 12, available: true, seats: 4, position: { row: 8, col: 2, type: 'square' } },
  { id: 13, available: true, seats: 4, position: { row: 8, col: 4, type: 'square' } },
  { id: 14, available: true, seats: 4, position: { row: 8, col: 6, type: 'square' } },
  { id: 15, available: true, seats: 4, position: { row: 8, col: 8, type: 'square' } },
];

// Menu items
export const drinks: MenuItem[] = [
  { id: 1, name: 'Water', nameAr: 'ماء', nameFa: 'آب', quantity: 0 },
  { id: 2, name: 'Soft Drink', nameAr: 'مشروب غازي', nameFa: 'نوشابه', quantity: 0 },
  { id: 3, name: 'Fresh Juice', nameAr: 'عصير طازج', nameFa: 'آبمیوه تازه', quantity: 0 },
  { id: 4, name: 'Coffee', nameAr: 'قهوة', nameFa: 'قهوه', quantity: 0 },
  { id: 5, name: 'Tea', nameAr: 'شاي', nameFa: 'چای', quantity: 0 },
];

export const desserts: MenuItem[] = [
  { id: 1, name: 'Ice Cream', nameAr: 'آيس كريم', nameFa: 'بستنی', quantity: 0 },
  { id: 2, name: 'Cake', nameAr: 'كيك', nameFa: 'کیک', quantity: 0 },
  { id: 3, name: 'Fruit Salad', nameAr: 'سلطة فواكه', nameFa: 'سالاد میوه', quantity: 0 },
];

export const meals: MenuItem[] = [
  { id: 1, name: 'Grilled Chicken', nameAr: 'دجاج مشوي', nameFa: 'مرغ کبابی', quantity: 0 },
  { id: 2, name: 'Vegetarian Pasta', nameAr: 'باستا نباتية', nameFa: 'پاستا گیاهی', quantity: 0 },
  { id: 3, name: 'Beef Steak', nameAr: 'ستيك لحم', nameFa: 'استیک گوشت', quantity: 0 },
  { id: 4, name: 'Seafood Platter', nameAr: 'طبق مأكولات بحرية', nameFa: 'بشقاب غذای دریایی', quantity: 0 },
];

// Helper functions for time slots
export const generateTimeSlots = (start: string, end: string): string[] => {
  const slots: string[] = [];
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  
  let currentHour = startHour;
  let currentMinute = startMinute;
  
  while (
    currentHour < endHour || 
    (currentHour === endHour && currentMinute <= endMinute)
  ) {
    slots.push(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);
    
    currentMinute += 15;
    if (currentMinute >= 60) {
      currentHour += 1;
      currentMinute = 0;
    }
  }
  
  return slots;
};
