'use client';

import { UserButton } from '@/features/auth/components/user-button';
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth');
  };

  return (
    <div>
      <UserButton />
    </div>
  );
}
