'use client';

import React from 'react';
import { WebsiteElement } from './WebsiteElements';
import { Button } from './ui/button';
import { useDraggable } from '@dnd-kit/core';

function SidebarElementBtn({
  websiteElement,
}: {
  websiteElement: WebsiteElement;
}) {
  const { label, icon: Icon } = websiteElement.editorBtn;
  const draggable = useDraggable({
    id: `editor-btn-${websiteElement.type}`,
    data: {
      type: websiteElement.type,
      isEditorBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={'outline'}
      className='flex flex-col gap-2 h-[120px] w-[120px]'
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon className='h-8 w-8 cursor-grab' />
      <p className='text-sm'>{label}</p>
    </Button>
  );
}

export default SidebarElementBtn;

export function SidebarElementBtnDragOverlay({
  websiteElement,
}: {
  websiteElement: WebsiteElement;
}) {
  const { label, icon: Icon } = websiteElement.editorBtn;

  return (
    <Button
      variant={'outline'}
      className='flex flex-col gap-2 h-[120px] w-[120px]'
    >
      <Icon className='h-8 w-8 cursor-grab' />
      <p className='text-sm'>{label}</p>
    </Button>
  );
}
