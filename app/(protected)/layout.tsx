'use client';


import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import { useAuth } from '../context/AuthContext';


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
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}