import { RichTextWebsiteElement } from './elements/RichTextWebsiteElement';

export type ElementsType = 'RichTextElement';

export type WebsiteElement = {
  type: ElementsType;

  construct: (id: string) => WebsiteElementInstance;

  editorBtn: {
    icon: React.ElementType;
    label: string;
  };

  editorComponent: React.FC<{
    elementInstance: WebsiteElementInstance;
  }>;
  websiteComponent: React.FC<{
    elementInstance: WebsiteElementInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: WebsiteElementInstance;
  }>;
};

type Position = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

export type WebsiteElementInstance = {
  id: string;
  type: ElementsType;
  size: Size;
  position: Position;
  attributes?: Record<string, any>;
};

type WebsiteElementsType = {
  [key in ElementsType]: WebsiteElement;
};

export const WebsiteElements: WebsiteElementsType = {
  RichTextElement: RichTextWebsiteElement,
};
