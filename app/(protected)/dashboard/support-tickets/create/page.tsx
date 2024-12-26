'use client'

import { useState } from 'react'
import { Form, Select, Input, Upload, Button, message } from 'antd'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaPaperclip } from 'react-icons/fa'

const { TextArea } = Input

// Ticket types - can be fetched from API
const ticketTypes = [
  { value: 'technical', label: 'Technical Issue' },
  { value: 'billing', label: 'Billing Question' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'other', label: 'Other' },
]

export default function NewTicket() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('type', values.type)
      formData.append('description', values.description)
      if (fileList.length > 0) {
        formData.append('file', fileList[0].originFileObj)
      }
      

      message.success('Ticket created successfully')
      router.push('/dashboard')
    } catch (error) {
      message.error('Failed to create ticket')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (info: any) => {
    setFileList(info.fileList.slice(-1)) // Only keep the latest file
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-8 gap-2">
        <Link href="/dashboard" className="text-black hover:text-black/80">
          <FaArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-black">New Ticket</h1>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-6"
      >
        <Form.Item
          label="Type"
          name="type"
          required
          rules={[{ required: true, message: 'Please select ticket type' }]}
        >
          <Select
            placeholder="Select Ticket type"
            options={ticketTypes}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          required
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <TextArea
            placeholder="Type your question here..."
            rows={6}
            className="w-full"
          />
        </Form.Item>

        <Form.Item 
          label="Upload file (optional)"
          extra="You can attach a file up to 15 mb"
        >
          <Upload
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false} // Prevent auto upload
            maxCount={1}
          >
            <Button icon={<FaPaperclip className="w-4 h-4" />} className="w-full">
              Attach
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-teal-600 hover:bg-teal-700"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

