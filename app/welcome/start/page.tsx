'use client';

import { Button, message } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Define the types for selected feature and loading state
const ExploreFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null); // Can be a string or null
  const [loading, setLoading] = useState<boolean>(false); // Loading is a boolean
  const router = useRouter();

  // Handle feature select, accepting a string as the feature name
  const handleFeatureSelect = (feature: string) => {
    setSelectedFeature(feature);
  };

  // Finish handler to proceed to the appropriate route
  const onFinish = (): void => {
    if (!selectedFeature) {
      message.error('Please select a feature to proceed!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      message.success(`${selectedFeature} selected!`);
      const routes: Record<string, string> = { // Use Record type for route mapping
        'Personal AI Doctor': '/dashboard/chat/incomplete',
        'Lab Test Interpretation': '/dashboard/test-results/incomplete',
        'Consultation with Top Doctors': '/dashboard/experts'
      };
      
      router.push(routes[selectedFeature]);
    }, 1000);
  };

  // Define the ButtonProps type for FeatureButton component
  interface ButtonProps {
    title: string;
    description: string;
    selected: boolean;
    onClick: () => void;
  }

  // FeatureButton component with the correct props typing
  const FeatureButton: React.FC<ButtonProps> = ({ title, description, selected, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full p-2 text-left rounded-sm transition-all duration-200 border ${
        selected
        ? 'bg-teal-700/10 border-teal-600'
        : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
    >
      <div className="font-medium text-gray-900 text-[12px]">{title}</div>
      <p className="text-[10px] text-gray-500 mt-1">{description}</p>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/docus-logo.svg"
            alt="Docus"
            width={70}
            height={70}
            className="mb-8"
          />
        </div>

        <div className='px-10'>
          {/* Header */}
          <div className="space-y-2 mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-[12px] font-semibold text-gray-900">
                👌 usman, your general information is set!
              </h2>
            </div>
            <p className="text-lg font-medium text-gray-900">
              Which Docus AI feature would you like to explore first?
            </p>
          </div>

          {/* Feature Buttons */}
          <div className="space-y-3">
            <FeatureButton
              title="Personal AI Doctor"
              description="Ask any health questions and get tailored insights."
              selected={selectedFeature === 'Personal AI Doctor'}
              onClick={() => handleFeatureSelect('Personal AI Doctor')}
            />
            
            <FeatureButton
              title="Lab Test Interpretation"
              description="Easily understand and interpret your lab test results."
              selected={selectedFeature === 'Lab Test Interpretation'}
              onClick={() => handleFeatureSelect('Lab Test Interpretation')}
            />
            
            <FeatureButton
              title="Consultation with Top Doctors"
              description="Access 350+ top doctors from the US and Europe."
              selected={selectedFeature === 'Consultation with Top Doctors'}
              onClick={() => handleFeatureSelect('Consultation with Top Doctors')}
            />
          </div>

          {/* Next Button */}
          <div className='flex justify-center'>
            <Button
              onClick={onFinish}
              loading={loading}
              type='primary'
              className="w-32 h-12 mt-8 bg-[#22A699] hover:bg-[#1A8075] text-white font-medium rounded-lg"
            >
              Next
            </Button>
          </div>

          {/* Skip Link */}
          <div className="mt-6 text-center">
            <Link 
              href="/dashboard" 
              className="text-gray-500 hover:text-gray-700 font-medium underline text-[14px]"
            >
              Skip to My Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreFeatures;
