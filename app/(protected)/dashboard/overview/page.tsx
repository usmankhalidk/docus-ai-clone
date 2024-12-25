'use client';
import { EditModal } from '@/app/component/ui/EditModal';
import CircularProgressBar from '@/app/component/ui/ProgressBar';
import { EditType, ProfileData } from '@/app/types/overview';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FiEdit2 } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";


const defaultProfileData: ProfileData = {
  age: "23 years",
  height: "5.11'",
  weight: "76 lbs",
  ethnicity: "South Asian",
  sex: "Male",
  completion: 12
};



const InfoItem: React.FC<{
  label: string;
  value: string;
  onClick: () => void;
}> = ({ label, value, onClick }) => (
  <div 
    className="bg-gray-50 p-3 rounded flex justify-between items-center cursor-pointer hover:bg-gray-100"
    onClick={onClick}
  >
    <div className="w-full text-right">
      <span className="block text-sm text-gray-500">{value}</span>
      <span className="block text-xs text-gray-500 mt-1">{label}</span>
    </div>
    <FiEdit2 className="w-4 h-4 text-gray-400 ml-2" />
  </div>
);




const HealthProfile: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editType, setEditType] = useState<EditType>('age');
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);
    const router = useRouter();
  const openModal = (type: EditType) => {
    setEditType(type);
    setModalOpen(true);
  };

  return (
   <div className='bg-gray-100 min-h-screen'>
     <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center mb-6">
        <FaArrowRight className="w-6 h-6 transform rotate-180 text-gray-600 cursor-pointer" onClick={()=>router.push('/dashboard')}/>
        <h1 className="text-2xl font-medium text-gray-800 ml-2">Health Profile</h1>
      </div>

      <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
  <p className="text-gray-600">Complete your health profile to get valuable insights into your health.</p>

  <div className="flex items-center space-x-4"> {/* Added space-x-4 to create space between progress bar and text */}
    {/* Progress Bar Container */}
    <div className="h-1 w-48 bg-gray-200 rounded">
      <div 
        className="h-1 bg-red-500 rounded"
        style={{ width: `${profileData.completion}%` }} 
      />
    </div>

    {/* Completion Text */}
    <span className="text-red-500 text-sm">{profileData.completion}% completed</span>
  </div>
</div>

   
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
  <h2 className="text-lg font-medium text-gray-800 mb-6">General Information</h2>
  
  <div className="flex flex-wrap justify-between"> {/* Using flexbox and wrapping to ensure responsiveness */}
    
    {/* First Column: Age, Height, Weight */}
    <div className="w-full sm:w-2/5 mb-4 sm:mb-0"> {/* Increased width to 2/5 */}
      <div className="space-y-4">
        <InfoItem
          label="Age"
          value={profileData.age}
          onClick={() => openModal('age')}
        />
        <InfoItem
          label="Height"
          value={profileData.height}
          onClick={() => openModal('height')}
        />
        <InfoItem
          label="Weight"
          value={profileData.weight}
          onClick={() => openModal('weight')}
        />
      </div>
    </div>
    
    {/* Second Column: Box with Image centered */}
    <div className="w-full sm:w-1/5 mb-4 sm:mb-0 flex justify-center"> {/* Set width to 1/5 */}
      <Image 
        src="/assets/personModel2.0.svg" 
        height={100} 
        width={100} 
        alt="Person Model" 
      />
    </div>
    
    {/* Third Column: Ethnicity and Sex */}
    <div className="w-full sm:w-2/5 mb-4 sm:mb-0"> {/* Increased width to 2/5 */}
      <div className="text-center space-y-4">
        <div className='bg-gray-50 p-3 rounded flex flex-col justify-start items-start cursor-pointer hover:bg-gray-100'>
          <p className="text-gray-800">{profileData.ethnicity}</p>
          <p className="text-sm text-gray-500">Ethnicity</p>
        </div>
        <div className='bg-gray-50 p-3 rounded flex flex-col justify-start items-start cursor-pointer hover:bg-gray-100'>
          <p className="text-gray-800">{profileData.sex}</p>
          <p className="text-sm text-gray-500">Sex assigned at birth</p>
        </div>
      </div>
    </div>
  </div>
  
</div>



      <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            
              <CircularProgressBar value={30}/>
           
            <h2 className="text-lg font-medium text-gray-800">Main Health Information</h2>
          </div>
          <IoChevronForward className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
         <CircularProgressBar value={0}/>
            <h2 className="text-lg font-medium text-gray-800">Lab Test Interpretation</h2>
          </div>
          <IoChevronForward className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      <EditModal
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        type={editType}
      />
    </div>
   </div>
  );
};

export default HealthProfile;