
import React from 'react';
import { Map, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { getTranslation } from '@/utils/translations';

interface SelectedLocationDisplayProps {
  address: string;
  onViewRoute: () => void;
}

const SelectedLocationDisplay: React.FC<SelectedLocationDisplayProps> = ({
  address,
  onViewRoute
}) => {
  const { language, direction } = useLanguage();
  
  if (!address) return null;
  
  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200" dir={direction}>
      <div className="flex items-start gap-2">
        <Map className="w-5 h-5 text-hotel-gold flex-shrink-0 mt-0.5" />
        <div className="flex-1 text-start">
          <h4 className="text-sm font-medium mb-1">
            {getTranslation('selectedDestination', language)}:
          </h4>
          <p className="text-sm text-gray-700">{address}</p>
          
          <div className="mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-hotel-gold text-hotel-gold hover:bg-hotel-gold hover:text-white"
              onClick={onViewRoute}
            >
              <Eye className="w-4 h-4 mr-1" />
              {getTranslation('viewRoute', language)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedLocationDisplay;
