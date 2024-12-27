'use client'

import { Button, Collapse } from 'antd'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa'

const { Panel } = Collapse

const LAB_TESTS = [
  {
    key: 'blood',
    title: 'Blood',
    count: 1,
    content: 'Blood test details...'
  },
  {
    key: 'urine',
    title: 'Urine',
    count: 0,
    content: 'Urine test details...'
  },
  {
    key: 'pap-smear',
    title: 'Pap Smear',
    count: 1,
    content: 'Pap smear test details...'
  },
  {
    key: 'semen-analysis',
    title: 'Semen Analysis',
    count: 0,
    content: 'Semen analysis details...'
  },
  {
    key: 'stool-test',
    title: 'Stool Test',
    count: 0,
    content: 'Stool test details...'
  },
  {
    key: 'swab-test',
    title: 'Swab Test',
    count: 0,
    content: 'Swab test details...'
  }
]

export default function LabTestInterpretation() {
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
            <h1 className="text-xl font-semibold text-gray-900">Lab Test Interpretation</h1>
          </div>
          <p className="text-gray-600 text-sm">
            Complete your main health information to personalize your AI Doctor, to explore your health risks and get personal checkup plan.
          </p>
        </div>

        {/* Lab Tests Sections */}
        <Collapse
          ghost
          expandIcon={({ isActive }) => (
            <FaChevronRight 
              className={`w-5 h-5 text-gray-400 transition-transform ${isActive ? 'rotate-90' : ''}`}
            />
          )}
          expandIconPosition="end"
        >
          {LAB_TESTS.map((test) => (
            <Panel
              key={test.key}
              header={
                <div className="flex justify-between items-center w-full pr-6">
                  <span className="text-gray-900 font-medium">{test.title}</span>
                  <span className="text-gray-500">{test.count}</span>
                </div>
              }
              className="border-b last:border-b-0"
            >
              <div className="pb-4">
                <p className="text-gray-600">{test.content}</p>
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>

      {/* Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex justify-center items-center">
          <Button type='primary' size='large' 
            onClick={() => router.push('/dashboard/test-results')}
           
          >
            Go to Lab Tests
          </Button>
        </div>
      </div>
    </div>
  )
}

