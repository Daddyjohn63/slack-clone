'use client';

import { UserButton } from '@/features/auth/components/user-button';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from 'next/navigation';
import { useMemo, useEffect } from 'react';

export default function Home() {
  // const { signOut } = useAuthActions();
  // const router = useRouter();

  // const handleSignOut = async () => {
  //   await signOut();
  //   router.push('/auth');
  // };
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log('Redirect to workspace');
    } else if (!open) {
      setOpen(true);
    }
  }, [isLoading, workspaceId, open, setOpen]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
