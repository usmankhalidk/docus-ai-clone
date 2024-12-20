'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { IoHomeSharp } from 'react-icons/io5';
import { BiBell } from 'react-icons/bi';
import ProfileDropdown from '../../ui/ProfileDropdown';
import { HiMiniSparkles } from 'react-icons/hi2';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b-2">
      <div className="w-full">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center ml-4">
              <div className='p-2 h-10 w-10 rounded-full bg-teal-100 flex justify-center items-center'>
                <IoHomeSharp className='h-5 w-5 text-teal-600'/>
              </div>
              <div className='ml-2'>
                <p className='text-black'>My Dashboard</p>
              </div>
            </div>
           
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4 mr-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <BiBell className="h-6 w-6" />
                </button>
                <button
                  onClick={()=>console.log('click')}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 flex justify-center items-center space-x-2"
                >
                 <HiMiniSparkles className='mr-2'/> Upgrade
                </button>
                <ProfileDropdown/> 
                {/* <Link
                  href="/profile"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link> */}
                {/* <button
                  onClick={logout}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700"
                >
                  Sign Out
                </button> */}
              </div>
            ) : (
              <div className="flex items-center space-x-4 mr-4">
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
                
        </div>
      </div>

      
    </nav>
  );
}