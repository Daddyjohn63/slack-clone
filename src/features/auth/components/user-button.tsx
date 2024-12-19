'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '../api/use-current-user';
import { Loader, LogOut } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Force a hard navigation to the auth page
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return <Loader className="size-4 text-muted-foreground animate-spin" />;
  }

  if (!data) {
    return null;
  }

  const { image, name } = data;
  const avatarFallback = name!.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className=" rounded-md size-10 hover:opacity-75 transition">
          <AvatarImage className="rounded-md" alt={name} src={image} />
          <AvatarFallback className="bg-sky-500 text-white rounded-md">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={handleSignOut} className="h-10">
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
