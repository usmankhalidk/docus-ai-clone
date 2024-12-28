'use client'

import { Button, Form, Select, message } from 'antd'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { MessageInstance } from 'antd/es/message/interface'

// Define interfaces
interface CountryOption {
  value: string
  label: string
}

interface CountryFormValues {
  country: string
}

const Country: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const router = useRouter()

  const countries: CountryOption[] = [
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
  ]

  const showSuccessMessage = (messageApi: MessageInstance) => {
    messageApi.success('Country selected successfully!')
  }

  const onFinish = async (values: CountryFormValues) => {
    if (values.country) {
      setLoading(true)
      try {
        // Save country to localStorage
        localStorage.setItem('country', values.country)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        showSuccessMessage(messageApi)
        
        // Navigate after successful save
        router.push('/welcome/health-details/general/age')
      } catch (error) {
        messageApi.error('An error occurred. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {contextHolder}
      <div className="relative w-full max-w-xl sm:max-w-lg p-6 sm:p-8 md:px-20 bg-white rounded-lg shadow-lg">
        <div className="absolute top-4 left-4">
          <Image
            src="/images/docus-logo.svg"
            alt="Docus.ai Logo"
            height={70}
            width={70}
            priority
          />
        </div>
       
        <Form<CountryFormValues>
          name="countryForm"
          onFinish={onFinish}
          className="mt-6"
          initialValues={{ country: 'usa' }}
        >
          <div className="w-full object-cover mt-16">
            <Image
              src="/assets/map.webp"
              alt="World Map"
              width={500}
              height={300}
              className="w-full"
              priority
            />
          </div>
          
          <div>
            <h2 className="text-lg mt-16 text-gray-900">
              What's your country of residence?
            </h2>

            <p className="text-[12px] my-2 text-gray-500">
              Selecting your country helps us tailor our services and ensure compliance with local regulations.
            </p>
            <p className="text-[12px] text-gray-500">Please select your country</p>

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
                className="rounded"
                options={countries}
                style={{ width: '100%' }}
                size="large"
              />
            </Form.Item>
          </div>

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
  )
}

export default Country