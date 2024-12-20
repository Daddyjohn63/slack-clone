'use client';

import { UserButton } from '@/features/auth/components/user-button';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal';

import { useRouter } from 'next/navigation';
import { useMemo, useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal();
  //get the data and isLoading state from the useGetWorkspaces hook.
  const { data, isLoading } = useGetWorkspaces();

  //get the first workspace id from the data.
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [isLoading, workspaceId, open, setOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
