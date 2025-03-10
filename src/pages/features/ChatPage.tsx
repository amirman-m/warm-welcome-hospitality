
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import BackButton from '@/components/BackButton';
import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';

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

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
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

  const handleQuickQuestion = (questionKey: 'breakfastTimeQuestion' | 'wifiQuestion' | 'taxiQuestion' | 'checkoutTimeQuestion') => {
    const question = getTranslation(questionKey, language);
    setInput(question);
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
        
        <MessageList 
          messages={messages}
          scrollAreaRef={scrollAreaRef}
          onQuickQuestionClick={handleQuickQuestion}
        />
        
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;
