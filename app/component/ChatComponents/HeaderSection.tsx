import Image from 'next/image';
import { AiOutlineHistory } from 'react-icons/ai';

const HeaderSection = () => (
  <div className="flex flex-col items-center mb-10">
    <div className="w-16 h-16 flex items-center justify-center rounded-full">
      <Image src="/assets/chat-doctor.svg" height={150} width={150} alt='AI doctor' />
    </div>
    <h1 className="text-2xl font-semibold mt-4 text-black">usman&apos;s AI Doctor</h1>
    <p className="text-gray-600">Choose the AI Doctor type to start a conversation.</p>
  </div>
);

export default HeaderSection;
