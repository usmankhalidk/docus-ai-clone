'use client'

import { Button, Collapse, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CiTrash } from 'react-icons/ci'
import { FaArrowLeft, FaChevronLeft , FaFlag, FaTrash } from 'react-icons/fa'
import { MdOutlineRemoveRedEye } from 'react-icons/md'

const QUESTIONS = [
  {
    key: '1',
    question: 'How does test result analysis work?',
    answer: 'Test result analysis involves...'
  },
  {
    key: '2',
    question: "What should I do if I don't understand my report?",
    answer: 'If you need help understanding your report...'
  },
  {
    key: '3',
    question: 'Is this assessment a medical diagnosis or a substitute for a treatment plan?',
    answer: 'This assessment is not a medical diagnosis...'
  },
  {
    key: '4',
    question: 'What should I do after receiving the report?',
    answer: 'After receiving your report...'
  },
  {
    key: '5',
    question: 'Is my health data secure?',
    answer: 'Yes, your health data is secured...'
  }
]

export default function ScreeningDetails() {
  const router = useRouter()
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <button 
              onClick={() => router.push('/dashboard/test-results')} 
              className="hover:text-gray-600 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Draft Screening</h1>
          </div>

          {/* Patient Info */}
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Patient:</span>
              <span className="text-gray-900">usman, 23 y.o. male</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Upload date:</span>
              <span className="text-gray-900">26 Dec, 2024</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Screening:</span>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsViewModalOpen(true)}
                  className="text-teal-600 hover:text-teal-700 transition-colors flex items-center"
                >
                    <MdOutlineRemoveRedEye className='mr-1'/>
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-6 mt-6 justify-between">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <FaFlag className="w-4 h-4" />
              <span>Report Issue</span>
            </button>
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
                <CiTrash />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Submission Status */}
        <div className="mb-12 flex justify-center items-center flex-col">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Submission Incomplete
          </h2>
          <p className="text-gray-600 mb-4">
            Your screening submission is incomplete. Complete it to receive a detailed screening report and insights.
          </p>
          <Button type='primary' onClick={()=> router.push('/dashboard/test-results/new/text/message/screening-type')} size='large' >
            Complete
          </Button>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Questions Answered
          </h3>
          <Collapse
            ghost
            expandIcon={({ isActive }) => (
              <FaChevronLeft className={`w-5 h-5 text-gray-400 transition-transform ${isActive ? '-rotate-90' : 'rotate-180'}`} />
            )}
            expandIconPosition='end'
          >
            {QUESTIONS.map((item) => (
              <Collapse.Panel
                key={item.key}
                header={
                  <span className="text-gray-700">{item.question}</span>
                }
                className="border-b last:border-b-0"
              >
                <p className="text-gray-600 pb-2">{item.answer}</p>
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>
      </div>

      {/* View Modal */}
      <Modal
        title="Screening Results"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={600}
      >
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Confirm Deletion"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <button
            key="cancel"
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mr-2"
          >
            Cancel
          </button>,
          <button
            key="delete"
            onClick={() => {
              setIsDeleteModalOpen(false)
              // Handle deletion here
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        ]}
        width={400}
      >
        <p className="text-gray-600">
          This will permanently delete your current screening and remove its data from AI memory. Proceed?
        </p>
      </Modal>
    </div>
  )
}

