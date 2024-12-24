'use client';
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft, FaRulerVertical, FaWeight } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { Input, Form, Space, Radio, Button } from 'antd';
type QuestionType = 'number' | 'radio' | 'select' | 'multiple-choice' | 'measurement';

interface Question {
  slug: string;
  title: string;
  description: string;
  type: QuestionType;
  options?: string[];
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
    slug: 'age',
    title: 'Age',
    description: 'Age is a key factor in health assessment, influencing the range of potential risks and appropriate wellness strategies.',
    type: 'number'
  },
  {
    slug: 'measurement-system',
    title: 'Measurement System',
    description: 'Select your preferred measurement system to accurately record your height and weight.',
    type: 'measurement',
    options: ['lbs/ft/in', 'kg/cm']
  },
  {
    slug: 'ethnicity',
    title: 'Primary racial or ethnic group',
    description: 'Different racial and ethnic groups have varied health tendencies. We use this information to provide more accurate health recommendations.',
    type: 'select',
    options: [
      'South Asian',
      'East Asian',
      'Black or African',
      'Hispanic or Latino',
      'White or Caucasian',
      'Middle Eastern',
      'Pacific Islander',
      'Native American',
      'Mixed/Multiple ethnic groups',
      'Other'
    ]
  },
  {
    slug: 'sex',
    title: 'Sex assigned at birth',
    description: 'Biological sex can impact risk for certain conditions and response to treatments.',
    type: 'multiple-choice',
    options: ['Male', 'Female', 'Other']
  }
];

interface QuestionnaireStepperProps {
  basePath: string;
}

const loadingMessages = [
  "Creating your profile...",
  "Saving your information...",
  "Preparing your dashboard...",
  "Almost ready...",
];

const Stepper: React.FC<QuestionnaireStepperProps> = ({
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

    if (questions[currentStep].type === 'measurement') {
      const fields = currentAnswer.additionalFields || {};
      if (currentAnswer.answer === 'lbs/ft/in') {
        return fields.weight && fields.feet && fields.inches;
      } else if (currentAnswer.answer === 'kg/cm') {
        return fields.weightKg && fields.heightCm;
      }
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
          router.push("/dashboard");
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
    if(currentStep !== null && currentStep === questions.length - 1){
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
    if(currentStep !== null && currentStep > questions.length - 1)
    {
       
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
          additionalFields: {} // Reset additional fields when measurement system changes
        },
      }));
    }
  };

  const renderMeasurementFields = () => {
    const currentAnswer = answers[currentStep!]?.answer;
    const fields = answers[currentStep!]?.additionalFields || {};
    if (currentAnswer === 'lbs/ft/in') {
        return (
          <Form layout="vertical" className="mt-4">
            <Form.Item
              label="Weight (lbs)"
              className="mb-4"
            >
              <Input
                prefix={<FaWeight className="text-gray-400" />}
                type="number"
                value={fields.weight || ''}
                onChange={(e) => handleInputChange(e.target.value, 'weight')}
                placeholder="Enter weight in pounds"
                className="w-full"
                size="large"
              />
            </Form.Item>
            
            <Space size="middle" className="w-full">
              <Form.Item 
                label="Height (ft)"
                className="w-full mb-0"
              >
                <Input
                  prefix={<FaRulerVertical className="text-gray-400" />}
                  type="number"
                  value={fields.feet || ''}
                  onChange={(e) => handleInputChange(e.target.value, 'feet')}
                  placeholder="Feet"
                  size="large"
                />
              </Form.Item>
              
              <Form.Item
                label="Height (in)"
                className="w-full mb-0"
              >
                <Input
                  prefix={<FaRulerVertical className="text-gray-400" />}
                  type="number"
                  value={fields.inches || ''}
                  onChange={(e) => handleInputChange(e.target.value, 'inches')}
                  placeholder="Inches"
                  size="large"
                />
              </Form.Item>
            </Space>
          </Form>
        );
      } else if (currentAnswer === 'kg/cm') {
        return (
          <Form layout="vertical" className="mt-4">
            <Form.Item
              label="Weight (kg)"
              className="mb-4"
            >
              <Input
                prefix={<FaWeight className="text-gray-400" />}
                type="number"
                value={fields.weightKg || ''}
                onChange={(e) => handleInputChange(e.target.value, 'weightKg')}
                placeholder="Enter weight in kilograms"
                className="w-full"
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              label="Height (cm)"
              className="mb-0"
            >
              <Input
                prefix={<FaRulerVertical className="text-gray-400" />}
                type="number"
                value={fields.heightCm || ''}
                onChange={(e) => handleInputChange(e.target.value, 'heightCm')}
                placeholder="Enter height in centimeters"
                className="w-full"
                size="large"
              />
            </Form.Item>
          </Form>
        );
      }
      
      return null;
  };

  const renderQuestion = () => {
    const question = questions[currentStep!];

    switch (question.type) {
      case 'number':
        return (
            <Input
        type="number"
        value={answers[currentStep!]?.answer || ''}
        onChange={(e) => handleInputChange(e.target.value)}
        min={0}
        max={120}
        placeholder="Enter your age"
        className="rounded h-12"
      />
        );
      case 'measurement':
        return (
          <div>
           <Radio.Group 
      value={currentStep!==null && answers[currentStep]?.answer}
      onChange={(e) => handleInputChange(e.target.value)}
      className="w-full"
      optionType="button"
    >
      <div className="w-full">
        {question.options?.map((option) => (
          <Radio.Button
            key={option}
            value={option}
           
          >
          
             
              <span className="text-sm font-medium">{option}</span>
              
            
          </Radio.Button>
        ))}
      </div>
    </Radio.Group>
            <div className="mt-10">
            {renderMeasurementFields()}
            </div>
          </div>
        );
      case 'select':
        return (
          <select
            value={answers[currentStep!]?.answer || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select an option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'multiple-choice':
        return (
            <div className="grid gap-3">
            {question.options?.map((option) => (
              <Button
                key={option}
                type={answers[currentStep!]?.answer === option ? "primary" : "default"} // Primary type when selected
                onClick={() => handleInputChange(option)}
                className="w-full text-left rounded-md border transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-100"
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  borderColor: answers[currentStep!]?.answer === option ? '#13c2c2' : '#d9d9d9', // Set border color based on selected state
                }}
              >
                {option}
              </Button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (!mounted || currentStep === null) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  if (showCongratulations) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-teal-700 mb-4">
            Profile Created Successfully! 🎉
          </h1>
          <p className="text-gray-600">
            Your profile has been created and saved.
          </p>
          <p className="text-gray-600 mt-2">
            Redirecting to dashboard...
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
            General Information
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
                  className={`w-2 h-2 ${
                    progressPercentage === 100 ? "text-white" : "text-teal-600"
                  }`}
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="absolute right-0 top-5 text-xs text-gray-600">
              Step {currentStep > questions.length -1    ? currentStep: currentStep + 1} of {questions.length}
            </div>
          </div>
        </div>

        {currentStep !== null && (
          <div className="mb-8">
            {currentStep < questions.length ? (
              <>
                <h2 className="text-lg font-medium mb-3">
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
                  Please review your information and save your profile.
                </p>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="w-full px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Save Profile
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
  className="px-5 py-2" // You can add custom padding or styling here
>
  Next
</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stepper;