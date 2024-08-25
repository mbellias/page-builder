'use client';

import { idGenerator } from '@/lib/idGenerator';
import { cn } from '@/lib/utils';
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';
import { ResizableBox } from 'react-resizable';
import useEditor from './hooks/useEditor';
import {
  ElementsType,
  WebsiteElementInstance,
  WebsiteElements,
} from './WebsiteElements';

const Editor = forwardRef<HTMLDivElement>((_, ref) => {
  const { activePageId, elementsByPage, addElement, updateElement } =
    useEditor();
  const elements = activePageId ? elementsByPage[activePageId] || [] : [];

  const droppable = useDroppable({
    id: `editor-drop-area-${activePageId}`,
    data: {
      isEditorDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (e: DragEndEvent) => {
      if (!e.active || !e.over || !activePageId) return;

      const isEditorBtnElement = e.active.data?.current?.isEditorBtnElement;
      const isDroppingOverEditorDropArea =
        e.over.data?.current?.isEditorDropArea;

      const droppingSidebarBtnOverEditorDropArea =
        isEditorBtnElement && isDroppingOverEditorDropArea;

      if (droppingSidebarBtnOverEditorDropArea) {
        const type = e.active.data?.current?.type as ElementsType;
        const newElement: WebsiteElementInstance = WebsiteElements[
          type
        ].construct(idGenerator());
        addElement(activePageId, elements.length, newElement);
      }

      const isEditorElement = e.active.data?.current?.isEditorElement;
      if (isEditorElement) {
        const elementId = e.active.data?.current?.elementId;

        // Handle dragging within the editor area
        const deltaX = e.delta.x;
        const deltaY = e.delta.y;

        elements.forEach((el) => {
          if (el.id === elementId) {
            const updatedElement = {
              ...el,
              position: {
                x: el.position.x + deltaX >= 0 ? el.position.x + deltaX : 0,
                y: el.position.y + deltaY >= 0 ? el.position.y + deltaY : 0,
              },
            };
            updateElement(activePageId, el.id, updatedElement);
          }
        });
      }
    },
  });

  const handleResizeElement = (
    id: string,
    newSize: { width: number; height: number }
  ) => {
    if (activePageId) {
      const element = elements.find((el) => el.id === id);
      if (element) {
        const updatedElement = { ...element, size: newSize };
        updateElement(activePageId, id, updatedElement);
      }
    }
  };
  return (
    <div
      ref={(node) => {
        if (typeof ref === 'function') ref(node);
        else if (ref)
          (ref as MutableRefObject<HTMLDivElement | null>).current = node;

        droppable.setNodeRef(node);
      }}
      className={cn(
        'w-full h-full rounded',
        droppable.isOver && 'ring-4 ring-primary ring-inset'
      )}
    >
      {!droppable.isOver && elements.length === 0 && (
        <p className='w-full h-full flex flex-grow text-3xl font-bold justify-center items-center uppercase'>
          Drop here
        </p>
      )}
      {elements.length > 0 && (
        <>
          {elements.map((element) => (
            <EditorElementWrapper
              key={element.id}
              element={element}
              onResizeElement={handleResizeElement}
            />
          ))}
        </>
      )}
    </div>
  );
});

export default Editor;

function EditorElementWrapper({
  element,
  onResizeElement,
}: {
  element: WebsiteElementInstance;
  onResizeElement: (
    id: string,
    newSize: { width: number; height: number }
  ) => void;
}) {
  const { setSelectedElement, setSelectedPage } = useEditor();
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const EditorElement = WebsiteElements[element.type].editorComponent;

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isEditorElement: true,
    },
  });

  useEffect(() => {
    if (draggable.isDragging) {
      setSelectedPage(null);
      setSelectedElement(null);
    }
  }, [draggable, setSelectedElement, setSelectedPage]);

  if (draggable.isDragging) {
    return null;
  }

  return (
    <ResizableBox
      width={element.size.width}
      height={element.size.height}
      minConstraints={[50, 50]}
      maxConstraints={[Infinity, Infinity]}
      onResize={(_, { size }) => {
        onResizeElement(element.id, size);
      }}
      resizeHandles={['e']}
      style={{
        position: 'absolute',
        left: element.position.x,
        top: element.position.y,
      }}
    >
      <div
        ref={draggable.setNodeRef}
        {...draggable.listeners}
        {...draggable.attributes}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'move', // Indicate draggable behavior
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedPage(null);
          setSelectedElement(element);
        }}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
      >
        {mouseIsOver && (
          <div className='absolute flex items-center justify-center rounded-lg h-3/4 w-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <p className='text-transparent bg-clip-text bg-indigo-400 text-xl font-extrabold uppercase animate-bounce'>
              Click for properties or drag to move
            </p>
          </div>
        )}
        <EditorElement elementInstance={element} />
      </div>
    </ResizableBox>
  );
}
