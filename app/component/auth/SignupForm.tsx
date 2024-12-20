'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdArrowBack } from 'react-icons/md';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(email, password);
      router.push('/dashboard');
    } catch (error) {
      setError('Failed to create account');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      // Implement Google signup logic here
      router.push('/dashboard');
    } catch (error) {
      setError('Failed to sign up with Google');
    }
  };

  if (showEmailForm) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/images/docus-logo.svg"
              alt="Docus"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowEmailForm(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <MdArrowBack className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold text-gray-900">
              Create your account
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Set password"
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Confirm password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Sign up
            </button>
          </form>

          <div className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-teal-600 hover:text-teal-500">
              Sign in
            </Link>
          </div>

          <div className="text-xs text-center text-gray-500">
            By signing up you agree to the{' '}
            <Link href="/terms" className="text-gray-600 hover:text-gray-900">
              Terms of Use
            </Link>
            ,{' '}
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            {' '}and{' '}
            <Link href="/cookies" className="text-gray-600 hover:text-gray-900">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/images/docus-logo.svg"
            alt="Docus"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900">
          Create your account
        </h2>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <FcGoogle className="h-5 w-5 text-blue-600" />
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <button
          onClick={() => setShowEmailForm(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <MdEmail className="h-5 w-5 text-gray-400" />
          Sign up with email
        </button>

        <div className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-600 hover:text-teal-500">
            Sign in
          </Link>
        </div>

        <div className="text-xs text-center text-gray-500">
          By signing up you agree to the{' '}
          <Link href="/terms" className="text-gray-600 hover:text-gray-900">
            Terms of Use
          </Link>
          ,{' '}
          <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
            Privacy Policy
          </Link>
          {' '}and{' '}
          <Link href="/cookies" className="text-gray-600 hover:text-gray-900">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}