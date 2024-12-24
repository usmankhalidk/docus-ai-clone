'use client';

import React, { useState, useRef, useEffect } from 'react';
import ChatInput from '@/app/component/ChatComponents/PersonalComponents/ChatInput';
import ChatMessage from '@/app/component/ChatComponents/PersonalComponents/ChatMessage';
import SuggestedQuestions from '@/app/component/ChatComponents/PersonalComponents/SuggestedQuestions';
import SubscriptionModal from '@/app/component/ChatComponents/PersonalComponents/SubscriptionModal';
import { Message, SuggestedQuestion } from '@/app/types/chat';
import ChatHeader from '@/app/component/ChatComponents/PersonalComponents/ChatHeader';

const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: '1',
    text: 'What are the best ways to manage my ongoing health condition effectively?'
  },
  {
    id: '2',
    text: 'Are there any new treatments available for my specific health concerns?'
  }
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm here to help with any health concerns you may have, whether they're new or ongoing. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessages = messages.filter(m => m.sender === 'user').length;
    
    if (userMessages >= 2) {
      setIsModalOpen(true);
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your concern. Let me help you with that...",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuestionSelect = (question: string) => {
    handleSendMessage(question);
  };

  const messagesLeft = 3 - messages.filter(m => m.sender === 'user').length;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      
    <ChatHeader/>
      {/* Main chat area with padding for fixed bottom elements */}
      <div className="flex-1 overflow-y-auto pb-48">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* Messages */}
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />

          {/* Suggested Questions - positioned above the fixed input */}
          <div className="mt-8">
            <SuggestedQuestions
              questions={suggestedQuestions}
              onQuestionSelect={handleQuestionSelect}
            />
          </div>
        </div>
      </div>

      {/* Chat Input is already fixed to bottom */}
      <ChatInput 
        onSendMessage={handleSendMessage} 
        messagesLeft={messagesLeft}
        disabled={messagesLeft <= 0}
      />

      {/* Subscription Modal */}
      <SubscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}