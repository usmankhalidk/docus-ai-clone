export interface  Question {
    title: string;
    description: string;
    slug: string;
    type: "yes-no" | "yes-no-with-text" | "yes-no-with-options" | "multiple-choice";
    options?: string[];
  }
export type AnswerType = {
  [key: number]: {
    answer: boolean | string;
    text?: string;
    selectedOptions?: string[];
  };
};
