//hook to call the api endpoint for our current user.
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export const useCurrentUser = () => {
  const data = useQuery(api.users.current);
  const isLoading = data === undefined; //if data is undefined, it is probably still loading, so we can set it as undefined.

  return { data, isLoading };
};
