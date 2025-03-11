
import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';

interface RouteMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destination: string;
}

const RouteMapDialog: React.FC<RouteMapDialogProps> = ({
  open,
  onOpenChange,
  destination
}) => {
  const { language } = useLanguage();
  const hotelLocation = "Dubai Marina"; // Default hotel location
  
  // Encode the origin and destination for the Google Maps URL
  const encodedOrigin = encodeURIComponent(hotelLocation);
  const encodedDestination = encodeURIComponent(destination);
  
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY_HERE&origin=${encodedOrigin}&destination=${encodedDestination}&mode=driving&region=ae&language=${language}`;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-4 bg-hotel-gold text-white">
          <DialogTitle className="flex items-center justify-between">
            <span>
              {language === 'en' ? 'Route to Destination' : 
               language === 'fa' ? 'مسیر به مقصد' : 
               'الطريق إلى الوجهة'}
            </span>
            <DialogClose className="rounded-full p-1 hover:bg-white/20">
              <X className="w-5 h-5" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        
        <div className="h-[400px] w-full relative">
          <div className="absolute inset-0 bg-hotel-cream flex items-center justify-center">
            {/* Replace this with your embedded Google Maps iframe once you have an API key */}
            <div className="text-center p-4">
              <p className="mb-2 text-hotel-charcoal">
                {language === 'en' ? 'Route from' : 
                 language === 'fa' ? 'مسیر از' : 
                 'المسار من'}
              </p>
              <p className="font-bold text-hotel-charcoal mb-2">{hotelLocation}</p>
              <p className="mb-2 text-hotel-charcoal">
                {language === 'en' ? 'to' : 
                 language === 'fa' ? 'به' : 
                 'إلى'}
              </p>
              <p className="font-bold text-hotel-charcoal">{destination}</p>
              
              <p className="mt-4 text-sm text-gray-500">
                {language === 'en' ? 'Google Maps API key required to display interactive map' : 
                 language === 'fa' ? 'کلید API گوگل مپ برای نمایش نقشه تعاملی مورد نیاز است' : 
                 'مطلوب مفتاح API لخرائط Google لعرض الخريطة التفاعلية'}
              </p>
            </div>
            
            {/* When you have the API key, uncomment this: */}
            {/* <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RouteMapDialog;
