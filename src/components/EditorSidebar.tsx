import React from 'react';
import SidebarElementBtn from './SidebarElementBtn';
import { WebsiteElements } from './WebsiteElements';

function EditorSidebar() {
  return (
    <div className='overflow-y-auto h-full'>
      <p className='p-2'>Drag and Drop Elements</p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center p-4'>
        <SidebarElementBtn websiteElement={WebsiteElements.RichTextElement} />
      </div>
    </div>
  );
}

export default EditorSidebar;
