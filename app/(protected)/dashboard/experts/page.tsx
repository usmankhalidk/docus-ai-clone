'use client';

import React, { useState } from 'react';
import { Card, Select, Pagination } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import DoctorCard, { COUNTRY_OPTIONS, SPECIALTY_OPTIONS } from '@/app/component/ExpertsComponent/DoctorCard';
import { DOCTORS_DATA } from '@/app/data/DoctorData';

const Experts: React.FC = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');

  const handleDoctorClick = (id: number): void => {
    router.push(`/dashboard/experts/${id}`);
  };
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={handleBackClick}>
        <FaArrowLeft className="w-5 h-5 text-black "  />
        <h1 className="text-xl font-semibold text-black">Choose Top Doctor</h1>
      </div>

      {/* Filter Section */}
      <div className="flex flex-row gap-4 mb-8">
        <Select<string>
          placeholder="Select Country"
          className="h-12"
          style={{ width: '240px' }}
          options={COUNTRY_OPTIONS}
          value={selectedCountry}
          onChange={setSelectedCountry}
        />
        <Select<string>
          placeholder="Enter specialty, sub-specialty or disease"
          className="h-12"
          style={{ width: '320px' }}
          options={SPECIALTY_OPTIONS}
          value={selectedSpecialty}
          onChange={setSelectedSpecialty}
        />
      </div>

      {/* Doctors Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {DOCTORS_DATA.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onClick={handleDoctorClick}
          />
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center">
        <Pagination
          defaultCurrent={1}
          total={50}
          onChange={(page: number) => console.log('Page:', page)}
        />
      </div>
    </div>
  );
};

export default Experts;
