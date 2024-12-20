import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Your App Name',
  description: 'View your personal dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-6">
          <p className="text-gray-600">Welcome to your protected dashboard!</p>
        </div>
      </div>
    </div>
  );
}