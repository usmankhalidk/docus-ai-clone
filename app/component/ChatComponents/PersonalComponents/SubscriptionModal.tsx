import React from 'react';
import { 
  IoClose, 
  IoCheckmark,
  IoAdd,
  IoChatbubbleEllipsesOutline 
} from "react-icons/io5";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PricingOption {
  price: number;
  interval: 'month';
  billing: string;
  savings?: {
    percentage: number;
  };
}

interface Feature {
  text: string;
  isPremium?: boolean;
}

const PRICING_OPTIONS: PricingOption[] = [
  {
    price: 3.99,
    interval: 'month',
    billing: 'Billed annually $47.88',
    savings: {
      percentage: 33
    }
  },
  {
    price: 5.99,
    interval: 'month',
    billing: 'Billed monthly'
  }
];

const FEATURES: Feature[] = [
  {
    text: '50 messages to AI Doctor / month'
  },
  {
    text: '5 test result interpretations / month'
  },
  {
    text: 'Premium Support',
    isPremium: true
  }
];

const Feature: React.FC<{ feature: Feature }> = ({ feature }) => (
  <div className="flex items-center space-x-2">
    <IoCheckmark className="w-5 h-5 text-teal-500" />
    <span className={feature.isPremium ? 'text-rose-700' : ''}>{feature.text}</span>
  </div>
);

const PricingCard: React.FC<{ option: PricingOption }> = ({ option }) => (
  <button className={`p-4 border rounded-lg ${option.savings ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'} transition-colors`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-lg font-semibold">${option.price}/{option.interval}</span>
      {option.savings && (
        <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded">
          Save {option.savings.percentage}%
        </span>
      )}
    </div>
    <div className="text-sm text-gray-500">{option.billing}</div>
  </button>
);

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`
      fixed inset-0 bg-black/25 flex items-center justify-center z-50
      ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      transition-opacity duration-300
    `}>
      <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <IoClose className="w-6 h-6" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
            <div className="relative">
              <IoChatbubbleEllipsesOutline className="w-12 h-12 text-blue-500" />
              <div className="absolute -right-1 -bottom-1 bg-teal-500 rounded-full p-1">
                <IoAdd className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="text-red-500 text-sm mb-2">Message limit reached.</div>
          <h3 className="text-xl font-semibold mb-4">🚀 Unlock full experience!</h3>
          
          <div className="space-y-4">
            {FEATURES.map((feature, index) => (
              <Feature key={index} feature={feature} />
            ))}
          </div>
        </div>

        {/* Pricing Options */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {PRICING_OPTIONS.map((option, index) => (
            <PricingCard key={index} option={option} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Not sure yet? </span>
          <button className="text-blue-600 hover:underline">Try other features!</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;