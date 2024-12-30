'use client'

import { Button, Collapse, Modal, Switch, Segmented } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CiTrash } from 'react-icons/ci'
import { FaArrowLeft, FaChevronLeft, FaFlag, FaChevronRight } from 'react-icons/fa'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { IoShareSocialOutline } from 'react-icons/io5'
import { FiDownload } from 'react-icons/fi'
import BiomarkerSidebar from "@/app/component/ui/BiomarkerSidebar";
import { BiomarkerData } from '@/app/types/biomarkers'
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

// Dummy data for the completed screening
const SCREENING_DATA = {
  patient: {
    name: "usman, 23 y.o. male",
    uploadDate: "26 Dec, 2024",
    testDate: "from 20 Mar 2024",
    screening: "Report/Preview.pdf"
  },
  indicators: [
    {
      name: "Serum Total Cholesterol",
      value: 179.00,
      unit: "mg/dL",
      status: "N/A",
      normalRange: "Desirable (<200) Borderline High (200-240) High (>240)",
      graph: true,
      date: '20 Mar 2024',
    },
    {
      name: "Triglycerides",
      value: 93.00,
      unit: "mg/dL",
      status: "N/A",
      normalRange: "Normal (<150) Borderline High (150 - 199) High (200-499) Very High (≥500)",
      graph: true,
      date: '20 Mar 2024',
    },
    {
      name: "Serum HDL-Cholesterol",
      value: 36.00,
      unit: "mg/dL",
      status: "Abnormal",
      normalRange: "Low (<39) Normal (>40)",
      graph: true,
      date: '20 Mar 2024',
    },
    {
      name: "LDL-Cholesterol",
      value: 129.00,
      unit: "mg/dL",
      status: "Normal",
      normalRange: "Desirable (<100) Above Desirable (100 - 129) Borderline High (130 - 159) High (160-189) Very High (≥190)",
      graph: true,
      date: '20 Mar 2024',
    },
    {
      name: "Non-HDL Cholesterol",
      value: 143.00,
      unit: "mg/dL",
      status: "N/A",
      normalRange: "Desirable (<129) Above Desirable (130 - 159) Borderline High (160 - 189) High (190-219) Very High (≥220)",
      graph: true,
      date: '20 Mar 2024',
    }
  ],
  analysis: {
    summary: "Overall cholesterol panel shows borderline values with slightly reduced HDL cholesterol...",
    recommendations: [
      "Consider lifestyle modifications to improve HDL levels",
      "Maintain a heart-healthy diet",
      "Regular exercise recommended",
      "Follow up with healthcare provider"
    ]
  }
}

