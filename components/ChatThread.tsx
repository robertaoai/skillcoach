'use client';

import { useEffect, useRef } from 'react';
import { ChatBubble } from './ChatBubble';
import { ChatMessage } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatThreadProps {
  messages: ChatMessage[];
}

export function ChatThread({ messages }: ChatThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="h-full pr-4" ref={scrollRef}>
      <div className="space-y-4">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            type={msg.type}
            message={msg.text}
            recommended_action={msg.recommended_action}
            tags={msg.tags}
            explainability={msg.explainability}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
