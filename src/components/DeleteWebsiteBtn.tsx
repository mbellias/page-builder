'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useTransition } from 'react';
import { DeleteWebsite } from '@/actions/website';
import { Loader2 } from 'lucide-react';
import { FaTrash } from 'react-icons/fa';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

function DeleteWebsiteBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();

  const deleteWebsite = async () => {
    try {
      await DeleteWebsite(id);
      toast({
        title: 'Success!',
        description: 'Website deleted successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Something went wrong, please try again later',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={'icon'}
          variant={'outline'}
          className='hover:text-red-500 mt-2'
        >
          <FaTrash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            website.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault;
              startTransition(deleteWebsite);
            }}
          >
            {loading ? <Loader2 className='animate-spin h-8 w-8' /> : 'Proceed'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteWebsiteBtn;
