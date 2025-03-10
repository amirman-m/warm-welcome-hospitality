
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Clock, Wifi, Car } from 'lucide-react';
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
      text: getTranslation('howCanIHelp', language),
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

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
                input.toLowerCase().includes('المسبح') ||
                input.toLowerCase().includes('wifi') ||
                input.toLowerCase().includes('وای‌فای') ||
                input.toLowerCase().includes('واي فاي')) {
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
    }, 800);
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

  const handleQuickQuestion = (questionKey: 'breakfastTimeQuestion' | 'wifiQuestion' | 'taxiQuestion' | 'checkoutTimeQuestion') => {
    const question = getTranslation(questionKey, language);
    setInput(question);
    
    // Focus on input after setting the question
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`min-h-screen bg-hotel-light flex flex-col ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
      <BackButton />
      
      <div className="flex-1 flex flex-col p-4 pb-20 max-w-3xl mx-auto w-full">
        <div className="text-center mb-4 animate-fade-in bg-white rounded-xl p-4 shadow-sm">
          <h1 className="text-xl font-semibold text-hotel-charcoal">
            {getTranslation('hotelOnline', language)}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {getTranslation('askAnyQuestion', language)}
          </p>
        </div>
        
        <ScrollArea ref={scrollAreaRef} className="flex-1 bg-white rounded-xl shadow-sm p-4 mb-4">
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
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                    </Avatar>
                  )}
                  
                  <div className={`${message.isBot 
                    ? 'bg-hotel-gold text-white' 
                    : 'bg-gray-100 text-hotel-charcoal'} 
                    px-4 py-2 rounded-2xl shadow-sm`}
                  >
                    <p>{message.text}</p>
                    <div className={`text-xs opacity-70 mt-1 ${message.isBot ? 'text-white/80' : 'text-gray-500'} ${direction === 'rtl' ? 'text-left' : 'text-right'}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Default questions section - only show if there's just the initial message */}
            {messages.length === 1 && (
              <div className="mt-8 animate-fade-in">
                <p className="text-center text-neutral-500 mb-4">
                  {getTranslation('tapToStart', language)}
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleQuickQuestion('breakfastTimeQuestion')}
                    className="flex items-center gap-2 text-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-hotel-gold/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-hotel-gold" />
                    </div>
                    <span className="text-hotel-charcoal">
                      {getTranslation('breakfastTimeQuestion', language)}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleQuickQuestion('wifiQuestion')}
                    className="flex items-center gap-2 text-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-hotel-gold/10 flex items-center justify-center">
                      <Wifi className="w-4 h-4 text-hotel-gold" />
                    </div>
                    <span className="text-hotel-charcoal">
                      {getTranslation('wifiQuestion', language)}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleQuickQuestion('taxiQuestion')}
                    className="flex items-center gap-2 text-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-hotel-gold/10 flex items-center justify-center">
                      <Car className="w-4 h-4 text-hotel-gold" />
                    </div>
                    <span className="text-hotel-charcoal">
                      {getTranslation('taxiQuestion', language)}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleQuickQuestion('checkoutTimeQuestion')}
                    className="flex items-center gap-2 text-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-hotel-gold/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-hotel-gold" />
                    </div>
                    <span className="text-hotel-charcoal">
                      {getTranslation('checkoutTimeQuestion', language)}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-hotel-light">
          <div className="max-w-3xl mx-auto flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getTranslation('typeMessage', language)}
              className="bg-white shadow-sm h-12 text-base"
            />
            <Button 
              onClick={handleSendMessage} 
              variant="hotel"
              size="lg"
              className="aspect-square p-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
