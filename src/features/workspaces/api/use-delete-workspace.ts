import { useMutation } from 'convex/react';

import { api } from '../../../../convex/_generated/api';
import { useCallback, useMemo, useState } from 'react';
import { Id } from '../../../../convex/_generated/dataModel';

type RequestType = { id: Id<'workspaces'> };
type ResponseType = Id<'workspaces'> | null;

//define the options type
type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useRemoveWorkspace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    'success' | 'error' | 'settled' | 'pending' | null
  >(null);

  //derived state values
  const isPending = useMemo(() => status === 'pending', [status]);
  const isSuccess = useMemo(() => status === 'success', [status]);
  const isError = useMemo(() => status === 'error', [status]);
  const isSettled = useMemo(() => status === 'settled', [status]);

  //get the mutation function from the api.convex/workspaces.ts
  const mutation = useMutation(api.workspaces.remove);

  //define the mutate function. This will get the values from the form and pass it to the mutation function. It will also handle the options and the status.
  //useCallback in case we need to use it in a useEffect and therefore need it to be a stable reference (memoized).
  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        //reset state values
        setData(null);
        setError(null);
        //set the status to pending
        setStatus('pending');

        const response = await mutation(values);
        //we then call the onSuccess function if it exists.
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus('error');
        //we then call the onError function if it exists.
        options?.onError?.(error as Error);
        if (options?.throwError) {
          throw error;
        }
      } finally {
        //we then call the onSettled function if it exists.
        setStatus('settled');
        options?.onSettled?.();
      }
    },
    [mutation]
  );
  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
};
