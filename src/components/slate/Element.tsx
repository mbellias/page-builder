import Link from 'next/link';
import React from 'react';
import { CustomElement } from '../../lib/slate-types';

export const Element: React.FC<{
  attributes: any;
  children: React.ReactNode;
  element: CustomElement;
}> = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          className='border-l-4 border-gray-300 pl-4 italic text-gray-700'
          style={style}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul
          className='list-disc pl-6'
          style={style}
          {...attributes}
        >
          {React.Children.map(children, (child) => (
            <li {...attributes}>{child}</li>
          ))}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol
          className='list-decimal pl-6'
          style={style}
          {...attributes}
        >
          {React.Children.map(children, (child) => (
            <li {...attributes}>{child}</li>
          ))}
        </ol>
      );
    case 'heading-one':
      return (
        <h1
          className='text-4xl font-bold'
          style={style}
          {...attributes}
        >
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2
          className='text-3xl font-semibold'
          style={style}
          {...attributes}
        >
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li
          style={style}
          {...attributes}
        >
          {children}
        </li>
      );
    case 'link':
      return (
        <Link
          className='cursor-pointer'
          href={element.url}
          style={style}
          {...attributes}
        >
          {children}
        </Link>
      );
    case 'image':
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <img
              src={element.url}
              alt={element.alt}
              style={{ maxWidth: '100%' }}
            />
          </div>
          {children}
        </div>
      );
    default:
      return (
        <p
          style={style}
          {...attributes}
        >
          {children}
        </p>
      );
  }
};
