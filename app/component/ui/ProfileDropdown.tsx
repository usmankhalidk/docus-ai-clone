'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export default function ProfileDropdown() {
  // State to handle dropdown open/close
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // State to store timeout ID (for delayed closing of dropdown)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const {logout} = useAuth();
  // Handle mouse enter event to open the dropdown
  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear any existing timeout when mouse enters
    }
    setIsOpen(true); // Open dropdown when hover starts
  };

  // Handle mouse leave event to close the dropdown with a delay
  const handleMouseLeave = () => {
    // Set a timeout to close the dropdown after a short delay
    const id = setTimeout(() => {
      setIsOpen(false); // Close dropdown when hover ends
    }, 200); // Adjust the delay here (200ms)
    setTimeoutId(id); // Store timeout ID to clear it later if needed
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Profile Button with Badge */}
      <button
        className="flex items-center justify-center relative p-0 bg-transparent border-none hover:bg-transparent focus:outline-none"
      >
        {/* Profile Circle with Badge */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/150"  // Placeholder image for now
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
          {/* Badge with "Free" text */}
          <span className="absolute top-0 left-5 bg-blue-500 text-white text-[8px] font-semibold py-0.5 px-2 rounded-full">
            Free
          </span>
        </div>

        {/* Chevron Icon (Down or Up depending on state) */}
        <div className="ml-2">
          {isOpen ? (
            <MdExpandLess className="text-gray-600 h-5 w-5" />
          ) : (
            <MdExpandMore className="text-gray-600 h-5 w-5" />
          )}
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transform transition-all duration-200 ease-in-out">
          <div className="flex p-4">
            {/* Profile and Account Info */}
            <div className="flex-shrink-0">
            <div className="relative">
          <img
            src="https://via.placeholder.com/150"  // Placeholder image for now
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover"
          />
          {/* Badge with "Free" text */}
          <span className="absolute top-0 left-10 bg-blue-500 text-white text-[8px] font-semibold py-0.5 px-2 rounded-full">
            Free
          </span>
        </div>
            </div>
            <div className="ml-4 flex flex-col justify-between">
              <p className="font-semibold text-gray-800">john.doe@example.com</p>
              <p className="text-sm text-gray-500">Account ID: 123456789</p>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200"></div>

          {/* Links */}
          <ul className="py-2">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                Help & Support
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Billing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Account Settings
              </a>
            </li>
            <li className="border-gray-200">
              <button
                
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                onClick={()=>logout()}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
