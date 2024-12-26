'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Message } from '@/app/types/chat';
import { dummyMessages } from '@/app/utils/dummyMessages';
import LoadingMessage from '@/app/component/ChatComponents/PersonalComponents/LoadingMessage';
import ChatMessage from '@/app/component/ChatComponents/PersonalComponents/ChatMessage';
import SuggestedQuestions from '@/app/component/ChatComponents/PersonalComponents/SuggestedQuestions';
import ChatInput from '@/app/component/ChatComponents/PersonalComponents/ChatInput';


const suggestedQuestions = [
  {
    id: '1',
    text: 'What are the best ways to manage my ongoing health condition effectively?'
  },
  {
    id: '2',
    text: 'Are there any new treatments available for my specific health concerns?'
  }
];

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const chatId = params.id as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const chatMessages = dummyMessages[chatId] || [];
        setMessages(chatMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (chatId) {
      loadMessages();
    }
  }, [chatId]);

  const handleSendMessage = async (content: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Add loading message
    const loadingMessage: Message = {
      id: 'loading',
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      loading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    // Simulate AI response
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Remove loading message and add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Here's a response to: "${content}"`,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => prev.filter(m => !m.loading).concat(aiMessage));
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(m => !m.loading));
    }
  };

  const handleQuestionSelect = (question: string) => {
    handleSendMessage(question);
  };

  const messagesLeft = 3 - messages.filter(m => m.sender === 'user').length;

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <>
            <LoadingMessage />
            <LoadingMessage />
          </>
        ) : (
          <>
            
              <ChatMessage messages={messages} />
           
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                No messages yet. Start a conversation!
              </div>
            )}
          </>
        )}
        <SuggestedQuestions
          questions={suggestedQuestions}
          onQuestionSelect={handleQuestionSelect}
        />
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        messagesLeft={messagesLeft}
        disabled={isLoading}
      />
    </div>
  );
}
