import React from 'react';

import { Dropdown, Menu, Button } from 'antd';
import { FaChevronDown, FaPlus } from 'react-icons/fa';
import { BiMicrochip } from 'react-icons/bi';

const ChatHeader = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1" className="flex items-center space-x-2">
        <img
          src="/api/placeholder/24/24"
          alt="General Chat"
          className="w-6 h-6 rounded-full"
        />
        <span>General Chat</span>
      </Menu.Item>
      <Menu.Item key="2" className="flex items-center space-x-2">
        <img
          src="/api/placeholder/24/24"
          alt="Health Chat"
          className="w-6 h-6 rounded-full"
        />
        <span>Health Chat</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side - Dropdown */}
        <Dropdown overlay={menu} trigger={['click']}>
          <Button className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-md">
            <div className="flex items-center">
              <img
                src="/api/placeholder/32/32"
                alt="AI Doctor"
                className="w-8 h-8 rounded-full"
              />
              <span className="ml-2 font-medium">usman's AI Doctor</span>
              <FaChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </div>
          </Button>
        </Dropdown>

        {/* Right side - Buttons */}
        <div className="flex items-center space-x-2">
          <Button className="p-2 hover:bg-gray-100 rounded-full">
            <BiMicrochip className="h-5 w-5 text-gray-600" />
          </Button>
          <Button className="p-2 hover:bg-gray-100 rounded-full">
            <FaPlus className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
