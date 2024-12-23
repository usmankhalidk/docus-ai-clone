import { AuthProvider } from './context/AuthContext';
import LayoutWrapper from './context/LayoutWrapper';
import './globals.css';
import { Noto_Sans } from 'next/font/google';

// Initialize Noto Sans font
const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-noto-sans',  // This creates a CSS variable for the font
});

export const metadata = {
  title: {
    default: 'Your App Name',
    template: '%s | Your App Name',
  },
  description: 'Your app description',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Company',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourapp.com',
    siteName: 'Your App Name',
    images: [
      {
        url: 'https://yourapp.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your App Name',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your App Name',
    description: 'Your app description',
    images: ['https://yourapp.com/twitter-image.jpg'],
    creator: '@yourusername',
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light ${notoSans.variable}`}>
      <body className={`${notoSans.className} bg-white`}>
        <AuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}