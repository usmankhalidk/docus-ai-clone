'use client'

import { Dropdown, Button } from 'antd'
import type { MenuProps } from 'antd'
import { FaCheckCircle, FaChevronDown } from 'react-icons/fa'
import Image from 'next/image'
import { useState } from 'react'

interface ChatMode {
  key: string
  title: string
  description: string
  icon: string
}

const chatModes: ChatMode[] = [
  {
    key: 'ai-doctor',
    title: "shahab's AI Doctor",
    description: "Your health details are utilized to offer more personalized advice and insights.",
    icon: "/placeholder.svg"
  },
  {
    key: 'general',
    title: "General Chat",
    description: "General chat doesn't use any saved health details or previous conversations.",
    icon: "/placeholder.svg"
  }
]

export default function ChatModeSelector() {
  const [selectedMode, setSelectedMode] = useState(chatModes[0].key)

  const items: MenuProps['items'] = chatModes.map(mode => ({
    key: mode.key,
    label: (
      <div className="flex items-start gap-3 p-1">
        <Image
          src={mode.icon}
          alt={mode.title}
          width={36}
          height={36}
          className="rounded-full mt-1"
        />
        <div className="flex-1">
          <div className="font-medium text-black">{mode.title}</div>
          <div className="text-sm text-gray-500 mt-0.5">{mode.description}</div>
        </div>
        {selectedMode === mode.key && (
          <FaCheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
        )}
      </div>
    ),
    onClick: () => setSelectedMode(mode.key)
  }))

  const selectedChatMode = chatModes.find(mode => mode.key === selectedMode)

  return (
    <Dropdown 
      menu={{ items }} 
      trigger={['click']}
      overlayClassName="w-[320px]"
    >
      <Button className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-md border-0">
        <div className="flex items-center">
          <Image
            src={selectedChatMode?.icon || "/placeholder.svg"}
            alt={selectedChatMode?.title || "Chat Mode"}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="ml-2 font-medium">{selectedChatMode?.title}</span>
          <FaChevronDown className="ml-2 h-4 w-4 text-gray-500" />
        </div>
      </Button>
    </Dropdown>
  )
}

