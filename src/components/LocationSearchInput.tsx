
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LocationSearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (address: string, placeId: string) => void;
  className?: string;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  placeholder,
  value,
  onChange,
  onSelect,
  className
}) => {
  const { language, direction } = useLanguage();
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Google Maps Autocomplete service
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      sessionToken.current = new google.maps.places.AutocompleteSessionToken();
    } else {
      console.error('Google Maps JavaScript API not loaded');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    if (inputValue.length >= 2) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const fetchSuggestions = (input: string) => {
    if (!autocompleteService.current) return;
    
    setLoading(true);
    
    const request: google.maps.places.AutocompletionRequest = {
      input,
      sessionToken: sessionToken.current,
      componentRestrictions: { country: 'ae' }, // Restrict to UAE/Dubai
      types: ['geocode', 'establishment'],
      language: language // Use current language
    };
    
    autocompleteService.current.getPlacePredictions(
      request,
      (predictions, status) => {
        setLoading(false);
        
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }
    );
  };

  const handleSelectSuggestion = (suggestion: google.maps.places.AutocompletePrediction) => {
    onSelect(suggestion.description, suggestion.place_id);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={inputRef}>
      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn(
            "w-full px-4 py-3 rounded-lg border border-hotel-cream bg-white focus:outline-none focus:ring-2 focus:ring-hotel-gold transition-all",
            className
          )}
          dir={direction}
        />
        <MapPin className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-hotel-gold left-3" />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-hotel-cream rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="px-4 py-2 hover:bg-hotel-cream cursor-pointer text-start"
              onClick={() => handleSelectSuggestion(suggestion)}
              dir={direction}
            >
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-hotel-gold mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">{suggestion.structured_formatting.main_text}</p>
                  <p className="text-xs text-gray-500">{suggestion.structured_formatting.secondary_text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {loading && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-hotel-cream rounded-lg shadow-lg py-4 text-center">
          <div className="animate-pulse text-sm text-gray-500">
            {language === 'en' ? 'Loading suggestions...' : 
             language === 'fa' ? 'در حال بارگیری پیشنهادات...' : 
             'جار تحميل الاقتراحات...'}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearchInput;
