
import React, { useState, useRef, useEffect } from 'react';
import { CircleDot, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { TableInfo, MapViewState } from '@/types/booking';

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
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Map view state for panning and zooming
  const [mapView, setMapView] = useState<MapViewState>({
    scale: 1,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    startX: 0,
    startY: 0
  });

  // Handle map panning
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setMapView(prev => ({
      ...prev,
      isDragging: true,
      startX: e.clientX - prev.translateX,
      startY: e.clientY - prev.translateY
    }));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mapView.isDragging) return;
    
    const newTranslateX = e.clientX - mapView.startX;
    const newTranslateY = e.clientY - mapView.startY;
    
    setMapView(prev => ({
      ...prev,
      translateX: newTranslateX,
      translateY: newTranslateY
    }));
  };

  const handleMouseUp = () => {
    setMapView(prev => ({
      ...prev,
      isDragging: false
    }));
  };

  // Handle zoom in and out
  const handleZoomIn = () => {
    setMapView(prev => ({
      ...prev,
      scale: Math.min(prev.scale + 0.2, 2.5)
    }));
  };

  const handleZoomOut = () => {
    setMapView(prev => ({
      ...prev,
      scale: Math.max(prev.scale - 0.2, 0.5)
    }));
  };

  // Reset map view
  const resetMapView = () => {
    setMapView({
      scale: 1,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      startX: 0,
      startY: 0
    });
  };

  // Add wheel event listener for zooming
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!mapContainerRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
      
      const delta = -Math.sign(e.deltaY) * 0.1;
      const newScale = Math.max(0.5, Math.min(2.5, mapView.scale + delta));
      
      setMapView(prev => ({
        ...prev,
        scale: newScale
      }));
    };
    
    const mapContainer = mapContainerRef.current;
    if (mapContainer) {
      mapContainer.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (mapContainer) {
        mapContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [mapView.scale]);

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
        className="absolute flex items-center justify-center transition-all duration-200"
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

  const mapStyle = {
    transform: `scale(${mapView.scale}) translate(${mapView.translateX}px, ${mapView.translateY}px)`,
    transformOrigin: 'center',
    cursor: mapView.isDragging ? 'grabbing' : 'grab'
  };

  return (
    <div className="bg-hotel-cream p-4 rounded-lg mb-4">
      <h4 className="text-sm font-medium mb-3 flex items-center">
        <CircleDot className="w-4 h-4 mr-1" />
        {language === 'en' ? 'Select a table' : language === 'fa' ? 'انتخاب میز' : 'اختر طاولة'}
      </h4>
      
      {/* Restaurant Map Controls */}
      <div className="flex justify-end gap-2 mb-2">
        <button 
          onClick={handleZoomIn}
          className="p-1 bg-white rounded-md shadow-sm hover:bg-gray-100"
          aria-label="Zoom in"
        >
          <ZoomIn size={16} />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-1 bg-white rounded-md shadow-sm hover:bg-gray-100"
          aria-label="Zoom out"
        >
          <ZoomOut size={16} />
        </button>
        <button 
          onClick={resetMapView}
          className="p-1 bg-white rounded-md shadow-sm hover:bg-gray-100"
          aria-label="Reset view"
        >
          <Move size={16} />
        </button>
      </div>
      
      {/* Restaurant Map Layout */}
      <div 
        ref={mapContainerRef}
        className="relative w-full h-[450px] bg-gray-100 rounded-lg overflow-hidden mb-2"
      >
        {/* Draggable map content */}
        <div
          ref={mapRef}
          className="absolute inset-0 w-full h-full transition-transform"
          style={mapStyle}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Restaurant boundary */}
          <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded-lg"></div>
          
          {/* Render tables */}
          {tables.map(table => renderTable(table))}
        </div>
        
        {/* Legend (fixed position) */}
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
