'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { WebsiteElementInstance } from '../WebsiteElements';

type PageInstance = {
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
};

type EditorContextType = {
  activePageId: string | null;
  setActivePageId: Dispatch<SetStateAction<string | null>>;

  pages: PageInstance[];
  setPages: Dispatch<SetStateAction<PageInstance[]>>;

  updatePage: (pageId: string, updatedPage: PageInstance) => void;
  removePage: (pageId: string) => void;

  elementsByPage: Record<string, WebsiteElementInstance[]>;
  setElementsByPage: Dispatch<
    SetStateAction<Record<string, WebsiteElementInstance[]>>
  >;

  addElement: (
    pageId: string,
    index: number,
    element: WebsiteElementInstance
  ) => void;
  updateElement: (
    pageId: string,
    id: string,
    element: WebsiteElementInstance
  ) => void;
  removeElement: (pageId: string, id: string) => void;

  selectedElement: WebsiteElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<WebsiteElementInstance | null>>;

  selectedPage: PageInstance | null;
  setSelectedPage: Dispatch<SetStateAction<PageInstance | null>>;
};

export const EditorContext = createContext<EditorContextType | null>(null);

export default function EditorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [pages, setPages] = useState<PageInstance[]>([]);
  const [elementsByPage, setElementsByPage] = useState<
    Record<string, WebsiteElementInstance[]>
  >({});
  const [selectedElement, setSelectedElement] =
    useState<WebsiteElementInstance | null>(null);

  const [selectedPage, setSelectedPage] = useState<PageInstance | null>(null);

  const addElement = (
    pageId: string,
    index: number,
    element: WebsiteElementInstance
  ) => {
    setElementsByPage((prev) => {
      const newElements = prev[pageId] ? [...prev[pageId]] : [];
      newElements.splice(index, 0, element);
      return { ...prev, [pageId]: newElements };
    });
  };

  const removeElement = (pageId: string, id: string) => {
    setElementsByPage((prev) => ({
      ...prev,
      [pageId]: prev[pageId].filter((element) => element.id !== id),
    }));
  };

  const updateElement = (
    pageId: string,
    id: string,
    element: WebsiteElementInstance
  ) => {
    setElementsByPage((prev) => {
      const newElements = prev[pageId] ? [...prev[pageId]] : [];
      const index = newElements.findIndex((el) => el.id === id);
      if (index !== -1) {
        newElements[index] = element;
      }
      return { ...prev, [pageId]: newElements };
    });
  };

  const updatePage = (pageId: string, updatedPage: PageInstance) => {
    setPages((prevPages) =>
      prevPages.map((page) => (page.slug === pageId ? updatedPage : page))
    );
  };

  const removePage = (pageId: string) => {
    setPages((prevPages) => prevPages.filter((page) => page.slug !== pageId));

    setElementsByPage((prevElementsByPage) => {
      const { [pageId]: _, ...remainingElements } = prevElementsByPage;
      return remainingElements;
    });
  };
  return (
    <EditorContext.Provider
      value={{
        activePageId,
        setActivePageId,
        pages,
        setPages,
        updatePage,
        removePage,
        selectedPage,
        setSelectedPage,
        elementsByPage,
        setElementsByPage,
        addElement,
        updateElement,
        removeElement,
        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
