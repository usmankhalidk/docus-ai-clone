import { Conversation, Message } from "../types/chat";

export const dummyConversations: Conversation[] = [
    {
      id: 'chat-1',
      title: 'Health Consultation',
      lastMessage: "What are the best ways to improve my sleep quality?",
      timestamp: new Date('2024-03-23T10:00:00')
    },
    {
      id: 'chat-2',
      title: 'Fitness Advice',
      lastMessage: "How can I maintain a consistent workout routine?",
      timestamp: new Date('2024-03-22T15:30:00')
    }
  ];
  
  export const dummyMessages: Record<string, Message[]> = {
    'chat-1': [
      {
        id: '1',
        content: "Hello! I'm here to help with any health concerns you may have. How can I assist you today?",
        sender: 'ai',
        timestamp: new Date('2024-03-23T10:00:00')
      },
      {
        id: '2',
        content: "What are the best ways to improve my sleep quality?",
        sender: 'user',
        timestamp: new Date('2024-03-23T10:01:00')
      }
    ],
    'chat-2': [
      {
        id: '1',
        content: "Welcome! How can I help you with your fitness goals today?",
        sender: 'ai',
        timestamp: new Date('2024-03-22T15:30:00')
      }
    ]
  };