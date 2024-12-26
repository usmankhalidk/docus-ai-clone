'use client';

import { Button, Card, message, Modal, Upload, UploadFile, UploadProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { FaCheckCircle } from "react-icons/fa";

const { Dragger } = Upload;

export default function AiDoctor() {
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
    <div className="mt-16 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg rounded-xl p-6 bg-white">
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="w-24 h-24 bg-[#E5F0F0] rounded-full flex items-center justify-center mb-6 shadow-md">
            <div className="relative">
              <Image src="/assets/empty-test-result.svg" height={100} width={100} alt="lab report" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Lab Test & Screening Interpretations
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-gray-500 mb-8 text-center">
            Turn medical tests into actionable insights.
          </p>

          {/* Checklist */}
          <div className="space-y-4 text-left w-full mb-8 text-sm">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-teal-700 mt-0.5" />
              <span className="text-gray-600">Upload your results</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-teal-700 mt-0.5" />
              <span className="text-gray-600">Receive detailed interpretations</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-teal-700 mt-0.5" />
              <span className="text-gray-600">Get insights and recommendations</span>
            </div>
          </div>

          {/* Button */}
          <Button
            type="primary"
            className="w-full py-3 rounded-md text-lg transition-colors mb-4"
            onClick={handleAddTest} // Show modal on button click
          >
            + Add New Test
          </Button>

          {/* Modal for Uploading */}
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

              <div className="flex gap-4 justify-end">
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

          {/* Skip link */}
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors underline mt-6"
            onClick={() => router.push('/dashboard')} // Navigate to dashboard
          >
            Skip to My Dashboard
          </button>
        </div>
      </Card>
    </div>
  );
}
