'use client';
import { usePathname } from 'next/navigation';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';
import UpperFooter from '../component/layout/UpperFooter';

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
  const isContactPage = pathname === '/contact';

  if (shouldHideHeaderFooter) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      {!isContactPage && <UpperFooter />}
      <Footer />
    </>
  );
};
export default LayoutWrapper;