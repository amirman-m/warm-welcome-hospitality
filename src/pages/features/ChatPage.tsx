
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/utils/translations';
import BackButton from '@/components/BackButton';
import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';
import DynamicBackground from '@/components/chat/DynamicBackground';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { language, direction } = useLanguage();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initialize messages with welcome message
  useEffect(() => {
    if (!initialized) {
      try {
        const welcomeMessage = getTranslation('howCanIHelp', language);
        console.log("Setting initial welcome message:", welcomeMessage);
        
        setMessages([{
          id: 1,
          text: welcomeMessage,
          isBot: true,
          timestamp: new Date(),
        }]);
        
        setInitialized(true);
      } catch (error) {
        console.error("Error setting initial message:", error);
      }
    }
  }, [language, initialized]);

  // Show chat after delay
  useEffect(() => {
    console.log("Starting timer to show chat...");
    const timer = setTimeout(() => {
      console.log("Timer complete - Setting showChat to true");
      setShowChat(true);
    }, 3000); // Reduced from 5000ms to 3000ms for better UX

    return () => {
      console.log("Clearing timer");
      clearTimeout(timer);
    };
  }, []);

  // Scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollAreaRef.current && showChat) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, showChat]);

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

  console.log("Chat page state:", { initialized, showChat, messagesCount: messages.length });

  return (
    <DynamicBackground>
      <div className={`min-h-screen flex flex-col ${direction === 'rtl' ? 'font-vazirmatn' : 'font-inter'}`}>
        <BackButton />
        
        {showChat ? (
          <div className="flex-1 flex flex-col p-4 pb-20 max-w-3xl mx-auto w-full animate-slide-up">
            <div className="text-center mb-4 animate-fade-in glass-effect rounded-xl p-4">
              <h1 className="text-xl font-semibold text-white">
                {getTranslation('hotelOnline', language)}
              </h1>
              <p className="text-white/80 text-sm mt-1">
                {getTranslation('askAnyQuestion', language)}
              </p>
            </div>
            
            {initialized && (
              <MessageList 
                messages={messages}
                scrollAreaRef={scrollAreaRef}
                onQuickQuestionClick={handleQuickQuestion}
              />
            )}
            
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={handleSendMessage}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center animate-pulse p-6 glass-effect rounded-2xl max-w-sm mx-auto">
              <h1 className="text-2xl font-bold text-white mb-2">
                {getTranslation('welcomeToHotel', language)}
              </h1>
              <p className="text-white/80">
                {getTranslation('loadingChat', language)}
              </p>
            </div>
          </div>
        )}
      </div>
    </DynamicBackground>
  );
};

export default ChatPage;
