'use client';
import FooterSection from '@/app/component/ChatComponents/FooterSection';
import HeaderSection from '@/app/component/ChatComponents/HeaderSection';
import ChatHistoryModal from '@/app/component/ChatComponents/Modal';
import OptionCard from '@/app/component/ChatComponents/OptionCard';
import { useState } from 'react';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartNewChat = () => {
    console.log('Starting a new chat...');
    setIsModalOpen(false); // Close the modal after starting the new chat
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <HeaderSection />

      {/* Options Section */}
      <div className="flex gap-6">
      <OptionCard
        title="Personal AI Doctor"
        description="Has memory. Uses your health data for tailored insights."
        href="/chat/personal  "
        imageSrc="/assets/personal-ai-doctor.svg" // Replace with your image path or URL
      />
      <OptionCard
        title="General AI Doctor"
        description="No memory. General advice, no previous data used."
        href="/general-ai-doctor"
        imageSrc="/assets/personal-ai-doctor.svg" // Replace with your image path or URL
      />
      </div>

      {/* Footer Section */}
      <FooterSection onOpenModal={() => setIsModalOpen(true)} />

       {/* Modal Component */}
       <ChatHistoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onStartNewChat={handleStartNewChat} 
      />
    </div>
  );
}
