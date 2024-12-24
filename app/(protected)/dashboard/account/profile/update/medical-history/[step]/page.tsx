import QuestionnaireStepper from '@/app/component/ui/QuestionnaireStepper';
import { Question } from '@/app/types/medical';
export default function MedicalHistoryPage() {
  const basePath = '/dashboard/account/profile/update/medical-history';

    const medicalQuestions:Question[] = [
        {
          title: "Surgical History",
          description: "Have you had any major surgeries?",
          slug: "surgical-history",
          type: "yes-no-with-text"
        },
        {
          title: "Family Health History",
          description: "Do you have any family history of chronic diseases?",
          slug: "family-health",
          type: "yes-no-with-options",
          options: ["Heart Disease", "Diabetes", "Cancer", "Osteoporosis"]
        },
        {
          title: "Daily Smoking Intensity",
          description: "How many cigarettes do you smoke daily?",
          slug: "smoking-intensity",
          type: "multiple-choice",
          options: ["Non-smoker", "1-10 cigarettes", "About 1 pack", "More than 1 pack", "Electronic cigarettes/vaping"]
        }
      ];
  
  
  
  return (
<div className='min-h-screen bg-gray-100 flex justify-center items-center overflow-hidden'>
  <div className="w-full max-w-2xl">
    <QuestionnaireStepper
      questions={medicalQuestions}
      basePath={basePath}
    />
  </div>
</div>

  );
}