import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaLock } from 'react-icons/fa';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Adjusted width for slightly narrower box */}
      <div className="relative w-full max-w-xl sm:max-w-lg p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-lg">
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
        <h2 className="text-center text-2xl font-bold mt-5 text-gray-900">Welcome to Docus</h2>

        <p className="text-center text-[13px] text-gray-800 mb-6">
          your personal health companion
        </p>
        
        {/* Image for AI Doctor */}
        <div className="flex justify-center items-center mb-6">
          <Image src="/assets/welcome.svg" alt="Hi, I’m your AI Doctor" height={180} width={180} />
        </div>
        
        {/* Information text */}
        <div className="text-center text-[13px] text-gray-700 mb-6">
          <p>We’re going to ask you some health related questions to personalize your health journey for your unique needs.</p>
        </div>

        {/* Privacy note with lock icon near text */}
        <div className="text-center text-[13px] text-gray-500 mb-6  ">
  
  <p className="text-[12px] max-w-full flex">
  <FaLock className="text-teal-600 mt-1" />  Privacy Note: Your data is confidential and secured by HIPAA and GDPR standards.
  </p>
</div>


        {/* Start Button */}
        <div className="flex justify-center">
          <Link
            passHref
            href={'/welcome/primary-goal'}
            className="bg-teal-600 text-white font-bold rounded py-2 px-5 text-[13px] hover:bg-teal-700 transition-colors duration-300"
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
