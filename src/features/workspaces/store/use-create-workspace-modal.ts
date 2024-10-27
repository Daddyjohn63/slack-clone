import { atom, useAtom } from 'jotai';
//TODO: do i need to export modalState?
//do i need to export modalState?
//this is the state for the create workspace modal.
export const modalState = atom(false);

export const useCreateWorkspaceModal = () => {
  return useAtom(modalState);
};
