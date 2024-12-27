"use client";


import { useRouter } from "next/navigation";
import { BiNetworkChart } from "react-icons/bi";
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa";
import { Button,Collapse, message, Modal, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { CgAttachment } from "react-icons/cg";
import ModalLabStepper from "@/app/component/ui/ModalLabStepper";
const { Panel } = Collapse;
const { Dragger } = Upload;
const QUESTIONS = [
  {
    key: "1",
    question: "How does test result analysis work?",
    answer: "Test result analysis involves...",
  },
  {
    key: "2",
    question: "What should I do if I don't understand my report?",
    answer: "If you need help understanding your report...",
  },
  {
    key: "3",
    question:
      "Is this assessment a medical diagnosis or a substitute for a treatment plan?",
    answer: "This assessment is not a medical diagnosis...",
  },
  {
    key: "4",
    question: "What should I do after receiving the report?",
    answer: "After receiving your report...",
  },
  {
    key: "5",
    question: "Is my health data secure?",
    answer: "Yes, your health data is secured...",
  },
];

export default function BiomarkersOverview() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isStepperModalOpen, setIsStepperModalOpen] = useState(false);

    const handleComplete = (answers: any) => {
      console.log('Completed with answers:', answers);
      setIsStepperModalOpen(false);
      // Handle the answers as needed
    };
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
        //   router.push('/dashboard/test-results/new/text/message/screening-type');
        setIsStepperModalOpen(true);
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
        setIsStepperModalOpen(true);
        message.success('Upload completed successfully');
        setIsModalOpen(false);
        setFileList([]);
      } catch (error) {
        message.error('Upload failed. Please try again.');
      }
    };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => router.push('/dashboard/test-results')}
              className="hover:text-gray-600 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Biomarkers Overview
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Track the biomarkers extracted from your lab tests to monitor your
            health trends.
          </p>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center text-center my-16">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <BiNetworkChart className="w-6 h-6 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Tests Added Yet
          </h2>
          <p className="text-gray-500 text-sm">
            Start adding tests to track your biomarker dynamics and trends over
            time.
          </p>
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

      {/* Fixed Add Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className=" flex items-center justify-center">
          <Button type="primary" className=" text-white py-3 rounded-lg  transition-colors  " onClick={handleAddTest}> 
            <span className="text-lg font-bold">+</span>
            Add New Screening
          </Button>
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
          <ModalLabStepper
        isOpen={isStepperModalOpen}
        onClose={() => setIsStepperModalOpen(false)}
        onComplete={handleComplete}
      />
        </div>
      </div>
    </div>
  );
}
