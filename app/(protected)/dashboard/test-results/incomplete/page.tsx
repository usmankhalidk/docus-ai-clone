'use client'

import { Button, Card } from "antd"
import Image from "next/image"
import { FaCheckCircle } from "react-icons/fa"


export default function AiDoctor() {
  return (
    <div className="mt-16 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-sm">
        <div className="flex flex-col ">
          {/* Icon */}
          <div className="w-24 h-24 bg-[#E5F0F0] rounded-full flex items-center justify-center mb-6">
            <div className="relative">
              <Image src="/assets/chat-doctor.svg" height={100} width={100} alt="Chat Doctor"/>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
          Lab Test & Screening Interpretations
          </h1>

          {/* Subtitle */}
          <p className="text-[14px] text-gray-500 mb-8">
          Turn medical tests to actionable insights.
          </p>

          {/* Checklist */}
          <div className="space-y-4 text-left w-full mb-8 text-[12px]">
            <div className="flex items-center gap-2">
              <FaCheckCircle className=" text-teal-700 mt-0.5" />
              <span className="text-gray-600">Upload your results</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className=" text-teal-700 mt-0.5" />
              <span className="text-gray-600">Receive detailed interpretations</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className=" text-teal-700 mt-0.5" />
              <span className="text-gray-600">Get insights and recommendations</span>
            </div>
          </div>

          {/* Button */}
          <Button type="primary" className="w-full py-3 rounded-md  transition-colors mb-4">
            Complete Health Profile
          </Button>

          {/* Skip link */}
          <button className="text-gray-500 hover:text-gray-700 transition-colors underline">
            Skip to My Dashboard
          </button>
        </div>
      </Card>
    </div>
  )
}

