'use client'


import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { BiBell } from 'react-icons/bi'
import { FaArrowLeft } from 'react-icons/fa'

export default function Notifications() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <button 
            onClick={() => router.back()} 
            className="hover:text-gray-600 transition-colors"
          >
            <FaArrowLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center text-center mt-32">
          <BiBell className="w-12 h-12 text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            You don't have any notification yet
          </h2>
          <p className="text-gray-500 mb-8">
            There are currently no notifications to display.
          </p>
          <Button 
            onClick={() => router.push('/dashboard')}
            type='primary'
            className="px-6 py-3 "
          >
            Go to My Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

