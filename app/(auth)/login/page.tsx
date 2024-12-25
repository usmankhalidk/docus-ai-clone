import LoginForm from '@/app/component/auth/LoginForm';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Login | Your App Name',
  description: 'Sign in to access your account',
  openGraph: {
    title: 'Login | Your App Name',
    description: 'Sign in to access your account',
    type: 'website',
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex  justify-center pt-10 px-4 sm:px-6 lg:px-8 bg-gray-100 ">
      <div className="max-w-md w-full space-y-8">
        <LoginForm />
      </div>
    </div>
  );
}