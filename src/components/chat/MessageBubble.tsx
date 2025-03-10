
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface MessageBubbleProps {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isBot, timestamp }) => {
  const { language, direction } = useLanguage();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(
      language === 'en' ? 'en-US' : language === 'fa' ? 'fa-IR' : 'ar-SA', 
      { hour: '2-digit', minute: '2-digit' }
    );
  };

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'} items-start gap-2`}>
        {isBot && (
          <Avatar className="mt-1">
            <div className="w-8 h-8 rounded-full bg-hotel-gold flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
          </Avatar>
        )}
        
        <div className={`${isBot 
          ? 'bg-hotel-gold text-white' 
          : 'bg-gray-100 text-hotel-charcoal'} 
          px-4 py-2 rounded-2xl shadow-sm`}
        >
          <p>{text}</p>
          <div className={`text-xs opacity-70 mt-1 ${isBot ? 'text-white/80' : 'text-gray-500'} ${direction === 'rtl' ? 'text-left' : 'text-right'}`}>
            {formatTime(timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
