import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { SidebarElementBtnDragOverlay } from './SidebarElementBtn';
import { ElementsType, WebsiteElements } from './WebsiteElements';
import useEditor from './hooks/useEditor';

function DragOverlayWrapper() {
  const { elementsByPage, activePageId } = useEditor();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (e) => {
      setDraggedItem(e.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;

  const isSidebarElementBtn = draggedItem.data?.current?.isEditorBtnElement;

  if (isSidebarElementBtn) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = (
      <SidebarElementBtnDragOverlay websiteElement={WebsiteElements[type]} />
    );
  }

  const isEditorElement = draggedItem.data?.current?.isEditorElement;
  if (isEditorElement && activePageId) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elementsByPage[activePageId]?.find(
      (el) => el.id === elementId
    );
    if (!element) node = <div>Element not found</div>;
    else {
      const EditorElementComponent =
        WebsiteElements[element.type].editorComponent;

      node = <EditorElementComponent elementInstance={element} />;
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
