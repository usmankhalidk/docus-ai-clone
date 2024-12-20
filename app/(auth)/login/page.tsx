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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}