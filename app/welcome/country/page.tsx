'use client';

import { Button, Form, Select, message } from 'antd';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Country: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const countries = [
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'india', label: 'India' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'australia', label: 'Australia' },
    { value: 'brazil', label: 'Brazil' },
    { value: 'mexico', label: 'Mexico' },
    { value: 'japan', label: 'Japan' },
  ];

  const onFinish = (values: { country: string }) => {
    if (values.country) {
      setLoading(true);
      // Simulate loading and perform redirect
      setTimeout(() => {
        message.success('Country selected successfully!');
        // Redirect to the next page (you can change the path accordingly)
        router.push('/welcome/health-details/general/age'); // Change this to the page you want to navigate to
      }, 2000); // Simulate 2 seconds delay
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Adjusted width for slightly narrower box */}
      <div className="relative w-full max-w-xl sm:max-w-lg p-6 sm:p-8 md:px-20 bg-white rounded-lg shadow-lg">
        {/* Logo in the top-left corner */}
        <div className="absolute top-4 left-4">
          <Image
            src="/images/docus-logo.svg" // Replace with your actual logo URL
            alt="Docus.ai Logo"
            height={70}
            width={70}
          />
        </div>
       
        {/* Form */}
        <Form
          name="countryForm"
          onFinish={onFinish}
          className="mt-6"
          initialValues={{ country: 'usa' }}
        >
             <div className='w-full object-cover mt-16'>
        <img
            src="/assets/map.webp" // Replace with your actual logo URL
            alt="Map"
            style={{width:'100%'}}
          />
        </div>
          <div>
            <h2 className="text-lg mt-16 text-gray-900">
              What’s your country of residence?
            </h2>

            {/* Information text */}
            <p className="text-[12px] my-2 text-gray-500">
              Selecting your country helps us tailor our services and ensure compliance with local regulations.
            </p>
            <p className="text-[12px] text-gray-500">Please select your country</p>

            {/* Country Select Input */}
            <Form.Item
              name="country"
              rules={[
                {
                  required: true,
                  message: 'Please select your country!',
                },
              ]}
              
            >
              <Select
                placeholder="Select your country"
                defaultValue={'usa'} 
                className="rounded "
                options={countries}
                style={{ width: '100%', height: '45px' }} // Increased height here
              />
            </Form.Item>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-teal-600 text-white font-bold rounded py-2 px-5 text-[13px] hover:bg-teal-700 transition-colors duration-300"
            >
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Country;
