import Stepper from '@/app/component/WelcomeComponents/Stepper'
import Image from 'next/image'
import React from 'react'

function General() {
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
    <div className='mt-10'>
    <Stepper basePath='/welcome/health-details/general'/>
    </div>
    </div>
    </div>
  )
}

export default General