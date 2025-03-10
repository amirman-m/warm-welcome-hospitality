
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from './MessageBubble';
import QuickQuestions from './QuickQuestions';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  onQuickQuestionClick: (questionKey: 'breakfastTimeQuestion' | 'wifiQuestion' | 'taxiQuestion' | 'checkoutTimeQuestion') => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  scrollAreaRef,
  onQuickQuestionClick
}) => {
  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 glass-effect rounded-xl p-4 mb-4"
    >
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            text={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}

        {messages.length === 1 && (
          <QuickQuestions onQuestionClick={onQuickQuestionClick} />
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
