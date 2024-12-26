'use client';

import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Nickname: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGoal(localStorage.getItem('goal'));
    }
  }, []);

  const onFinish = (values: { nickname: string; isLegalGuardian: boolean }) => {
    if (values.nickname && values.isLegalGuardian) {
      setLoading(true);
      
      // Save nickname to localStorage
      localStorage.setItem('nickname', values.nickname);

      message.success('Nickname saved successfully!');

      // Determine the next route based on the goal
      const nextRoute = goal === 'personalHealth' 
        ? '/welcome/health-details/general/age'
        : '/welcome/country';

      router.push(nextRoute);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative w-full max-w-xl sm:max-w-lg p-6 sm:p-8 md:px-20 bg-white rounded-lg shadow-lg">
        <div className="absolute top-4 left-4">
          <Image
            src="/images/docus-logo.svg"
            alt="Docus.ai Logo"
            height={70}
            width={70}
          />
        </div>

        <Form
          name="nicknameForm"
          onFinish={onFinish}
          className="mt-6"
          initialValues={{ nickname: '', isLegalGuardian: false }}
        >
          <div>
            <h2 className="text-2xl mt-16 font-semibold text-gray-900">Let's get to know you!</h2>
            <p className="text-lg my-2 text-gray-900">How should we greet you?</p>
            <p className="text-[12px] text-gray-500">
              If privacy is a concern, feel free to use just a nickname.
            </p>
            <Form.Item
              name="nickname"
              rules={[
                {
                  required: true,
                  message: 'Please enter your nickname!',
                },
              ]}
            >
              <Input
                placeholder="Preferred nickname or name"
                className="rounded h-12"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="isLegalGuardian"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('You must confirm that you are at least 18 years old or a legal guardian.')),
              },
            ]}
          >
            <Checkbox className='text-[13px]'>
              I confirm that I am at least 18 years old or I am the legal guardian of the user.
            </Checkbox>
          </Form.Item>

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

export default Nickname;

