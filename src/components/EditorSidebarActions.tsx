import React from 'react';
import { Button } from './ui/button';
import { IoMdArrowDropdown } from 'react-icons/io';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import PreviewDialogBtn from './PreviewDialogBtn';
import SaveWebsiteBtn from './SaveWebsiteBtn';
import UnpublishWebsiteBtn from './UnpublishWebsiteBtn';
import PublishWebsiteBtn from './PublishWebsiteBtn';
import { Website } from '@prisma/client';

function EditorSidebarActions({ website }: { website: Website }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='flex items-center justify-between'
        asChild
      >
        <Button
          variant={'outline'}
          className='flex items-center'
        >
          <span className='text-md font-light mr-2'>Options</span>
          <IoMdArrowDropdown className='arrow-icon h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuItem>
          <PreviewDialogBtn />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SaveWebsiteBtn id={website.id} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          {website.published ? <UnpublishWebsiteBtn /> : <PublishWebsiteBtn />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EditorSidebarActions;
