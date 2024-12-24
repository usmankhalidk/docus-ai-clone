'use client';
import { usePathname } from 'next/navigation';
import { Footer } from '../component/layout/Footer';
import Header from '../component/layout/Header';
import { UpperFooter } from '../component/layout/UpperFooter';

const noHeaderFooterRoutes = [
    '/login',
    '/signup',
    '/forget-password',
    '/dashboard',
    '/welcome',
  ];
  
  // Component to handle layout logic
  const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    
    // Check if current path should hide header and footers
    const shouldHideHeaderFooter = noHeaderFooterRoutes.some(route => 
      pathname?.startsWith(route)
    );
  
    if (shouldHideHeaderFooter) {
      return <>{children}</>;
    }
  
    return (
      <>
        <Header />
        {children}
        <UpperFooter />
        <Footer />
      </>
    );
  };
  export default LayoutWrapper;