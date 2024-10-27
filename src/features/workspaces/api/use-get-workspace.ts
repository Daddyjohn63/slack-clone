import { useQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

interface UseGetWorkspaceProps {
  id: Id<'workspaces'>;
}

//will return all workspaces for the current user.It call the api and return the data and isLoading state.
export const useGetWorkspace = ({ id }: UseGetWorkspaceProps) => {
  const data = useQuery(api.workspaces.getById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
};
