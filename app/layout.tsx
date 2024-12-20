import { AuthProvider } from './context/AuthContext';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}