import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateWorkspace } from '../api/use-create-workspace';

export const CreateWorkspaceModal = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate } = useCreateWorkspace();
  const handleClose = () => {
    setOpen(false);
    //TODO: Clear form
  };

  const handleSubmit = () => {
    mutate(
      {
        name: 'Workspace 1'
      },
      {
        onSuccess() {
          //redirect to the new workspace
        },
        onError: () => {
          //toast error
        },
        onSettled: () => {
          //reset the form
        }
      }
    );
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   mutate(
  //     { name },
  //     {
  //       onSuccess(id) {
  //         toast.success('Workspace created');
  //         router.push(`/workspace/${id}`);
  //         handleClose();
  //       }
  //     }
  //   );
  // };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            // disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
