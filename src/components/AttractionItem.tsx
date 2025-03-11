
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Map } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export interface AttractionProps {
  id: string;
  name: {
    en: string;
    fa: string;
    ar: string;
  };
  description: {
    en: string;
    fa: string;
    ar: string;
  };
  distance: {
    en: string;
    fa: string;
    ar: string;
  };
  shortDescription: {
    en: string;
    fa: string;
    ar: string;
  };
  website?: string;
  location: {
    lat: number;
    lng: number;
  };
}

const AttractionItem: React.FC<AttractionProps> = ({
  id,
  name,
  description,
  distance,
  shortDescription,
  website,
  location
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language, direction } = useLanguage();
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const openGoogleMaps = () => {
    // Hotel coordinates (example - should be replaced with actual hotel coordinates)
    const hotelLat = 25.197197;
    const hotelLng = 55.274376;
    
    // Open Google Maps with directions from hotel to attraction
    window.open(
      `https://www.google.com/maps/dir/${hotelLat},${hotelLng}/${location.lat},${location.lng}`,
      '_blank'
    );
  };
  
  return (
    <div className="mb-3 overflow-hidden rounded-lg border border-white/40 transition-all duration-300 hover:shadow-md">
      <div 
        className={cn(
          "flex cursor-pointer items-center justify-between p-4 transition-all duration-300",
          isExpanded 
            ? "bg-hotel-gold/20 backdrop-blur-sm" 
            : "bg-white/70 hover:bg-hotel-gold/10"
        )}
        onClick={toggleExpand}
      >
        <div className="flex flex-1 items-center gap-3 text-start">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-hotel-charcoal">{name[language]}</h3>
            <p className="text-sm text-gray-600">{shortDescription[language]}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="flex items-center gap-1">
              <Map className="h-4 w-4" />
              {distance[language]}
            </span>
          </div>
        </div>
        <div className="ml-4">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-hotel-gold" />
          ) : (
            <ChevronDown className="h-5 w-5 text-hotel-gold" />
          )}
        </div>
      </div>
      
      {/* Expanded content */}
      <div 
        className={cn(
          "bg-white/80 backdrop-blur-sm overflow-hidden transition-all duration-300",
          isExpanded 
            ? "max-h-96 px-4 py-4" 
            : "max-h-0 py-0 px-4"
        )}
      >
        <p className="mb-4 text-hotel-charcoal">
          {description[language]}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {website && (
            <Button 
              variant="outline" 
              size="sm" 
              className="inline-flex items-center border-hotel-gold text-hotel-charcoal hover:bg-hotel-gold hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                window.open(website, '_blank');
              }}
            >
              <ExternalLink className="mr-1 h-4 w-4" />
              {language === 'en' ? 'Visit Website' : 
               language === 'fa' ? 'مشاهده وبسایت' : 'زيارة الموقع'}
            </Button>
          )}
          
          <Button 
            variant="hotel" 
            size="sm" 
            className="inline-flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              openGoogleMaps();
            }}
          >
            <Map className="mr-1 h-4 w-4" />
            {language === 'en' ? 'View on Map' : 
             language === 'fa' ? 'نمایش در نقشه' : 'عرض على الخريطة'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttractionItem;
