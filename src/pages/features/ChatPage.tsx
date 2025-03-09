
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import BackButton from '@/components/BackButton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { language, direction } = useLanguage();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: getTranslation('chatWelcomeMessage', language),
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      
      if (input.toLowerCase().includes('breakfast') || 
          input.toLowerCase().includes('صبحانه') || 
          input.toLowerCase().includes('الإفطار')) {
        botResponse = getTranslation('breakfastAnswer', language);
      } else if (input.toLowerCase().includes('checkout') || 
                input.toLowerCase().includes('خروج') || 
                input.toLowerCase().includes('المغادرة')) {
        botResponse = getTranslation('checkoutAnswer', language);
      } else if (input.toLowerCase().includes('pool') || 
                input.toLowerCase().includes('استخر') || 
                input.toLowerCase().includes('المسبح')) {
        botResponse = getTranslation('poolAnswer', language);
      } else {
        botResponse = getTranslation('generalAnswer', language);
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(
      language === 'en' ? 'en-US' : language === 'fa' ? 'fa-IR' : 'ar-SA', 
      { hour: '2-digit', minute: '2-digit' }
    );
  };

  return (
    <div className={`min-h-screen bg-hotel-light flex flex-col ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
      <BackButton />
      
      <div className="flex-1 flex flex-col p-6 pb-20 max-w-3xl mx-auto w-full">
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-2xl font-semibold text-hotel-charcoal">
            {getTranslation('chat', language)}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {getTranslation('chatDescription', language)}
          </p>
        </div>
        
        <ScrollArea className="flex-1 glass-effect rounded-xl p-4 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'} items-start gap-2`}>
                  {message.isBot && (
                    <Avatar className="mt-1">
                      <div className="w-8 h-8 rounded-full bg-hotel-gold flex items-center justify-center">
                        <span className="text-white text-xs font-bold">LH</span>
                      </div>
                    </Avatar>
                  )}
                  
                  <div className={`${message.isBot 
                    ? 'bg-white text-hotel-charcoal' 
                    : 'bg-hotel-gold text-white'} 
                    px-4 py-2 rounded-2xl shadow-sm`}
                  >
                    <p>{message.text}</p>
                    <div className={`text-xs opacity-70 mt-1 ${!message.isBot && 'text-white'} ${direction === 'rtl' ? 'text-left' : 'text-right'}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-hotel-light">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getTranslation('typeMessage', language)}
              className="glass-effect"
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-hotel-gold hover:bg-hotel-gold/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
