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
import React from 'react';
import useEditor from './hooks/useEditor';
import { WebsiteElements } from './WebsiteElements';
import { Button } from './ui/button';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from './ui/use-toast';

function ElementPropertiesSidebar() {
  const { selectedElement, setSelectedElement, removeElement, activePageId } =
    useEditor();
  if (!selectedElement) return;

  const ElementProperties =
    WebsiteElements[selectedElement.type].propertiesComponent;

  return (
    <div className='flex flex-col w-full px-2'>
      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={() => {
          setSelectedElement(null);
        }}
      >
        <AiOutlineClose />
      </Button>
      <p className='text-muted-foreground my-4'>Element properties</p>
      <ElementProperties elementInstance={selectedElement} />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={'destructive'}
            className='mt-6'
          >
            Remove
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              element and any content it has.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!selectedElement || !activePageId) return;
                removeElement(activePageId, selectedElement.id);
                setSelectedElement(null);
                toast({
                  description: 'Removed element successfully!',
                });
              }}
            >
              Proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ElementPropertiesSidebar;
