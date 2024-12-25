import { Message } from "@/app/types/chat";
import React from "react";
import LoadingMessage from "./LoadingMessage";
import Image from "next/image";

interface ChatMessageProps {
  messages: Message[]; // Note: Changed to accept array of messages
}

const ChatMessage: React.FC<ChatMessageProps> = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return (
        <div className="h-full flex items-center justify-center">
       
          <Image
            src="/assets/chat-doctor.svg" // Replace with your actual logo path
            height={90}
            width={90}
            alt="Personal AI Doctor"
            className="object-cover rounded-full"
          />
        
      </div>
    );
  }

  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex p-4 ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex max-w-3xl w-full ${
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex flex-col ${
                message.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="font-medium text-sm sm:text-base">
                  {message.sender === "user" ? "Usman" : "AI Doctor"}
                </div>
                {message.sender === "ai" && (
                  <button className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm">
                    Report Issue
                  </button>
                )}
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border max-w-full w-auto">
                {message.loading ? <LoadingMessage /> : message.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatMessage;
