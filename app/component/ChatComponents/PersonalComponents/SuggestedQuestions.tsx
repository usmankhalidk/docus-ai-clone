import { SuggestedQuestion } from '@/app/types/chat';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import React from 'react';


interface SuggestedQuestionsProps {
  questions: SuggestedQuestion[];
  onQuestionSelect: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ questions, onQuestionSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {questions.map((question) => (
        <button
          key={question.id}
          onClick={() => onQuestionSelect(question.text)}
          className="flex items-center justify-between p-4 text-left bg-teal-50 hover:bg-teal-100 rounded-lg group"
        >
          <span className="text-teal-700">{question.text}</span>
          <ChevronRightIcon className="text-teal-700 h-7 w-7" />
        </button>
      ))}
    </div>
  );
};
export default SuggestedQuestions;