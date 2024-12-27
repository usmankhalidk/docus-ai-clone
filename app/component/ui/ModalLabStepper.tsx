import React, { useState, useEffect } from "react";
import { Input, Button, Radio, DatePicker, Modal } from 'antd';
import { FaDiamond } from "react-icons/fa6";
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";

interface Question {
  id: string;
  title: string;
  description: string;
  type: 'multiple-choice' | 'date' | 'yes-no-field';
  options?: { title: string; description: string; }[];
}

const questions: Question[] = [
  {
    id: 'test-type',
    title: 'Choose the test result type',
    description: 'Select the specific type of lab test performed.',
    type: 'multiple-choice',
    options: [
      {
        title: 'Blood Test',
        description: 'Overall health, immune system, organ function, etc.'
      },
      {
        title: 'Urine Test',
        description: 'Kidney function, urinary tract infections, etc.'
      },
      {
        title: 'Pap Smear',
        description: 'Precancerous conditions, cervical cancer, HPV, etc.'
      },
      {
        title: 'Semen Analysis',
        description: 'Sperm count, motility, morphology, fertility issues.'
      },
      {
        title: 'Stool Test',
        description: 'Digestive conditions, infections, parasites, etc.'
      },
      {
        title: 'Swab Test',
        description: 'Bacterial infections, viruses, fungal infections, etc.'
      }
    ]
  },
  {
    id: 'test-date',
    title: 'Select test date',
    description: 'Select your lab test date to enable analysis of biomarker trends and get accurate health insights.',
    type: 'date'
  },
  {
    id: 'additional-info',
    title: 'Additional Information',
    description: 'Do you have any additional information about your test results that we should know?',
    type: 'yes-no-field'
  }
];

interface ModalLabStepperProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (answers: any) => void;
}

const ModalLabStepper: React.FC<ModalLabStepperProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: any}>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers({});
      setIsSaving(false);
    }
  }, [isOpen]);

  const saveAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: {
        answer: value,
        ...(questions[currentStep].type === 'yes-no-field' && value === 'yes'
          ? { additionalFields: prev[questions[currentStep].id]?.additionalFields || {} }
          : {})
      }
    }));
  };

  const saveAdditionalField = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: {
        ...prev[questions[currentStep].id],
        additionalFields: {
          details: value
        }
      }
    }));
  };

  const isCurrentAnswerValid = () => {
    const currentAnswer = answers[questions[currentStep].id];
    if (!currentAnswer) return false;

    if (questions[currentStep].type === 'yes-no-field') {
      if (currentAnswer.answer === 'yes') {
        return currentAnswer.additionalFields?.details !== undefined;
      }
      return currentAnswer.answer !== undefined;
    }

    return currentAnswer.answer !== undefined && currentAnswer.answer !== '';
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsSaving(true);
    setTimeout(() => {
      onComplete(answers);
      setIsSaving(false);
    }, 1500);
  };

  const renderQuestion = () => {
    const question = questions[currentStep];
    const currentAnswer = answers[question.id];

    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="grid gap-3">
            {question.options?.map((option) => (
              <Button
                key={option.title}
                type={currentAnswer?.answer === option.title ? "primary" : "default"}
                onClick={() => saveAnswer(option.title)}
                className="w-full text-left rounded-md border transition-all duration-300"
                style={{
                  padding: '16px',
                  height: 'auto',
                  whiteSpace: 'normal',
                  borderColor: currentAnswer?.answer === option.title ? '#13c2c2' : '#d9d9d9',
                }}
              >
                <div>
                  <div className="font-medium">{option.title}</div>
                  <div className="text-sm mt-1">{option.description}</div>
                </div>
              </Button>
            ))}
          </div>
        );

      case 'date':
        return (
          <DatePicker
            value={currentAnswer?.answer ? dayjs(currentAnswer.answer) : null}
            onChange={(date: Dayjs | null) => saveAnswer(date ? date.valueOf() : '')}
            className="w-full"
          />
        );

      case 'yes-no-field':
        return (
          <div className="space-y-4">
            <Radio.Group
              value={currentAnswer?.answer}
              onChange={(e) => saveAnswer(e.target.value)}
              className="w-full"
            >
              <div className="grid gap-3">
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </div>
            </Radio.Group>
            
            {currentAnswer?.answer === 'yes' && (
              <Input.TextArea
                value={currentAnswer?.additionalFields?.details || ''}
                onChange={(e) => saveAdditionalField(e.target.value)}
                placeholder="Please provide additional information"
                className="mt-4"
                rows={4}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep) / (questions.length - 1)) * 100;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={640}
      centered
    >
      <div className="p-4">
        <div className="mb-6">
          <p className="text-[12px] uppercase text-teal-700 text-center">
            Lab Results
          </p>

          <div className="mt-4 relative">
            <div className="h-2 bg-gray-200 rounded-full relative">
              <div
                className="h-2 bg-teal-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute top-0 right-0" style={{ height: "100%", display: "flex", alignItems: "center" }}>
                <FaDiamond
                  className={`w-2 h-2 translate-x-1 ${progress === 100 ? "text-white" : "text-teal-600"}`}
                />
              </div>
            </div>
            <div className="absolute right-0 top-5 text-xs text-gray-600">
              Step {currentStep + 1} of {questions.length}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3 text-black">
            {questions[currentStep].title}
          </h2>
          <p className="text-gray-600 mb-6 text-[12px]">
            {questions[currentStep].description}
          </p>
          {renderQuestion()}
        </div>

        <div className="flex justify-between">
          {currentStep > 0 ? (
            <Button onClick={handlePrevious}>
              Previous
            </Button>
          ) : <div />}
          <Button
            type="primary"
            onClick={handleNext}
            disabled={!isCurrentAnswerValid()}
            loading={isSaving}
          >
            {currentStep === questions.length - 1 ? 'Save' : 'Next'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLabStepper;