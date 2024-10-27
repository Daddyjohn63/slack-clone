import { useParams } from 'next/navigation';
import { Id } from '../../convex/_generated/dataModel';

//custom hook to get the workspace id from the url.We can use this throughout the app and ensure our typesafety.
export const useWorkspaceId = () => {
  const params = useParams();
  return params.workspaceId as Id<'workspaces'>;
};
