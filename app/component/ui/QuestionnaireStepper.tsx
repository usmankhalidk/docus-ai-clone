'use client';
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { AnswerType, Question } from "@/app/types/medical";

interface QuestionnaireStepperProps {
  questions: Question[];
  basePath: string;
}

const loadingMessages = [
  "Configuring your AI doctor...",
  "Analyzing your responses...",
  "Optimizing health recommendations...",
  "Preparing your personalized care plan...",
  "Almost ready...",
];

const QuestionnaireStepper: React.FC<QuestionnaireStepperProps> = ({
  questions,
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
  }, [pathname, basePath, questions, router]);

  const calculateProgress = () => {
    if (currentStep === null) return 0;
    return ((currentStep) / (questions.length)) * 100;
  };

  const isCurrentAnswerValid = () => {
    if (currentStep === null) return false;
    const currentAnswer = answers[currentStep];
    
    if (!currentAnswer) return false;

    const question = questions[currentStep];
    switch (question.type) {
      case "yes-no":
      case "multiple-choice":
        return currentAnswer.answer !== undefined;
      case "yes-no-with-text":
        return currentAnswer.answer !== undefined && 
          (!currentAnswer.answer || (currentAnswer.answer && currentAnswer.text?.trim()));
      case "yes-no-with-options":
        return currentAnswer.answer !== undefined &&
          (!currentAnswer.answer || 
           (currentAnswer.answer && 
            currentAnswer.selectedOptions && 
            currentAnswer.selectedOptions.length > 0 &&
            currentAnswer.text?.trim()));
      default:
        return false;
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
          router.push("/dashboard/chat");
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
  };

  const handleYesNoAnswer = (value: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep!]: { 
        answer: value,
        selectedOptions: value ? [] : undefined,
        text: value ? "" : undefined
      },
    }));
  };

  const handleTextInput = (text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep!]: { ...prev[currentStep!], text },
    }));
  };

  const handleOptionToggle = (option: string) => {
    setAnswers((prev) => {
      const currentAnswer = prev[currentStep!];
      const selectedOptions = currentAnswer?.selectedOptions || [];
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];

      return {
        ...prev,
        [currentStep!]: {
          ...currentAnswer,
          selectedOptions: updatedOptions,
        },
      };
    });
  };

  const renderQuestion = () => {
    const question = questions[currentStep!];

    switch (question.type) {
      case "yes-no":
        return (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleYesNoAnswer(false)}
              className={`w-full px-5 py-2 rounded-md border ${
                answers[currentStep!]?.answer === false
                  ? "bg-teal-50 border-teal-200 text-teal-700"
                  : "bg-teal-50  hover:border-teal-200 text-black"
              }`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => handleYesNoAnswer(true)}
              className={`w-full px-5 py-2 rounded-md border ${
                answers[currentStep!]?.answer === true
                  ? "bg-teal-50 border-teal-200 text-teal-700"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              Yes
            </button>
          </div>
        );
      case "yes-no-with-text":
        return (
          <div className="grid grid-cols-1 gap-3">
            <div className="mb-4 flex gap-3">
              <button
                type="button"
                onClick={() => handleYesNoAnswer(false)}
                className={`w-full px-5 py-2 rounded-md border ${
                  answers[currentStep!]?.answer === false
                    ? "bg-teal-50 border-teal-200 text-teal-700"
                    : "bg-teal-50  hover:border-teal-200 text-black"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleYesNoAnswer(true)}
                className={`w-full px-5 py-2 rounded-md border ${
                  answers[currentStep!]?.answer === true
                    ? "bg-teal-50 border-teal-200 text-teal-700"
                    : "bg-teal-50  hover:border-teal-200 text-black"
                }`}
              >
                Yes
              </button>
            </div>
            {answers[currentStep!]?.answer === true && (
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  value={answers[currentStep!]?.text || ""}
                  onChange={(e) => handleTextInput(e.target.value)}
                  placeholder="Please provide more details..."
                />
              </div>
            )}
          </div>
        );
      case "yes-no-with-options":
        return (
          <div className="grid grid-cols-1 gap-3">
            <div className="mb-4 flex gap-3">
              <button
                type="button"
                onClick={() => handleYesNoAnswer(false)}
                className={`w-full px-5 py-2 rounded-md border ${
                  answers[currentStep!]?.answer === false
                    ? "bg-teal-50 border-teal-200 text-teal-700"
                    : "bg-teal-50  hover:border-teal-200 text-black"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleYesNoAnswer(true)}
                className={`w-full px-5 py-2 rounded-md border ${
                  answers[currentStep!]?.answer === true
                    ? "bg-teal-50 border-teal-200 text-teal-700"
                    : "bg-teal-50  hover:border-teal-200 text-black"
                }`}
              >
                Yes
              </button>
            </div>
            {answers[currentStep!]?.answer === true && (
              <>
                <div className="mt-4 space-y-2">
                  {question.options?.map((option) => (
                    <label
                      key={option}
                      className="text-black flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={answers[currentStep!]?.selectedOptions?.includes(option) || false}
                        onChange={() => handleOptionToggle(option)}
                        className=" h-4 w-4 text-teal-600 accent-teal-600 focus:ring-teal-600 focus:ring-offset-0"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4">
                  <textarea
                    className="w-full p-2 border rounded-md text-black"
                    rows={4}
                    value={answers[currentStep!]?.text || ""}
                    onChange={(e) => handleTextInput(e.target.value)}
                    placeholder="Please provide additional details..."
                  />
                </div>
              </>
            )}
          </div>
        );
      case "multiple-choice":
        return (
          <div className="grid gap-3">
            {question.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setAnswers((prev) => ({
                  ...prev,
                  [currentStep!]: { answer: option },
                }))}
                className={`w-full px-5 py-2 text-left rounded-md border ${
                  answers[currentStep!]?.answer === option
                    ? "bg-teal-50 border-teal-200 text-teal-700"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
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
            Congratulations! 🎉
          </h1>
          <p className="text-gray-600">
            Your medical history has been successfully updated.
          </p>
          <p className="text-gray-600 mt-2">
            Redirecting to ai doctor...
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
    <div className="bg-white p-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 w-full justify-center">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                type="button"
                aria-label="Previous question"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h1 className="text-lg font-semibold text-teal-700 text-center flex-grow">
              MEDICAL HISTORY
            </h1>
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
                className="absolute top-0 transition-all duration-300"
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaDiamond
                  className={`w-2 h-2 ${
                    progressPercentage >= 50 ? "text-white" : "text-teal-600"
                  }`}
                  aria-hidden="true"
                />
              </div>
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
              {/* Modified to show steps out of total + 1 for save step */}
              Step {currentStep + 1} of {questions.length }
            </div>
          </div>
        </div>

        {/* Question Section - Show questions or final save step */}
        {currentStep !== null && (
          <div className="mb-8">
            {currentStep < questions.length ? (
              <>
                <h2 className="text-lg font-medium mb-3 text-black text-[14px]">
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
                  Please review your answers and save your medical history.
                </p>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="w-full px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep < questions.length && (
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="text-teal-600 hover:text-teal-700"
            >
              Save and Exit
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!isCurrentAnswerValid()}
              className="px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
    );
    };

    export default QuestionnaireStepper;
