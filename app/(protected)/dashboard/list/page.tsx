'use client'

import { DatePicker, Select, Card,Button, message, Modal, Upload, UploadFile, UploadProps } from 'antd'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { FaArrowLeft } from 'react-icons/fa'
import { TfiText } from 'react-icons/tfi'
import { CiMicrochip } from 'react-icons/ci'
import { Status } from '@/app/types/list'
import { SCREENINGS } from '@/app/data/ScreeningData'
import { useState } from 'react'
import { CgAttachment } from 'react-icons/cg'

const { RangePicker } = DatePicker
const { Dragger } = Upload;
const SCREENING_TYPES = [
  { value: 'lab_test', label: 'Lab Test' },
  { value: 'physical_examination', label: 'Physical Examination' },
  { value: 'imaging', label: 'Imaging' },
  { value: 'specialized_test', label: 'Specialized Test' },
]

const STATUS_OPTIONS = [
  { value: 'analyzing', label: 'Analyzing' },
  { value: 'not_interpreted', label: 'Not Interpreted' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'draft', label: 'Draft' },
]





const getStatusColor = (status: Status) => {
  const colors: Record<Status, string> = {
    analyzing: 'bg-blue-100 text-blue-700',
    not_interpreted: 'bg-orange-100 text-orange-700',
    completed: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    draft: 'bg-gray-100 text-gray-700',
  };
  return colors[status] || colors.draft;
};

export default function LabTestsScreenings() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const router = useRouter();
  
    // Open the modal when "Add New Test" is clicked
    const handleAddTest = () => {
      setIsModalOpen(true);
    };
  
    const handleManualEntry = () => {
      router.push('/dashboard/test-results/new/text/message/screening-type');
      setIsModalOpen(false);
    };
  
    const uploadProps: UploadProps = {
      name: 'file',
      multiple: false,
      fileList,
      beforeUpload: (file) => {
        const isValidType = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'image/heic',
        ].includes(file.type);
  
        if (!isValidType) {
          message.error('You can only upload PDF or Image files!');
          return Upload.LIST_IGNORE;
        }
  
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          message.error('File must be smaller than 10MB!');
          return Upload.LIST_IGNORE;
        }
  
        setFileList([file]);
        return false; // Prevent automatic upload
      },
      onRemove: () => {
        setFileList([]);
      },
      onChange: (info) => {
        const { status } = info.file;
        if (status === 'done') {
          router.push('/dashboard/test-results/new/text/message/screening-type');
          message.success(`${info.file.name} uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} upload failed.`);
        }
      },
    };
  
    const handleUpload = async () => {
      if (fileList.length === 0) {
        message.warning('Please select a file first');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', fileList[0] as any);
  
      try {
        // Simulate upload success
        await new Promise(resolve => setTimeout(resolve, 1500));
  
        message.success('Upload completed successfully');
        setIsModalOpen(false);
        setFileList([]);
      } catch (error) {
        message.error('Upload failed. Please try again.');
      }
    };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-6">
            <button 
              onClick={() => router.push('/dashboard/test-results')} 
              className="hover:text-gray-600 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Lab Tests & Screenings</h1>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <RangePicker 
              placeholder={['Start date', 'End date']}
              className="h-10"
            />
            <Select
              placeholder="Screening type"
              options={SCREENING_TYPES}
              className="w-full h-10"
            />
            <Select
              placeholder="Status"
              options={STATUS_OPTIONS}
              className="w-full h-10"
            />
          </div>
        </div>

        {/* Screenings List */}
        <div className="space-y-4">
          {SCREENINGS.map((screening) => (
            <Card 
              key={screening.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={()=>router.push('/dashboard/test-results/e804ef26-98bc-4465-86a6-a74ee248aa28')}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="mt-1 ">
                    <TfiText className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {screening.title}
                    </h3>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">Status:</span>
                        <span className={`text-sm px-2 py-0.5 rounded-full capitalize ${getStatusColor(screening.status)}`}>
                          {screening.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <CiMicrochip className="w-4 h-4" />
                        <span className="text-sm">Not included in AI Memory</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  Upload Date: {screening.uploadDate}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Fixed Add Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex justify-center items-center">
        <Button type="primary" className=" text-white py-3 rounded-lg  transition-colors  " onClick={handleAddTest}> 
            <span className="text-lg font-bold">+</span>
            Add New
          </Button>
        </div>
      </div>
      <Modal
            title="Choose how to upload your screening result"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            centered
            width={600}
            bodyStyle={{ padding: '20px 30px' }}
          >
            <div className="py-4">
              <p className="text-gray-600 mb-6 text-base">
              Please note! Attach only text-based test results and screening reports. Imaging files (e.g., CT, X-ray, MRI) are not accepted.
              </p>

              <Dragger {...uploadProps} className="mb-6 border-gray-300 rounded-lg shadow-sm">
                <p className="ant-upload-drag-icon text-lg">
                  <CgAttachment />
                </p>
                <p className="ant-upload-text text-lg text-gray-600">
                  Click or drag file to this area to upload. 
                </p>
                <p className="ant-upload-hint text-sm text-gray-400">
                  Support for PDF, JPEG, PNG, HEIC. Maximum file size: 10MB
                </p>
              </Dragger>

              <div className="flex gap-4 justify-end mt-5">
                <Button onClick={handleManualEntry} className="text-gray-700">
                  Enter Manually
                </Button>
                <Button

                  type="primary"
                  onClick={handleUpload}
                  disabled={fileList.length === 0}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Upload
                </Button>
              </div>
            </div>
          </Modal>
    </div>
  )
}

