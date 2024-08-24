import { UpdateWebsiteContent } from '@/actions/website';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { AiFillSave } from 'react-icons/ai';
import useEditor from './hooks/useEditor';
import { toast } from './ui/use-toast';

function SaveWebsiteBtn({ id }: { id: number }) {
  const { elementsByPage } = useEditor();
  const [loading, startTransition] = useTransition();

  const updateWebsiteContent = async () => {
    try {
      const jsonElements = JSON.stringify(elementsByPage);
      await UpdateWebsiteContent(id, jsonElements);
      toast({
        title: 'Success',
        description: 'Website updated successfully!',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Something went wrong, please try again.',
      });
    }
  };

  return (
    <button
      className='flex items-center text-sm w-full h-full'
      disabled={loading}
      onClick={() => startTransition(updateWebsiteContent)}
    >
      <p className='mr-2'>Save</p>
      <AiFillSave />
      {loading && <Loader2 className='animate-spin' />}
    </button>
  );
}

export default SaveWebsiteBtn;
