'use client';
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { Input, Form, Button, Radio, DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";
type QuestionType = 'text' | 'multiple-choice' | 'date' | 'yes-no-field';

interface Question {
  slug: string;
  title: string;
  description: string;
  type: QuestionType;
  options?: { title: string; description: string; }[];
  showWhen?: {
    questionSlug: string;
    answer: string;
  };
}

interface AnswerType {
  [key: string]: {
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
    slug: 'test-type',
    title: 'Choose the test result type',
    description: 'Select the specific type of lab test performed.',
    type: 'multiple-choice',
    showWhen: {
      questionSlug: 'screening-type',
      answer: 'Lab Test'
    },
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

const loadingMessages = [
  "Saving your lab results...",
  "Processing your information...",
  "Preparing your health insights...",
  "Almost ready...",
];

interface LabStepperProps {
  basePath: string;
}

const LabStepper: React.FC<LabStepperProps> = ({ basePath }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Initialize answers from localStorage if available
  const [answers, setAnswers] = useState<AnswerType>(() => {
    if (typeof window !== 'undefined') {
      const savedAnswers = localStorage.getItem('labStepperAnswers');
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    }
    return {};
  });
  
  const [currentSlug, setCurrentSlug] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);

  // Persist answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('labStepperAnswers', JSON.stringify(answers));
    }
  }, [answers]);

  // Define visible questions based on current answers with improved logging
  const visibleQuestions = useMemo(() => {
    console.log('Recalculating visible questions. Current answers:', answers);
    return questions.filter(question => {
      if (!question.showWhen) return true;
      
      const dependentAnswer = answers[question.showWhen.questionSlug]?.answer;
      console.log(`Checking visibility for ${question.slug}:`, {
        dependsOn: question.showWhen.questionSlug,
        expectedAnswer: question.showWhen.answer,
        actualAnswer: dependentAnswer,
        isVisible: dependentAnswer === question.showWhen.answer
      });
      
      return dependentAnswer === question.showWhen.answer;
    });
  }, [answers]);

  // Modified save answer function with improved state management
  const saveAnswer = (value: string | number, field?: string) => {
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [currentSlug]: {
          answer: field ? prev[currentSlug]?.answer : value,
          additionalFields: field ? {
            ...(prev[currentSlug]?.additionalFields || {}),
            [field]: value
          } : prev[currentSlug]?.additionalFields
        }
      };

      // Special handling for screening-type changes
      if (currentSlug === 'screening-type') {
        console.log('Screening type changed to:', value);
        if (value !== 'Lab Test') {
          delete newAnswers['test-type'];
        }
      }

      console.log('Updating answers to:', newAnswers);
      return newAnswers;
    });
  };

  // Handle routing and current slug updates with improved logic
  useEffect(() => {
    const slug = pathname?.split("/").pop() || '';
    console.log('Current pathname slug:', slug);
    
    // Check if the current slug is valid considering the current answers
    const isValidSlug = visibleQuestions.some(q => q.slug === slug);
    
    if (!isValidSlug) {
      const firstValidSlug = visibleQuestions[0]?.slug;
      console.log('Invalid slug, redirecting to:', firstValidSlug);
      if (firstValidSlug && firstValidSlug !== slug) {
        router.replace(`${basePath}/${firstValidSlug}`);
      }
    } else {
      console.log('Setting current slug to:', slug);
      setCurrentSlug(slug);
    }
  }, [pathname, basePath, router, visibleQuestions]);

  // Calculate current step index with improved error handling
  const currentStepIndex = useMemo(() => {
    const index = visibleQuestions.findIndex(q => q.slug === currentSlug);
    console.log('Current step index:', index);
    return index === -1 ? 0 : index;
  }, [visibleQuestions, currentSlug]);

  const nextStep = async () => {
    if (currentStepIndex < visibleQuestions.length - 1) {
      const nextQuestion = visibleQuestions[currentStepIndex + 1];
      console.log('Moving to next question:', nextQuestion.slug);
      await router.push(`${basePath}/${nextQuestion.slug}`);
    } else {
      handleSaveChanges();
    }
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
  const prevStep = async () => {
    if (currentStepIndex > 0) {
      const prevQuestion = visibleQuestions[currentStepIndex - 1];
      console.log('Moving to previous question:', prevQuestion.slug);
      await router.push(`${basePath}/${prevQuestion.slug}`);
    }
  };
  const handleSaveChanges = () => {
    setIsSaving(true);
  };
    const isCurrentAnswerValid = () => {
    const currentAnswer = answers[currentSlug];
    if (!currentAnswer) return false;

    if (visibleQuestions[currentStepIndex].type === 'yes-no-field') {
      if (currentAnswer.answer === 'yes') {
        return currentAnswer.additionalFields?.details !== undefined;
      }
      return currentAnswer.answer !== undefined;
    }

    return currentAnswer.answer !== undefined && currentAnswer.answer !== '';
  };
  const calculateProgress = () => {
    return ((currentStepIndex) / (visibleQuestions.length - 1)) * 100;
  };
  // Clear answers when component unmounts or user completes the form
  useEffect(() => {
    return () => {
      if (showCongratulations) {
        localStorage.removeItem('labStepperAnswers');
      }
    };
  }, [showCongratulations]);

  const renderQuestion = () => {
    const question = visibleQuestions[currentStepIndex];
    const currentAnswer = answers[currentSlug];

    // Log current question and answer for debugging
    console.log('Rendering question:', question.slug);
    console.log('Current answer:', currentAnswer);
  
    switch (question.type) {
      case 'text':
        return (
          <Input.TextArea
            value={currentAnswer?.answer || ''}
            onChange={(e) => saveAnswer(e.target.value)}
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
              type={currentAnswer?.answer === option.title ? "primary" : "default"}
              onClick={() => {
                console.log('Selected option:', option.title);
                saveAnswer(option.title);
              }}
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
                onChange={(e) => saveAnswer(e.target.value, 'details')}
                placeholder="Please provide additional information"
                className="mt-4"
                rows={4}
              />
            )}
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
      default:
        return null;
    }
  };

  if (showCongratulations) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
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
      <div className="min-h-screen p-4 flex items-center justify-center">
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
            {currentStepIndex > 0 && (
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
              Step {currentStepIndex + 1} of {visibleQuestions.length}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3 text-black">
            {visibleQuestions[currentStepIndex].title}
          </h2>
          <p className="text-gray-600 mb-6 text-[12px]">
            {visibleQuestions[currentStepIndex].description}
          </p>
          {renderQuestion()}
        </div>

        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={nextStep}
            disabled={!isCurrentAnswerValid()}
            className="px-5 py-2"
          >
            {currentStepIndex === visibleQuestions.length - 1 ? 'Save' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LabStepper;