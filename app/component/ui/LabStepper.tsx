'use client';
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { Input, Form, Button, Radio, DatePicker } from 'antd';


type QuestionType = 'text' | 'multiple-choice' | 'date' | 'yes-no-field';

interface Question {
  slug: string;
  title: string;
  description: string;
  type: QuestionType;
  options?: { title: string; description: string; }[];
}

interface AnswerType {
  [key: number]: {
    answer: string | number | undefined;
    additionalFields?: {
      [key: string]: string | number;
    };
  };
}

const questions: Question[] = [
  {
    slug: 'screening-results',
    title: 'Screening Results',
    description: 'Enter a summary of your screening results, including key findings and measurements.',
    type: 'text'
  },
  {
    slug: 'screening-type',
    title: 'Choose the screening type',
    description: 'Select the type of screening performed.',
    type: 'multiple-choice',
    options: [
      {
        title: 'Lab Test',
        description: 'Blood test, Urinalysis, Pap smear, Spermogram, etc.'
      },
      {
        title: 'Physical Examination',
        description: 'General and specialized physical assessments.'
      },
      {
        title: 'Imaging Summary',
        description: 'Text reports for X-ray, CT, MRI, ultrasound, etc.'
      },
      {
        title: 'Specialized Test Summary',
        description: 'Text reports for ECG, endoscopy, etc.'
      }
    ]
  },
  {
    slug: 'test-date',
    title: 'Select test date',
    description: 'Select your lab test date to enable analysis of biomarker trends and get accurate health insights.',
    type: 'date'
  },
  {
    slug: 'additional-info',
    title: 'Additional Information',
    description: 'Do you have any additional information about your test results that we should know?',
    type: 'yes-no-field'
  }
];

interface LabStepperProps {
  basePath: string;
}

const loadingMessages = [
  "Saving your lab results...",
  "Processing your information...",
  "Preparing your health insights...",
  "Almost ready...",
];

