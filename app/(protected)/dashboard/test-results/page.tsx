'use client'


import Image from 'next/image'
import { BiNetworkChart } from 'react-icons/bi'
import { GoHistory } from 'react-icons/go'
import { Button, Card, message, Modal, Upload, UploadFile, UploadProps } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dragger from 'antd/es/upload/Dragger';
import { CgAttachment } from 'react-icons/cg';

export default function LabTests() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const router = useRouter();
  
    // Open the modal when "Add New Test" is clicked
    const handleAddTest = () => {
      setIsModalOpen(true);
    };
  
    const handleManualEntry = () => {
      router.push('/enter-test-manually');
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Icon */}
          <div className="w-24 h-24 bg-[#F5F3FF] rounded-full flex items-center justify-center mb-4 relative">
            <div className="w-14 h-14 flex items-center justify-center">
              <Image src="/assets/empty-test-result.svg" height={100} width={100} alt='Lab Test'/>
            </div>
            <div className="absolute bottom-1 right-1 bg-[#10B981] rounded-full p-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Lab Tests & Screenings
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 max-w-xl text-sm">
            Get actionable insights from your lab tests and screenings and monitor your biomarker dynamics.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Lab Tests Card */}
          <Card 
            className="hover:shadow-md transition-shadow cursor-pointer group"
            bodyStyle={{ padding: '1.25rem' }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Lab Tests, Screenings & Reports
              </h2>
              <GoHistory className="w-6 h-6 text-[#10B981] group-hover:scale-110 transition-transform" />
            </div>
          </Card>

          {/* Biomarkers Card */}
          <Card 
            className="hover:shadow-md transition-shadow cursor-pointer group"
            bodyStyle={{ padding: '1.25rem' }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Biomarkers Overview & Dynamics
              </h2>
              <BiNetworkChart className="w-6 h-6 text-[#10B981] group-hover:scale-110 transition-transform" />
            </div>
          </Card>
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
                You can attach documents directly or enter details manually.
              </p>

              <Dragger {...uploadProps} className="mb-6 border-gray-300 rounded-lg shadow-sm">
                <p className="ant-upload-drag-icon text-lg">
                  <CgAttachment />
                </p>
                <p className="ant-upload-text text-lg text-gray-600">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint text-sm text-gray-400">
                  Support for PDF, JPEG, PNG, HEIC. Maximum file size: 10MB
                </p>
              </Dragger>

              <div className="flex gap-4 justify-end mt-2">
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
        {/* Add New Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm" onClick={handleAddTest}>
            <span className="text-lg font-bold">+</span>
            <span>Add New</span>
          </button>
        </div>
      </div>
    </div>
  )
}

