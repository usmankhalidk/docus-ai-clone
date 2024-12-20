import { EditModalProps, EditType } from '@/app/types/overview';
import React from 'react';
import { IoClose } from "react-icons/io5";


const getModalConfig = (type: EditType) => {
  const config = {
    age: {
      title: 'Edit Age',
      placeholder: '23',
      unit: 'years',
    },
    height: {
      title: 'Edit Height',
      placeholder: '5.11',
      unit: 'ft',
    },
    weight: {
      title: 'Edit Weight',
      placeholder: '76',
      unit: 'lbs',
    },
  };
  return config[type];
};

export const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const config = getModalConfig(type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[400px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-800">{config.title}</h2>
          <button onClick={onClose}>
            <IoClose className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">Please enter your actual {type}.</p>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">{type.charAt(0).toUpperCase() + type.slice(1)}</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="w-24 p-2 border rounded-md"
              placeholder={config.placeholder}
            />
            <span className="text-gray-600">{config.unit}</span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-teal-600 hover:bg-gray-50 rounded-md"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-teal-100 text-teal-600 rounded-md hover:bg-teal-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};