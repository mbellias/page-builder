import { MdPreview } from 'react-icons/md';
import useEditor from './hooks/useEditor';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { WebsiteElements } from './WebsiteElements';

function PreviewDialogBtn() {
  const { activePageId, elementsByPage } = useEditor();
  const elements = activePageId ? elementsByPage[activePageId] || [] : [];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className='flex items-center text-sm w-full h-full'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p className='mr-2'>Preview</p>
          <MdPreview />
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent
          className='w-screen h-screen max-h-screen max-w-full overflow-y-auto'
          aria-describedby={undefined}
        >
          <DialogHeader className='px-4 py-2 border-b h-[75px]'>
            <DialogTitle>Website preview</DialogTitle>
            <p className='text-sm text-muted-foreground'>
              This is how your website will look like to your users.
            </p>
          </DialogHeader>
          <div className='bg-background h-full w-full rounded-2xl p-8'>
            {elements.map((element) => {
              const WebsiteComponent =
                WebsiteElements[element.type].websiteComponent;
              return (
                <WebsiteComponent
                  key={element.id}
                  elementInstance={element}
                />
              );
            })}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default PreviewDialogBtn;
