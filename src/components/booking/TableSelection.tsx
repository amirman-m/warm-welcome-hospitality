
import React, { useState } from 'react';
import { CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface TableInfo {
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

interface TableSelectionProps {
  tables: TableInfo[];
  selectedTable: number | null;
  setSelectedTable: (tableId: number | null) => void;
}

const TableSelection: React.FC<TableSelectionProps> = ({ 
  tables, 
  selectedTable, 
  setSelectedTable 
}) => {
  const { language } = useLanguage();
  const [hoveredTable, setHoveredTable] = useState<number | null>(null);

  // Render a table in the restaurant map
  const renderTable = (table: TableInfo) => {
    const isSelected = selectedTable === table.id;
    const isHovered = hoveredTable === table.id;
    
    // Define table dimensions based on type
    let tableClassName = '';
    let chairsLayout;
    
    if (table.position.type === 'square') {
      tableClassName = 'w-12 h-12';
      chairsLayout = (
        <>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
        </>
      );
    } else if (table.position.type === 'rectangle' && table.position.orientation === 'horizontal') {
      tableClassName = 'w-24 h-12';
      chairsLayout = (
        <>
          <div className="absolute -top-4 left-1/4 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute -top-4 left-3/4 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute -bottom-4 left-1/4 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute -bottom-4 left-3/4 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
        </>
      );
    } else {
      tableClassName = 'w-16 h-16 rounded-full';
      chairsLayout = (
        <>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-200 border border-blue-300" />
        </>
      );
    }
    
    return (
      <div 
        key={table.id}
        className={`absolute flex items-center justify-center transition-all duration-200`}
        style={{ 
          top: `${table.position.row * 50}px`, 
          left: `${table.position.col * 50}px` 
        }}
      >
        <div className="relative">
          {chairsLayout}
          <button
            disabled={!table.available}
            className={cn(
              `${tableClassName} flex items-center justify-center rounded-lg transition-all duration-200 shadow-md`,
              table.available 
                ? isSelected 
                  ? "bg-hotel-gold text-white scale-110" 
                  : isHovered 
                    ? "bg-hotel-blue bg-opacity-30 text-hotel-charcoal scale-105" 
                    : "bg-white text-hotel-charcoal"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
            onClick={() => table.available && setSelectedTable(table.id)}
            onMouseEnter={() => setHoveredTable(table.id)}
            onMouseLeave={() => setHoveredTable(null)}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">{table.id}</span>
              {(isSelected || isHovered) && (
                <span className="text-xs mt-1 whitespace-nowrap">{table.seats} seats</span>
              )}
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-hotel-cream p-4 rounded-lg mb-4">
      <h4 className="text-sm font-medium mb-3 flex items-center">
        <CircleDot className="w-4 h-4 mr-1" />
        {language === 'en' ? 'Select a table' : language === 'fa' ? 'انتخاب میز' : 'اختر طاولة'}
      </h4>
      
      {/* Restaurant Map Layout */}
      <div className="relative w-full h-[450px] bg-gray-100 rounded-lg overflow-hidden mb-2">
        {/* Restaurant boundary */}
        <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded-lg"></div>
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm text-xs z-10">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-sm bg-white border border-gray-300 mr-2"></div>
            <span>{language === 'en' ? 'Available' : language === 'fa' ? 'در دسترس' : 'متاح'}</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-sm bg-gray-200 mr-2"></div>
            <span>{language === 'en' ? 'Unavailable' : language === 'fa' ? 'رزرو شده' : 'محجوز'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-hotel-gold mr-2"></div>
            <span>{language === 'en' ? 'Selected' : language === 'fa' ? 'انتخاب شده' : 'مختار'}</span>
          </div>
        </div>
        
        {/* Render tables */}
        {tables.map(table => renderTable(table))}
      </div>
      
      {/* Selected table info */}
      {selectedTable && (
        <div className="text-sm text-center p-2 bg-white rounded-lg shadow-sm mt-3 animate-fade-in">
          {language === 'en' 
            ? `Table ${selectedTable} selected (${tables.find(t => t.id === selectedTable)?.seats} seats)`
            : language === 'fa'
              ? `میز ${selectedTable} انتخاب شده (${tables.find(t => t.id === selectedTable)?.seats} صندلی)`
              : `تم اختيار الطاولة ${selectedTable} (${tables.find(t => t.id === selectedTable)?.seats} مقاعد)`
          }
        </div>
      )}
    </div>
  );
};

export default TableSelection;
