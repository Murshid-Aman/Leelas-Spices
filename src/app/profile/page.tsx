import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { ProfilePage } from '@/components/profile/ProfilePage';

export const metadata: Metadata = {
  title: `My Account — ${APP_NAME}`,
  description: 'Manage your profile, addresses, and order history.',
};

export default function Profile() {
  return (
    <div className="bg-[#FDFAF5] min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <ProfilePage />
      </div>
    </div>
  );
}
