'use client';

import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace';
import { useWorkspaceId } from '@/hooks/use-workspace-id';

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });

  return (
    <div>
      <span>Data: {JSON.stringify(data)}</span>
      {`Workspace ${data?.name}`}
    </div>
  );
};

export default WorkspaceIdPage;
