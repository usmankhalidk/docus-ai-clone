'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from 'react-icons/md';
import { FaKey } from 'react-icons/fa';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/welcome');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    return;
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-white p-10">
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
          Welcome back!
        </h2>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="relative">
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/forget-password" className="text-sm text-teal-600 hover:text-teal-500">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Sign in
          </button>
        </form>

        <div className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-teal-600 hover:text-teal-500">
            Sign up
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <FcGoogle className="h-5 w-5 text-blue-600" />
          Continue with Google
        </button>

        <div className="text-xs text-center text-gray-500">
          By signing in you agree to the{' '}
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