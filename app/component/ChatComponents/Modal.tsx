import { Modal as AntdModal, Button } from 'antd';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartNewChat: () => void;
}

const ChatHistoryModal = ({ isOpen, onClose, onStartNewChat }: ModalProps) => {
  return (
    <AntdModal
      title="No Chat History"
      visible={isOpen}
      onCancel={onClose}
      footer={null} // No default footer
      width={400}
      centered // Ensures the modal is centered on the screen
    >
      <p className="text-gray-600">Start a new conversation to see your chat history here.</p>

      {/* Container div for positioning the button */}
      <div className="flex justify-end mt-4">
        <Button 
          type="primary"
          onClick={onStartNewChat} // Function to start new chat
          className="w-auto" // Remove full width
        >
          Start New Chat
        </Button>
      </div>
    </AntdModal>
  );
};

export default ChatHistoryModal;
