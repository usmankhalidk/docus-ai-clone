import React, { useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { PiPaperPlaneRightFill } from "react-icons/pi";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  messagesLeft: number;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  messagesLeft,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleAttachment = () => {
    // Implement attachment functionality
    console.log("Attachment clicked");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent">
      <div className="max-w-3xl mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <div className="relative shadow-lg rounded-xl border border-gray-200 bg-white">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={disabled ? "Loading..." : "Type your question here..."}
              className={`w-full p-4 pr-12 pl-12 max-h-48 rounded-xl focus:outline-none resize-none overflow-y-auto
                ${disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"}`}
              disabled={disabled}
              rows={1}
              style={{
                minHeight: "56px",
                maxHeight: "200px"
              }}
            />
            <button
              type="button"
              onClick={handleAttachment}
              disabled={disabled}
              className={`absolute left-2 bottom-3 text-gray-500 p-2 hover:bg-gray-100 rounded-lg transition-colors
                ${disabled && "opacity-50 cursor-not-allowed"}`}
            >
              <CgAttachment className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={disabled || !message.trim()}
              className={`absolute right-2 bottom-3 p-2 rounded-lg transition-colors
                ${
                  disabled || !message.trim()
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-teal-600 hover:text-teal-700"
                }`}
            >
              <PiPaperPlaneRightFill className="w-5 h-5" />
            </button>
          </div>
        </form>
        <div className="mt-2 text-sm text-gray-500 text-center">
          {messagesLeft} of 3 messages left.{" "}
          <button className="text-teal-600 hover:underline">
            Upgrade limits!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;