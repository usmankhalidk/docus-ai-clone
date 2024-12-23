import { AiOutlineHistory } from 'react-icons/ai';

const HeaderSection = () => (
  <div className="flex flex-col items-center mb-10">
    <div className="w-16 h-16 bg-teal-100 flex items-center justify-center rounded-full">
      <AiOutlineHistory className="text-teal-500 text-4xl" />
    </div>
    <h1 className="text-2xl font-semibold mt-4 text-black">usman&apos;s AI Doctor</h1>
    <p className="text-gray-600">Choose the AI Doctor type to start a conversation.</p>
  </div>
);

export default HeaderSection;
