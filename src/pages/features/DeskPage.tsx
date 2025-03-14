
import React, { useState } from 'react';
import { PhoneCall, User, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LanguageToggle from '@/components/LanguageToggle';
import BackButton from '@/components/BackButton';
import { toast } from '@/hooks/use-toast';

const DeskPage = () => {
  const { language, direction } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleCall = () => {
    setIsCalling(true);
    
    // Simulate call connection
    setTimeout(() => {
      toast({
        title: language === 'en' ? 'Call Connected' : 
               language === 'fa' ? 'تماس برقرار شد' : 
               'تم الاتصال',
        description: language === 'en' ? 'You are now connected to the front desk' : 
                     language === 'fa' ? 'شما اکنون به پذیرش متصل هستید' : 
                     'أنت الآن متصل بمكتب الاستقبال',
      });
      
      // Simulate call duration
      setTimeout(() => {
        setIsCalling(false);
        
        toast({
          title: language === 'en' ? 'Call Ended' : 
                 language === 'fa' ? 'تماس پایان یافت' : 
                 'انتهت المكالمة',
        });
      }, 5000);
    }, 2000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: language === 'en' ? 'Please fill all fields' : 
               language === 'fa' ? 'لطفا همه فیلدها را پر کنید' : 
               'يرجى ملء جميع الحقول',
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: language === 'en' ? 'Message Sent' : 
               language === 'fa' ? 'پیام ارسال شد' : 
               'تم إرسال الرسالة',
        description: language === 'en' ? 'Front desk will respond shortly' : 
                     language === 'fa' ? 'پذیرش به زودی پاسخ خواهد داد' : 
                     'سيرد مكتب الاستقبال قريبًا',
      });
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };
  
  return (
    <div className={`min-h-screen p-6 pt-20 bg-hotel-light ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
      <LanguageToggle />
      <BackButton />
      
      <div className="max-w-lg mx-auto animate-slide-up">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-hotel-gold flex items-center justify-center mb-3">
            <PhoneCall className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-medium text-hotel-charcoal">
            {getTranslation('desk', language)}
          </h1>
        </div>
        
        {/* Call front desk button */}
        <button
          className={`w-full glass-effect rounded-xl p-6 mb-6 flex items-center justify-between transition-all ${
            isCalling ? 'bg-red-50' : 'hover:shadow-md active:scale-98'
          }`}
          onClick={handleCall}
          disabled={isCalling}
        >
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full ${isCalling ? 'bg-red-500 animate-pulse' : 'bg-hotel-gold'} flex items-center justify-center mr-4`}>
              <PhoneCall className="text-white w-6 h-6" />
            </div>
            <div className="text-start">
              <h3 className="font-medium">{getTranslation('callFrontDesk', language)}</h3>
              <p className="text-xs text-hotel-charcoal text-opacity-70">
                {isCalling ? 
                  (language === 'en' ? 'Call in progress...' : 
                   language === 'fa' ? 'تماس در حال انجام...' : 
                   'المكالمة قيد التقدم...') : 
                  (language === 'en' ? 'Connect directly to the front desk' : 
                   language === 'fa' ? 'اتصال مستقیم به پذیرش' : 
                   'اتصل مباشرة بمكتب الاستقبال')}
              </p>
            </div>
          </div>
          {isCalling && (
            <span className="text-sm text-red-500 font-medium">
              {language === 'en' ? 'Calling...' : 
               language === 'fa' ? 'در حال تماس...' : 
               'جاري الاتصال...'}
            </span>
          )}
        </button>
        
        {/* Contact form */}
        <div className="glass-effect rounded-xl p-6 text-start">
          <h2 className="font-medium mb-4">
            {language === 'en' ? 'Send a Message to Front Desk' : 
             language === 'fa' ? 'ارسال پیام به پذیرش' : 
             'إرسال رسالة إلى مكتب الاستقبال'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 flex items-center">
                <User className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Your Name' : 
                 language === 'fa' ? 'نام شما' : 
                 'اسمك'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-hotel-cream bg-white focus:outline-none focus:ring-2 focus:ring-hotel-gold transition-all"
                placeholder={language === 'en' ? 'Enter your name' : 
                            language === 'fa' ? 'نام خود را وارد کنید' : 
                            'أدخل اسمك'}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Your Email' : 
                 language === 'fa' ? 'ایمیل شما' : 
                 'بريدك الإلكتروني'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-hotel-cream bg-white focus:outline-none focus:ring-2 focus:ring-hotel-gold transition-all"
                placeholder={language === 'en' ? 'Enter your email' : 
                            language === 'fa' ? 'ایمیل خود را وارد کنید' : 
                            'أدخل بريدك الإلكتروني'}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Your Message' : 
                 language === 'fa' ? 'پیام شما' : 
                 'رسالتك'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-hotel-cream bg-white focus:outline-none focus:ring-2 focus:ring-hotel-gold transition-all"
                rows={4}
                placeholder={language === 'en' ? 'How can we assist you?' : 
                            language === 'fa' ? 'چگونه می‌توانیم به شما کمک کنیم؟' : 
                            'كيف يمكننا مساعدتك؟'}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-hotel-gold text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="animate-pulse">
                  {language === 'en' ? 'Sending...' : 
                  language === 'fa' ? 'در حال ارسال...' : 
                  'جاري الإرسال...'}
                </span>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Send Message' : 
                   language === 'fa' ? 'ارسال پیام' : 
                   'إرسال رسالة'}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeskPage;
