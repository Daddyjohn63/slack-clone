import { useQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';

//will return all workspaces for the current user.It call the api and return the data and isLoading state.
export const useGetWorkspaces = () => {
  const data = useQuery(api.workspaces.get);
  const isLoading = data === undefined;
  return { data, isLoading };
};
