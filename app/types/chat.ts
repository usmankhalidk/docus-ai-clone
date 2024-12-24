export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  loading?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
}