const LabStepper: React.FC<LabStepperProps> = ({
  basePath,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [answers, setAnswers] = useState<AnswerType>({});
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (pathname) {
      const currentStep = getCurrentStepFromPath(pathname);
      setCurrentStep(currentStep);

      if (currentStep === -1) {
        router.replace(`${basePath}/${questions[0].slug}`);
      }
    }
  }, [pathname, basePath, router]);

  const calculateProgress = () => {
    if (currentStep === null) return 0;
    return ((currentStep) / (questions.length)) * 100;
  };

  const isCurrentAnswerValid = () => {
    if (currentStep === null) return false;
    const currentAnswer = answers[currentStep];
    if (!currentAnswer) return false;

    if (questions[currentStep].type === 'yes-no-field') {
      if (currentAnswer.answer === 'yes') {
        return currentAnswer.additionalFields?.details !== undefined;
      }
      return currentAnswer.answer !== undefined;
    }

    return currentAnswer.answer !== undefined && currentAnswer.answer !== '';
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSaving) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) =>
          prev === loadingMessages.length - 1 ? prev : prev + 1
        );
      }, 2000);

      setTimeout(() => {
        setIsSaving(false);
        setShowCongratulations(true);
        setTimeout(() => {
          router.push("/dashboard/test-results");
        }, 3000);
      }, loadingMessages.length * 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSaving, router]);

  const getCurrentStepFromPath = (currentPath: string): number => {
    const slug = currentPath.split("/").pop();
    return questions.findIndex((q) => q.slug === slug);
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
  };

  const nextStep = async () => {
    if (currentStep !== null && currentStep < questions.length - 1) {
      setIsLoading(true);
      const nextQuestion = questions[currentStep + 1];
      await router.push(`${basePath}/${nextQuestion.slug}`);
      setIsLoading(false);
    }
    if (currentStep !== null && currentStep === questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = async () => {
    if (currentStep !== null && currentStep > 0) {
      setIsLoading(true);
      const prevQuestion = questions[currentStep - 1];
      await router.push(`${basePath}/${prevQuestion.slug}`);
      setIsLoading(false);
    }
    if (currentStep !== null && currentStep > questions.length - 1) {
      setIsLoading(true);
      setCurrentStep(currentStep - 1);
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string | number, field?: string) => {
    if (field) {
      setAnswers((prev) => ({
        ...prev,
        [currentStep!]: {
          ...prev[currentStep!],
          additionalFields: {
            ...(prev[currentStep!]?.additionalFields || {}),
            [field]: value
          }
        }
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [currentStep!]: {
          answer: value,
          additionalFields: {}
        },
      }));
    }
  };

  const renderQuestion = () => {
    const question = questions[currentStep!];

    switch (question.type) {
      case 'text':
        return (
          <Input.TextArea
            value={answers[currentStep!]?.answer || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter your screening results"
            className="rounded"
            rows={4}
          />
        );
      case 'multiple-choice':
        return (
          <div className="grid gap-3">
            {question.options?.map((option) => (
              <Button
                key={option.title}
                type={answers[currentStep!]?.answer === option.title ? "primary" : "default"}
                onClick={() => handleInputChange(option.title)}
                className="w-full text-left rounded-md border transition-all duration-300"
                style={{
                  padding: '16px',
                  height: 'auto',
                  whiteSpace: 'normal',
                  borderColor: answers[currentStep!]?.answer === option.title ? '#13c2c2' : '#d9d9d9',
                }}
              >
                <div    >
                <div className="font-medium">{option.title}</div>
                <div className="text-sm  mt-1">{option.description}</div>
                </div>
              </Button>
            ))}
          </div>
        );
      case 'date':
        return (
            <DatePicker
            className="w-full"
            // value={answers[currentStep!]?.answer ? new Date(answers[currentStep!].answer as string) : null}
            onChange={(date) => handleInputChange(date?.toISOString() || '')} // Handle null case
            size="large"
          />
        );
      case 'yes-no-field':
        return (
          <div className="space-y-4">
            <Radio.Group
              value={answers[currentStep!]?.answer}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full"
            >
              <div className="grid gap-3">
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </div>
            </Radio.Group>
            
            {answers[currentStep!]?.answer === 'yes' && (
              <Input.TextArea
                value={answers[currentStep!]?.additionalFields?.details || ''}
                onChange={(e) => handleInputChange(e.target.value, 'details')}
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

  if (!mounted || currentStep === null) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen  p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  if (showCongratulations) {
    return (
      <div className="min-h-screen  p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-teal-700 mb-4">
            Lab Results Saved Successfully! 🎉
          </h1>
          <p className="text-gray-600">
            Your lab results have been saved and analyzed.
          </p>
          <p className="text-gray-600 mt-2">
            Redirecting to summary...
          </p>
        </div>
      </div>
    );
  }

  if (isSaving) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-teal-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">
            {loadingMessages[loadingMessageIndex]}
          </p>
        </div>
      </div>
    );
  }

  const progressPercentage = calculateProgress();

  return (
    <div className="p-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 w-full justify-center">
            {currentStep > 0 && (
              <FaArrowLeft className="w-3 h-3 cursor-pointer" onClick={prevStep} />
            )}
            <p className="text-[12px] uppercase text-teal-700 text-center flex-grow">
              Lab Results
            </p>
          </div>

          <div className="mt-4 relative">
            <div className="h-2 bg-gray-200 rounded-full relative">
              <div
                className="h-2 bg-teal-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <div
                className="absolute top-0 right-0"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaDiamond
                  className={`w-2 h-2 translate-x-1 ${
                    progressPercentage === 100 ? "text-white" : "text-teal-600"
                  }`}
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="absolute right-0 top-5 text-xs text-gray-600">
              Step {currentStep > questions.length - 1 ? currentStep : currentStep + 1} of {questions.length}
            </div>
          </div>
        </div>

        {currentStep !== null && (
          <div className="mb-8">
            {currentStep < questions.length ? (
              <>
                <h2 className="text-lg font-medium mb-3 text-black">
                  {questions[currentStep].title}
                </h2>
                <p className="text-gray-600 mb-6 text-[12px]">
                  {questions[currentStep].description}
                </p>
                {renderQuestion()}
              </>
            ) : (
              <>
                <h2 className="text-lg font-medium mb-3">
                  Review and Save
                </h2>
                <p className="text-gray-600 mb-6">
                  Please review your lab results and save them.
                </p>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="w-full px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Save Lab Results
                </button>
              </>
            )}
          </div>
        )}

        {currentStep < questions.length && (
          <div className="flex justify-end">
            <Button
              type="primary"
              onClick={nextStep}
              disabled={!isCurrentAnswerValid()}
              className="px-5 py-2"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabStepper;