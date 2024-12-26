'use client';

import React, { useState } from 'react';
import { Modal, Button } from 'antd';

import { BiMicrochip } from 'react-icons/bi';


interface AIMemoryModalProps {
  onClose?: () => void;
}

const AIMemoryModal: React.FC<AIMemoryModalProps> = ({ onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    onClose?.();
  };

 

  return (
    <>
      <Button 
        type="text" 
        className="flex items-center justify-center w-12 h-12"
        onClick={showModal}
      >
        <BiMicrochip className="h-12 w-12 text-gray-600" />
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        width={500}
        centered
        className="rounded-2xl overflow-hidden"
      >
        <div className="py-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-teal-50 p-3 rounded-full">
              <BiMicrochip className="h-8 w-8 text-teal-600" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-4">
            AI Memory Enabled
          </h2>

          <div className="text-center text-gray-600 mb-8 space-y-4">
            <p>
              Personal AI Doctor uses your previously provided health data 
              (from conversations, lab tests, etc.) to offer tailored insights.
            </p>
            <p>
              For general questions or if asking on behalf of someone else, 
              use the General AI Doctor.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
         
            <Button
              size="large"
              onClick={handleClose}
              className="w-full h-12 text-base"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AIMemoryModal;