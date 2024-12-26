'use client'

import { useState } from 'react'
import { Modal, Badge } from 'antd'

import Link from 'next/link'
import { FaArrowLeft, FaTrash } from 'react-icons/fa'

export default function AccountSettings() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const handleCancel = () => {
    setIsDeleteModalOpen(false)
  }

  const handleDelete = () => {
    // Handle delete logic here
    setIsDeleteModalOpen(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-8 gap-2">
        <Link href="/dashboard" className="text-black hover:text-black/80">
          <FaArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-black">Account Settings</h1>
      </div>

      {/* User Details Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">User details</h2>
        <div className="space-y-4">
          <div className="flex">
            <span className="w-40 text-black">User ID:</span>
            <span className="text-black">170619</span>
          </div>
          <div className="flex">
            <span className="w-40 text-black">Email:</span>
            <span className="text-black">shahabimtiaz@curelogics.org</span>
          </div>
          <div className="flex items-center">
            <span className="w-40 text-black">Subscription plan:</span>
            <Badge 
              className="mr-2"
              count="Free" 
              style={{ 
                backgroundColor: '#1677ff',
                fontSize: '12px',
                padding: '0 8px'
              }} 
            />
            <Link href="/subscription" className="text-blue-600 hover:text-blue-800">
              Change
            </Link>
          </div>
        </div>
      </section>

      {/* Account Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Account</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="w-40 text-black">Nickname:</span>
            <span className="mr-2 text-black">shahab</span>
            <Link href="/account/edit" className="text-blue-600 hover:text-blue-800">
              Edit
            </Link>
          </div>
          <div className="flex items-center">
            <span className="w-40 text-black">Password</span>
            <span className="mr-2 text-black">••••••••</span>
            <Link href="/account/reset-password" className="text-blue-600 hover:text-blue-800">
              Reset
            </Link>
          </div>
        </div>
      </section>

      {/* Delete Account Section */}
      <section className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Delete Account</h2>
        <p className="text-black mb-4">
          Permanently remove your account and all related data from our platform.
        </p>
        <button
          onClick={showDeleteModal}
          className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
        >
          <FaTrash className="w-4 h-4" />
          Delete Account
        </button>
      </section>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Account Deletion"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete Account"
        cancelText="Cancel"
        okButtonProps={{ 
          danger: true,
          className: 'bg-red-600'
        }}
      >
        <div className="py-4">
          <p className="mb-4 text-black">
            This will permanently delete your profile, health data, and all associated information.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-black">
            <li>This action is irreversible.</li>
            <li>Deleted data cannot be recovered.</li>
            <li>Active subscriptions cannot be refunded.</li>
          </ul>
          <p className="mt-4 font-medium text-black">Are you sure you want to proceed?</p>
        </div>
      </Modal>
    </div>
  )
}

