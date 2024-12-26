import QuestionnaireStepper from '@/app/component/ui/QuestionnaireStepper';
import { Question } from '@/app/types/medical';
export default function MedicalHistoryPage() {
  const basePath = '/dashboard/account/profile/update/medical-history';

    const medicalQuestions:Question[] = [
        {
          title: "Chronic and Past Health Conditions",
          description: "Include any chronic conditions or medical issues experienced. Essential for understanding health history and personalized care.",
          slug: "conditions",
          type:'yes-no-with-options',
          options: ["Diabetes", "Hypertension", "Cardiovascular diseases", "Thyroid disorders"]
        },
        {
          title: "Family health history",
          description: "List any chronic diseases present in your family history. This will help us to indicate the genetic risks.",
          slug: "familyHistory",
          type:'yes-no-with-options',
          options: ["Heart Diseases", "Diabetes", "Cancer", "Osteoporosis"]
        },
        {
          title: "Known allergies",
          description: "List any allergies you have.",
          slug: "allergies",
          type:'yes-no-with-options',
          options: ["Soy", "Diary/Lactose", "Fish/Shellfish"]
        },
        {
          title: "Surgical History",
          description: "List any major surgeries you have undergone.",
          slug: "surgicalHistory",
          type: "yes-no-with-text"
        },
        {
          title: "Current medications",
          description: "List any medications you are currently taking.",
          slug: "currentMedications",
          type: "yes-no-with-text"
        },
        {
          title: "Medication History (last 6 months)",
          description: "List any medications you have taken in the last 12 months.",
          slug: "prevMedications",
          type: "yes-no-with-text"
        },
        {
          title: "Daily smoking intensity",
          description: "",
          slug: "smoking",
          type: "multiple-choice",
          options: ["Non-smoker", "1-10 cigarettes", "About 1 pack", "More than 1 pack", "Electronic cigarettes/vaping"]
        },
        {
          title: "Weekly alcohol intake",
          description: "A standard drink is equivalent to a regular can or bottle of beer, a typical serving (glass) of wine, or a shot of distilled spirits.",
          slug: "alcohol",
          type: "multiple-choice",
          options: ["Non-drinker", "1-3 standard drinks", "4-7 standard drinks", "8-14 standard drinks", "15+ standard drinks"]
        },
        {
          title: "Dietary habits",
          description: "",
          slug: "dietHabits",
          type: "multiple-choice",
          options: ["Non-specific diet", "Balanced meals", "Frequent Fast Food", "Specific diet plan"]
        },
        {
          title: "Weekly physical activity level",
          description: "",
          slug: "activityLevel",
          type: "multiple-choice",
          options: ["Inactive", "Lightly active", "Moderately active", "Very active"]
        },
        {
          title: "Daily sleep pattern",
          description: "",
          slug: "sleepPattern",
          type: "multiple-choice",
          options: ["7-9 hours", "Less than 6 hours", "More than 9 hours", "Varies significally or interrupted sleep"]
        },
        {
          title: "Stress level",
          description: "",
          slug: "stressLevel",
          type: "multiple-choice",
          options: ["Rarely stressed ", "Manageable stress", "Regular (daily) stress", "Almost always stressed"]
        }
      ];
  
  
  
  return (
<div className='min-h-screen overflow-auto bg-gray-100 flex justify-center items-center overflow-hidden'>
  <div className="w-full max-w-2xl">
    <QuestionnaireStepper
      questions={medicalQuestions}
      basePath={basePath}
    />
  </div>
</div>

  );
}