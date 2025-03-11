
export type MealType = 'breakfast' | 'lunch' | 'dinner';
export type ActivityType = 'table' | 'tennis' | 'basketball' | 'coffee';

export interface MenuItem {
  id: number;
  name: string;
  nameAr: string;
  nameFa: string;
  quantity: number;
}

export interface TableInfo {
  id: number;
  available: boolean;
  seats: number;
  position: {
    row: number;
    col: number;
    type: 'square' | 'rectangle' | 'circle';
    orientation?: 'vertical' | 'horizontal';
  };
}

export interface MapViewState {
  scale: number;
  translateX: number;
  translateY: number;
  isDragging: boolean;
  startX: number;
  startY: number;
}
