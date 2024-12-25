import ProgressBar from '@/app/component/ui/ProgressBar';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BiMessageSquare, BiUser } from 'react-icons/bi';
import { CgLock } from 'react-icons/cg';
import { FiFileText } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Dashboard | Your App Name',
  description: 'View your personal dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
       <Link href="/dashboard/overview">
       <div className="flex justify-between items-center mb-8 bg-white rounded-lg p-4 shadow">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold capitalize text-teal-600">usman's</h1>
            <h2 className="text-sm md:text-base text-gray-500">Health Profile</h2>
          </div>
          <div className="text-xs font-semibold">
            <div className="flex items-center space-x-2">
              <ProgressBar value={30} max={100} />
            </div>
          </div>
        </div>
       </Link>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Chat with AI Doctor */}
          <Link href="/dashboard/chat" passHref>
            <div className="bg-teal-500/10 p-4 rounded-lg shadow border-teal-600/10 border flex flex-wrap justify-between cursor-pointer">
              <h2 className="text-lg md:text-xl font-semibold w-full sm:w-48 break-words mb-2 sm:mb-0">Chat with AI Doctor</h2>
              <div className="mt-2 flex justify-end w-full sm:w-auto sm:mt-0">
                <Image src={'/assets/personal-ai-doctor.svg'} height={60} width={60} alt='personal ai doctor' />
              </div>
            </div>
          </Link>

          {/* Lab Tests & Screenings */}
          <Link href="/lab-tests" passHref>
            <div className="bg-violet-500/10 p-4 rounded-lg shadow border-violet-600/10 border flex flex-wrap justify-between cursor-pointer">
              <h2 className="text-base md:text-lg font-semibold w-full sm:w-48 break-words mb-2 sm:mb-0">Lab Tests & Screenings</h2>
              <div className="mt-2 flex justify-end w-full sm:w-auto sm:mt-0">
                <Image src={'/assets/empty-test-result.svg'} height={60} width={60} alt='Lab Test' />
              </div>
            </div>
          </Link>

          {/* Checkup Plan */}
          <Link href="/checkup-plan" passHref>
            <div className="bg-white p-4 rounded-lg shadow flex flex-wrap justify-between cursor-pointer">
              <div>
                <h2 className="text-base md:text-lg font-semibold w-full sm:w-48 break-words mb-2 sm:mb-0">Checkup Plan</h2>
                <p className="text-xs md:text-sm text-gray-500">Coming soon</p>
              </div>
              <div className="mt-2 flex justify-end w-full sm:w-auto sm:mt-0">
                <Image src={'/assets/checkupPlan.svg'} height={60} width={60} alt='Checkup Plan' />
              </div>
            </div>
          </Link>

          {/* Health Reports */}
          <Link href="/health-reports" passHref>
            <div className="bg-white p-4 rounded-lg shadow flex flex-wrap justify-between cursor-pointer">
              <div>
                <h2 className="text-base md:text-lg font-semibold w-full sm:w-48 break-words mb-2 sm:mb-0">Health Reports</h2>
                <p className="text-xs md:text-sm text-gray-500">Coming soon</p>
              </div>
              <div className="mt-2 flex justify-end w-full sm:w-auto sm:mt-0">
                <Image src={'/assets/healthReports.svg'} height={60} width={60} alt='health reports' />
              </div>
            </div>
          </Link>

          {/* Consult Top Doctors */}
          <div className="col-span-2 ">
          <Link href="/top-doctors" passHref> 
          <div className='bg-white p-4 rounded-lg shadow flex items-center justify-between'>
            <div>
              <h2 className="text-base md:text-lg font-semibold">Consult Top Doctors</h2>
              <p className="text-xs md:text-sm text-gray-500">
                Online Consultation with top Doctors from the US and Europe.
              </p>
            </div>
            <div className="mt-2 flex justify-center">
              <Image src={'/assets/top-doctors.svg'} height={60} width={60} alt='top doctors'/>
            </div>
            </div>
            </Link>
            
          </div>
            {/* <div className="col-span-2 bg-white p-4 rounded-lg shadow flex items-center justify-between cursor-pointer">
            <Link href="/top-doctors" passHref>
              <div>
                <h2 className="text-base md:text-lg font-semibold">Consult Top Doctors</h2>
                <p className="text-xs md:text-sm text-gray-500">
                  Online Consultation with top Doctors from the US and Europe.
                </p>
              </div>
              <div className="mt-2 flex justify-center">
                <Image src={'/assets/top-doctors.svg'} height={60} width={60} alt='top doctors' />
              </div>
              </Link>
            </div> */}
     
        </div>
      </div>
    </div>
  );
}
