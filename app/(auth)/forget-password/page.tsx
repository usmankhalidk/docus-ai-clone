import ForgetPasswordForm from '@/app/component/auth/ForgetPasswordForm';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Forget Password | Your App Name',
  description: 'Reset your password',
  openGraph: {
    title: 'Forget Password | Your App Name',
    description: 'Reset your password',
    type: 'website',
  },
};

export default function ForgetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-10 px-4 sm:px-6 lg:px-8 bg-gray-100 ">
      <div className="max-w-md w-full space-y-8">
        <ForgetPasswordForm />
      </div>
    </div>
  );
}