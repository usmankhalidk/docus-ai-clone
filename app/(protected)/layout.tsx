'use client';


import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


import { useAuth } from '../context/AuthContext';
import Header from '../component/protected/layout/Header';


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // Don't render anything while checking authentication
  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}