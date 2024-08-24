import React from 'react';
import { useSlate } from 'slate-react';
import { Transforms, Editor, Element as SlateElement, Text } from 'slate';
import { CustomEditor, CustomElement } from '../../../lib/slate-types';
import { Button, Icon } from '../components';

const isLinkActive = (editor: CustomEditor) => {
  const [link] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
  );
  return !!link;
};

export const LinkBtn: React.FC = () => {
  const editor = useSlate();

  const toggleLink = () => {
    const isActive = isLinkActive(editor);
    if (isActive) {
      // Unlink
      Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          (n as CustomElement).type === 'link',
      });
    } else {
      // Link
      const url = prompt('Enter the URL') || '';
      if (url) {
        Transforms.wrapNodes(
          editor,
          { type: 'link', url, children: [] } as CustomElement,
          { match: (n) => Text.isText(n), split: true }
        );
      }
    }
  };

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        toggleLink();
      }}
    >
      <Icon>link</Icon>
    </Button>
  );
};
