'use client';
import { Button, Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaLock, FaUsers } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';

type GoalType = 'personalHealth' | 'healthcareProfessional' | null;

const PrimaryGoal: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<GoalType>(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const router = useRouter(); // useRouter for navigation
  const handleSelectGoal = (goal: GoalType) => {
    setSelectedGoal(goal);
  };
  const handleContinue = () => {
    if (selectedGoal) {
      setLoading(true);

      // Simulate loading and navigate based on the selected goal
      setTimeout(() => {
        // Redirect based on the selected goal type
        if (selectedGoal === 'personalHealth') {
          router.push('/welcome/nickname'); // Redirect for personal health
          localStorage.setItem('goal','personalHealth');
        } else if (selectedGoal === 'healthcareProfessional') {
          router.push('/welcome/nickname'); // Redirect for healthcare professional
          localStorage.setItem('goal','healthcareProfessional');
        }
      }, 2000); // Simulate a 2-second loading time
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Adjusted width for slightly narrower box */}
      <div className="relative w-full max-w-xl sm:max-w-lg p-6 sm:p-8 md:px-20  bg-white rounded-lg shadow-lg">
        {/* Logo in the top-left corner */}
        <div className="absolute top-4 left-4">
          <Image
            src="/images/docus-logo.svg" // Replace with your actual logo URL
            alt="Docus.ai Logo"
            height={70}
            width={70}
          />
        </div>

        {/* Bold and responsive header */}
        <h2 className="text-2xl mt-16 font-semibold  text-gray-900">Hello! 👋</h2>

      
        {/* Information text */}
        <div className="text-lg my-5 text-gray-900">
          <p>How do you plan to use Docus?</p>
        </div>

        {/* Card options for personal health and healthcare professional */}
        <div className="flex justify-center gap-2 mb-6">
          {/* Personal Health Card */}
          <Card
            className="cursor-pointer"
            onClick={() => handleSelectGoal('personalHealth')}
            style={{
              width: 200,
              border: selectedGoal === 'personalHealth' ? '2px solid teal' : '',
            }}
          >
            <h3 className="text-[14px] font-semibold text-teal-600">For Personal Health</h3>
            <p className="text-[12px] text-gray-600 mt-2">
              To understand and manage my or my family member's health conditions.
            </p>
            <div className="absolute bottom-2 right-2">
            <FaUsers className='text-teal-600 h-5 w-5'/>
            </div>
          </Card>

          {/* Healthcare Professional Card */}
          <Card
            className="cursor-pointer relative"
            onClick={() => handleSelectGoal('healthcareProfessional')}
            style={{
              width: 200,
              border: selectedGoal === 'healthcareProfessional' ? '2px solid teal' : '',
            }}
          >
            <h3 className="text-[14px] font-semibold text-teal-600">As a Healthcare Professional</h3>
            <p className="text-left text-[12px] text-gray-600 mt-2">
              To streamline workflows, and save time, improving patient interaction and outcomes.
            </p>

            {/* Icon image at the bottom-right of the card */}
            <div className="absolute bottom-2 right-2">
              <FaUserDoctor className='text-teal-600 h-5 w-5'/>
            </div>
          </Card>
        </div>


        {/* Start Button */}
        <div className="flex justify-center">
        <Button
            type="primary"
            className=" text-white font-bold rounded py-2 px-5 text-[13px]  transition-colors duration-300"
            loading={loading}
            onClick={handleContinue}
            disabled={!selectedGoal} // Disable if no goal is selected
          >
            {selectedGoal ? 'Continue' : 'Select a Goal'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrimaryGoal;
