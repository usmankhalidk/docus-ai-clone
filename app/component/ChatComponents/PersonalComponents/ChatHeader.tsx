'use client';

import { Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import { FaChevronDown, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import AIMemoryModal from '../../ui/AIMemoryModal';
import ChatModeSelector from '../../ui/ChatModeSelector';
import { useRouter } from 'next/navigation';


const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className="flex items-center space-x-2">
        <Image
          src="/placeholder.svg"
          alt="General Chat"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span>General Chat</span>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className="flex items-center space-x-2">
        <Image
          src="/placeholder.svg"
          alt="Health Chat"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span>Health Chat</span>
      </div>
    ),
  },
];

export default function ChatHeader() {
  const router = useRouter();
  return (
    <div className=" bg-white">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
       <ChatModeSelector/>

        <div className="flex items-center space-x-2">
          <AIMemoryModal />
          <Button type="text" className="flex items-center justify-center w-12 h-12" onClick={()=>router.push('/dashboard/chat')}>
            <FaPlus className="w-12 h-12 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}