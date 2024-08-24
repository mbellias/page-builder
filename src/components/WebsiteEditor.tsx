'use client';

import {
  DndContext,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Website } from '@prisma/client';
import { useEffect, useState } from 'react';
import DragOverlayWrapper from './DragOverlayWrapper';
import Editor from './Editor';
import EditorSidebar from './EditorSidebar';
import EditorSidebarActions from './EditorSidebarActions';
import useEditor from './hooks/useEditor';
import { Separator } from './ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CreatePageBtn from './CreatePageBtn';
import PagePropertiesSidebar from './PagePropertiesSidebar';

function WebsiteEditor({ website }: { website: Website }) {
  const {
    setActivePageId,
    setElementsByPage,
    pages,
    setPages,
    selectedPage,
    setSelectedPage,
  } = useEditor();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 500,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;

    const parsedContent = JSON.parse(website.content);
    console.log('Parsed Content:', parsedContent);

    const validPageIds = Object.keys(parsedContent).filter((slug) => slug);

    setElementsByPage(parsedContent);

    if (validPageIds.length > 0) {
      const initialEditors = validPageIds.map((slug) => ({
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        slug: slug,
        createdAt: new Date(parsedContent[slug].createdAt),
      }));

      initialEditors.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );

      setPages(initialEditors);
      setActivePageId(initialEditors[0].slug);
    } else {
      const newTabId = 'home';
      setPages([{ name: 'Home', slug: newTabId, createdAt: new Date() }]);
      setActivePageId(newTabId);
    }
    setIsReady(true);
  }, [website, setElementsByPage, setActivePageId, isReady]);

  const addTab = (
    name: string,
    slug: string,
    createdAt: Date,
    description?: string
  ) => {
    setPages((prev) => [...prev, { name, slug, description, createdAt }]);
    setActivePageId(slug);
  };

  const handleTabChange = (tabId: string) => {
    setActivePageId(tabId);

    const activePage = pages.find((page) => page.slug === tabId);
    if (activePage) {
      setSelectedPage(activePage);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
    >
      <main className='flex w-full bg-background'>
        <nav className='flex flex-col w-1/4 p-4 gap-3 items-center'>
          <h2 className='flex text-xl font-semibold'>
            <span className='text-muted-foreground mb-2 mr-2'>Website:</span>
            {website.name}
          </h2>
          <div className='flex flex-col item-center mb-2'>
            <EditorSidebarActions website={website} />
          </div>
          <Separator orientation='horizontal' />
          {!selectedPage && <EditorSidebar />}
          {selectedPage && <PagePropertiesSidebar />}
        </nav>
        <Tabs
          className='w-full h-full'
          defaultValue={pages.length > 0 ? pages[0].slug : 'home'}
          onValueChange={handleTabChange}
        >
          <TabsList className='flex justify-start gap-2 h-12 rounded-none'>
            {pages.map((page) => (
              <TabsTrigger
                onClick={() => {
                  setSelectedPage(page);
                }}
                asChild
                key={page.slug}
                value={page.slug}
                className='h-[35px] px-5 flex-1 flex items-center justify-center text-[15px] leading-none select-none first:rounded-tl-md last:rounded-tr-md hover:text-primary data-[state=active]:shadow-sm outline-none'
              >
                <button>{page.name}</button>
              </TabsTrigger>
            ))}
            <CreatePageBtn addTab={addTab} />
          </TabsList>
          <div className='flex w-full h-full flex-grow relative overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
            {pages.map((page) => (
              <TabsContent
                asChild
                key={page.slug}
                value={page.slug}
              >
                <Editor />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default WebsiteEditor;
