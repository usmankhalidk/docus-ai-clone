'use client'


import { Button, Collapse } from 'antd'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa'

const { Panel } = Collapse

const HEALTH_SECTIONS = [
  {
    key: 'medical-history',
    title: 'Medical History',
    content: 'Medical history content...'
  },
  {
    key: 'medications',
    title: 'Medications',
    content: 'Medications content...'
  },
  {
    key: 'life-patterns',
    title: 'Life Patterns & Habits',
    content: 'Life patterns content...'
  }
]

export default function HealthInformation() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <button 
              onClick={() => router.push('/dashboard/overview')} 
              className="hover:text-gray-600 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Main Health Information</h1>
          </div>
          <p className="text-gray-600 text-sm">
            Complete your main health information to personalize your AI Doctor, to explore your health risks and get personal checkup plan.
          </p>
        </div>

        {/* Health Sections */}
        <Collapse
          ghost
          expandIcon={({ isActive }) => (
            <FaChevronRight 
              className={`w-5 h-5 text-gray-400 transition-transform ${isActive ? 'rotate-90' : ''}`}
            />
          )}
          expandIconPosition="end"
        >
          {HEALTH_SECTIONS.map((section) => (
            <Panel
              key={section.key}
              header={
                <span className="text-gray-900 font-medium">{section.title}</span>
              }
              className="border-b last:border-b-0"
            >
              <div className="pb-4">
                <p className="text-gray-600">{section.content}</p>
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>

      {/* Fixed Update Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex justify-center items-center">
          <Button type='primary' size='large' onClick={()=>router.push('/dashboard/account/profile/update/medical-history/condition')}>
            Update Health Information
          </Button>
        </div>
      </div>
    </div>
  )
}

