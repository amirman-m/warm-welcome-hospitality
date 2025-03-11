
import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { Check, Copy, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BookingConfirmationProps {
  bookingType: string;
  confirmationCode: string;
  onClose: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ 
  bookingType, 
  confirmationCode, 
  onClose 
}) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  // QR code value contains booking info
  const qrValue = `BOOKING:${bookingType}:${confirmationCode}`;
  
  useEffect(() => {
    // Reset copied state after 2 seconds
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(confirmationCode);
    setCopied(true);
    toast({
      title: language === 'en' 
        ? 'Confirmation code copied to clipboard' 
        : language === 'fa' 
          ? 'کد تایید در کلیپ بورد کپی شد' 
          : 'تم نسخ رمز التأكيد إلى الحافظة'
    });
  };
  
  const downloadQRCode = () => {
    const canvas = document.getElementById('booking-qrcode')?.querySelector('canvas');
    if (!canvas) return;
    
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `booking-${confirmationCode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: language === 'en' 
        ? 'QR Code downloaded' 
        : language === 'fa' 
          ? 'کد QR دانلود شد' 
          : 'تم تنزيل رمز QR'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg animate-scale-up text-center">
        <div className="mb-4">
          <div className="size-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <Check className="size-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold">
            {language === 'en' 
              ? 'Booking Confirmed!' 
              : language === 'fa' 
                ? 'رزرو تایید شد!' 
                : 'تم تأكيد الحجز!'}
          </h2>
        </div>
        
        <div id="booking-qrcode" className="mb-6 flex justify-center">
          <QRCodeSVG 
            value={qrValue} 
            size={180}
            level="H"
            includeMargin={true}
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        </div>
        
        <div className="mb-6">
          <p className="text-gray-500 mb-2">
            {language === 'en' 
              ? 'Your confirmation code' 
              : language === 'fa' 
                ? 'کد تایید شما' 
                : 'رمز التأكيد الخاص بك'}
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="bg-gray-100 p-3 rounded-lg text-2xl font-bold tracking-wider">
              {confirmationCode}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyToClipboard}
              className="shrink-0"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-6">
          {language === 'en' 
            ? 'Please take a photo of this QR code or note down the 5-digit number and provide it to the responsible partner upon arrival.' 
            : language === 'fa' 
              ? 'لطفاً از این کد QR عکس بگیرید یا کد 5 رقمی را یادداشت کنید و هنگام ورود به مسئول مربوطه ارائه دهید.' 
              : 'يرجى التقاط صورة لرمز QR هذا أو تدوين الرقم المكون من 5 أرقام وتقديمه إلى الشريك المسؤول عند الوصول.'}
        </p>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={downloadQRCode}
            className="flex-1"
          >
            <Download className="size-4 mr-2" />
            {language === 'en' 
              ? 'Download QR' 
              : language === 'fa' 
                ? 'دانلود QR' 
                : 'تنزيل رمز QR'}
          </Button>
          <Button 
            variant="hotel" 
            onClick={onClose}
            className="flex-1"
          >
            {language === 'en' 
              ? 'Done' 
              : language === 'fa' 
                ? 'تمام' 
                : 'تم'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