export default function ScreeningDetails() {
  const router = useRouter()
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [showAbnormalOnly, setShowAbnormalOnly] = useState(false)
  const [activeSegment, setActiveSegment] = useState<string | number>("indicators")
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedBiomarker, setSelectedBiomarker] = useState<BiomarkerData | null>(null);
  // Toggle this to show empty state vs completed screening
  const [isComplete] = useState(true)

  const filteredIndicators = showAbnormalOnly
    ? SCREENING_DATA.indicators.filter(indicator => indicator.status === "Abnormal")
    : SCREENING_DATA.indicators

  const renderContent = () => {
    if (!isComplete) {
      return (
        <>
          {/* Submission Status */}
          <div className="mb-12 flex justify-center items-center flex-col">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Submission Incomplete
            </h2>
            <p className="text-gray-600 mb-4">
              Your screening submission is incomplete. Complete it to receive a detailed screening report and insights.
            </p>
            <Button 
              type="primary" 
              onClick={() => router.push('/dashboard/test-results/new/text/message/screening-type')} 
              size="large"
              className="bg-teal-600 hover:bg-teal-700"
            >
              Complete
            </Button>
          </div>
        </>
      )
    }

    return (
      <>
        {/* Segmented Control */}
        <div className="mb-6 w-full">
          <Segmented
            options={[
              { label: 'Indicators', value: 'indicators' },
              { label: 'Analysis & Insights', value: 'analysis' },
            ]}
            value={activeSegment}
            onChange={setActiveSegment}
            block
            className="w-full"
          />
        </div>

        {/* Content Container */}
        <div className="w-full transition-all duration-200 ease-in-out">
          {activeSegment === 'indicators' && (
            <div className="w-full" >
              <div className="flex justify-end items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">Show only abnormal markers</span>
                <Switch
                  checked={showAbnormalOnly}
                  onChange={setShowAbnormalOnly}
                  className="bg-gray-200"
                />
              </div>

              <div className="space-y-4">
                {filteredIndicators.map((indicator, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedBiomarker({
                        id: index.toString(),
                        name: indicator?.name,
                        value: indicator?.value,
                        unit: indicator.unit,
                        date: indicator.date,
                      });
                      setSidebarOpen(true);
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{indicator.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-medium ${
                          indicator.status === "Abnormal" ? "text-red-500" : "text-teal-600"
                        }`}>
                          {indicator.value} {indicator.unit}
                        </span>
                        {indicator.graph && (
                          <div className="w-4 h-16 bg-gray-100 rounded">
                            {/* Placeholder for the graph visualization */}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`text-sm ${
                          indicator.status === "Abnormal" ? "text-red-500" : 
                          indicator.status === "Normal" ? "text-teal-600" : "text-gray-600"
                        }`}>
                          {indicator.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Normal Range: {indicator.normalRange}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
               {selectedBiomarker && (
                <BiomarkerSidebar
                  open={sidebarOpen}
                  onClose={() => {
                    setSidebarOpen(false);
                    setSelectedBiomarker(null);
                  }}
                  biomarker={{
                    id: selectedBiomarker.id,
                    name: selectedBiomarker.name,
                    value: selectedBiomarker.value,
                    unit: selectedBiomarker.unit,
                    date: selectedBiomarker.date,
                  }}
                />
              )}
            </div>
          )}

          {activeSegment === 'analysis' && (
            <div className="w-full">
              <div>
                <h3 className="text-lg font-semibold mb-2">Summary</h3>
                <p className="text-gray-600">{SCREENING_DATA.analysis.summary}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                <ul className="list-disc list-inside space-y-1">
                  {SCREENING_DATA.analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-600">{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow w-full max-w-3xl mx-auto p-4 pb-20">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => router.back()}
              className="hover:text-gray-600 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {isComplete ? "Screening Results" : "Draft Screening"} 
              {isComplete && <span className="text-gray-500 text-sm font-normal ml-2">{SCREENING_DATA.patient.testDate}</span>}
            </h1>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Patient:</span>
              <span>{SCREENING_DATA.patient.name}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Upload date:</span>
              <span>{SCREENING_DATA.patient.uploadDate}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Screening:</span>
              {isComplete ? (
                <a href="#" className="text-teal-600 hover:text-teal-700 flex items-center gap-1">
                  <FiDownload className="w-4 h-4" />
                  {SCREENING_DATA.patient.screening}
                </a>
              ) : (
                <button 
                  onClick={() => setIsViewModalOpen(true)}
                  className="text-teal-600 hover:text-teal-700 transition-colors flex items-center"
                >
                  <MdOutlineRemoveRedEye className="mr-1"/>
                  View
                </button>
              )}
            </div>
          </div>

          {/* Report Actions */}
          <div className="flex justify-end gap-2 mt-4">
            {isComplete ? (
              <>
                <Button 
                  icon={<CiTrash />}
                  onClick={() => setIsDeleteModalOpen(true)}
                  danger
                >
                  Delete
                </Button>
                <Button 
                  icon={<IoShareSocialOutline />}
                >
                  Share
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {renderContent()}

        {/* Questions Answered Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Questions Answered
          </h3>
          <Collapse
            ghost
            expandIcon={({ isActive }) => (
              <FaChevronLeft className={`w-5 h-5 text-gray-400 transition-transform ${isActive ? '-rotate-90' : 'rotate-180'}`} />
            )}
            expandIconPosition="end"
          >
            {QUESTIONS.map((item) => (
              <Collapse.Panel
                key={item.key}
                header={<span className="text-gray-700">{item.question}</span>}
                className="border-b last:border-b-0"
              >
                <p className="text-gray-600 pb-2">{item.answer}</p>
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-3xl mx-auto flex justify-center items-center">
          <p className="text-gray-600 mr-4">Have questions about this report?</p>
          <Button type="primary" className="bg-teal-600 hover:bg-teal-700" onClick={()=>router.push('/dashboard/chat')}>
            Ask Your AI Doctor
          </Button>
        </div>
      </div>

      {/* Modals */}
      <Modal
        title="Screening Results"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={600}
      >
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Modal>

      <Modal
        title="Confirm Deletion"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsDeleteModalOpen(false)}
            className="mr-2"
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            danger
            onClick={() => {
              setIsDeleteModalOpen(false)
              // Handle deletion
            }}
          >
            Delete
          </Button>
        ]}
        width={400}
      >
        <p className="text-gray-600">
          This will permanently delete your {isComplete ? "screening results" : "current screening"} and remove its data from AI memory. Proceed?
        </p>
      </Modal>
    </div>
  )
}

