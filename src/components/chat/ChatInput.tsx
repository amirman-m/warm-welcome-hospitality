
import React, { useRef } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getTranslation } from '@/utils/translations';
import { useLanguage } from '@/context/LanguageContext';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 chat-input-container">
      <div className="max-w-3xl mx-auto flex gap-2 px-4">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getTranslation('typeMessage', language)}
          className="bg-white/90 shadow-lg h-12 text-base font-medium border-white/30 text-hotel-charcoal"
        />
        <Button 
          onClick={onSend} 
          variant="hotel"
          size="lg"
          className="aspect-square p-0 shadow-lg"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
