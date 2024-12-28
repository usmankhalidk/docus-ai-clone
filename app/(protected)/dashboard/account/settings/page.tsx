'use client'

import { useState } from 'react'
import { Modal, Badge, Input, Form, Card } from 'antd'
import Link from 'next/link'
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'

export default function AccountSettings() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditNicknameModalOpen, setIsEditNicknameModalOpen] = useState(false)
  const [nickname, setNickname] = useState('shahab')
  const [form] = Form.useForm()

  const showDeleteModal = () => setIsDeleteModalOpen(true)
  const showEditNicknameModal = () => setIsEditNicknameModalOpen(true)
  
  const handleDeleteCancel = () => setIsDeleteModalOpen(false)
  const handleEditNicknameCancel = () => {
    setIsEditNicknameModalOpen(false)
    form.resetFields()
  }

  const handleDelete = () => {
    // Handle delete logic here
    setIsDeleteModalOpen(false)
  }

  const handleEditNickname = () => {
    form.validateFields().then(values => {
      setNickname(values.nickname)
      setIsEditNicknameModalOpen(false)
      form.resetFields()
    })
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-8 gap-4">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
          <ArrowLeftOutlined className="text-xl" />
        </Link>
        <h1 className="text-2xl font-semibold">Account Settings</h1>
      </div>

      {/* User Details Section */}
      <Card className="mb-6" title="User details">
        <div className="space-y-6">
          <div className="flex items-center border-b pb-4">
            <span className="w-40 text-gray-600">User ID:</span>
            <span>170619</span>
          </div>
          <div className="flex items-center border-b pb-4">
            <span className="w-40 text-gray-600">Email:</span>
            <span>shahabimtiaz@curelogics.org</span>
          </div>
          <div className="flex items-center">
            <span className="w-full text-gray-600">Subscription plan:  <Badge 
              className="mr-3"
              count="Free" 
              style={{ 
                backgroundColor: '#1677ff',
                fontSize: '12px',
                padding: '0 8px'
              }} 
            /></span>
           
            <Link 
              href="/dashboard/pricing" 
              className="text-blue-600 hover:text-blue-800"
            >
              Change
            </Link>
          </div>
        </div>
      </Card>

      {/* Account Section */}
      <Card className="mb-6" title="Account">
        <div className="space-y-6">
          <div className="flex items-center border-b pb-4">
            <span className="w-40 text-gray-600">Nickname:</span>
            <span className="mr-3">{nickname}</span>
            <button
              onClick={showEditNicknameModal}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          </div>
          <div className="flex items-center">
            <span className="w-40 text-gray-600">Password</span>
            <span className="mr-3">••••••••</span>
            <Link 
              href="/account/reset-password" 
              className="text-blue-600 hover:text-blue-800"
            >
              Reset
            </Link>
          </div>
        </div>
      </Card>

      {/* Delete Account Section */}
      <Card className="bg-gray-50" title="Delete Account">
        <p className="text-gray-600 mb-6">
          Permanently remove your account and all related data from our platform.
        </p>
        <button
          onClick={showDeleteModal}
          className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
        >
          <DeleteOutlined />
          Delete Account
        </button>
      </Card>

      {/* Edit Nickname Modal */}
      <Modal
        title="Edit Nickname"
        open={isEditNicknameModalOpen}
        onOk={handleEditNickname}
        onCancel={handleEditNicknameCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ nickname }}
        >
          <Form.Item
            name="nickname"
            label="Nickname"
            rules={[
              { required: true, message: 'Please input your nickname!' },
              { min: 2, message: 'Nickname must be at least 2 characters' }
            ]}
          >
            <Input placeholder="Enter your nickname" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Account Deletion"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={handleDeleteCancel}
        okText="Delete Account"
        cancelText="Cancel"
        okButtonProps={{ 
          danger: true,
          className: 'bg-red-600'
        }}
      >
        <div className="py-4">
          <p className="mb-4">
            This will permanently delete your profile, health data, and all associated information.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>This action is irreversible.</li>
            <li>Deleted data cannot be recovered.</li>
            <li>Active subscriptions cannot be refunded.</li>
          </ul>
          <p className="mt-4 font-medium">Are you sure you want to proceed?</p>
        </div>
      </Modal>
    </div>
  )
}

