import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BlockQuoteElement
  | ListElement
  | ListItemElement
  | LinkElement
  | ImageElement;

export interface ParagraphElement {
  type: 'paragraph';
  align?: 'left' | 'center' | 'right';
  children: CustomText[];
}

export interface HeadingElement {
  type: 'heading-one' | 'heading-two';
  align?: 'left' | 'center' | 'right';
  children: CustomText[];
}

export interface BlockQuoteElement {
  type: 'block-quote';
  align?: 'left' | 'center' | 'right';
  children: CustomText[];
}

export interface ListElement {
  type: 'bulleted-list' | 'numbered-list';
  align?: 'left' | 'center' | 'right';
  children: CustomText[];
}

export interface ListItemElement {
  type: 'list-item';
  align?: 'left' | 'center' | 'right';
  children: CustomText[];
}

export interface LinkElement {
  type: 'link';
  url: string;
  align?: 'left' | 'center' | 'right';
  children: CustomText[];
}

export interface ImageElement {
  type: 'image';
  url: string;
  alt?: string;
  align?: 'left' | 'center' | 'right';
  children: EmptyText[];
}

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  link?: string;
  color?: string;
  size?: string;
};

export type EmptyText = {
  text: '';
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
