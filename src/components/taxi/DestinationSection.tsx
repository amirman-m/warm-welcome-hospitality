
import React from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LocationSearchInput from '@/components/LocationSearchInput';
import SelectedLocationDisplay from '@/components/SelectedLocationDisplay';

interface DestinationSectionProps {
  destination: string;
  setDestination: (value: string) => void;
  selectedDestination: string;
  setSelectedDestination: (address: string) => void;
  setSelectedPlaceId: (placeId: string) => void;
  onViewRoute: () => void;
  apiLoaded: boolean;
}

const popularDestinations = [
  {
    key: 'airport' as const,
    icon: <MapPin className="w-4 h-4" />
  },
  {
    key: 'cityCenter' as const,
    icon: <MapPin className="w-4 h-4" />
  },
  {
    key: 'mall' as const,
    icon: <MapPin className="w-4 h-4" />
  },
  {
    key: 'beach' as const,
    icon: <MapPin className="w-4 h-4" />
  },
  {
    key: 'trainStation' as const,
    icon: <MapPin className="w-4 h-4" />
  }
];

const DestinationSection: React.FC<DestinationSectionProps> = ({
  destination,
  setDestination,
  selectedDestination,
  setSelectedDestination,
  setSelectedPlaceId,
  onViewRoute,
  apiLoaded
}) => {
  const { language } = useLanguage();
  
  const handleSelectDestination = (address: string, placeId: string) => {
    setDestination(address);
    setSelectedDestination(address);
    setSelectedPlaceId(placeId);
  };
  
  const handleSelectPopularDestination = (destKey: 'airport' | 'cityCenter' | 'mall' | 'beach' | 'trainStation') => {
    const dest = getTranslation(destKey, language);
    setDestination(dest);
    setSelectedDestination(dest);
  };
  
  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-medium mb-3 flex justify-between">
        {getTranslation('destination', language)}
      </h2>
      
      {apiLoaded ? (
        <LocationSearchInput
          placeholder={getTranslation('enterDestination', language)}
          value={destination}
          onChange={setDestination}
          onSelect={handleSelectDestination}
          className="pl-10"
        />
      ) : (
        <Input
          type="text"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setSelectedDestination(e.target.value);
          }}
          placeholder={getTranslation('enterDestination', language)}
          className="w-full"
        />
      )}
      
      {/* Selected destination display */}
      {selectedDestination && (
        <SelectedLocationDisplay
          address={selectedDestination}
          onViewRoute={onViewRoute}
        />
      )}
      
      {/* Popular destinations */}
      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-2">
          {getTranslation('popularDestinations', language)}:
        </p>
        <div className="flex flex-wrap gap-2">
          {popularDestinations.map((dest, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="border-gray-200 hover:bg-gray-100 text-gray-700 flex items-center"
              onClick={() => handleSelectPopularDestination(dest.key)}
            >
              {dest.icon}
              <span className="ml-1">{getTranslation(dest.key, language)}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationSection;
