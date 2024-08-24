import { Editor, Element, Transforms } from 'slate';
import { CustomEditor, CustomElement } from '../../../lib/slate-types';
import { useSlate } from 'slate-react';
import { Button, Icon } from '../components';

const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const;
const TEXT_ALIGN_TYPES = ['left', 'center', 'right'] as const;

const toggleBlock = (editor: CustomEditor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format as 'left' | 'center' | 'right')
      ? 'align'
      : 'type'
  );
  const isList = LIST_TYPES.includes(
    format as 'numbered-list' | 'bulleted-list'
  );

  // Unwrap any existing list items or lists
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      (n as CustomElement).type === 'list-item',
    split: true,
  });

  if (isList) {
    // Wrap the selected content in the new list type
    Transforms.wrapNodes(editor, {
      type: format as 'numbered-list' | 'bulleted-list',
      children: [],
    });
  } else {
    // Set the block type (not a list)
    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : (format as CustomElement['type']),
      align: TEXT_ALIGN_TYPES.includes(format as 'left' | 'center' | 'right')
        ? (format as 'left' | 'center' | 'right')
        : undefined,
    });
  }
};

const isBlockActive = (
  editor: CustomEditor,
  format: string,
  blockType: 'type' | 'align' = 'type'
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        (n as CustomElement)[blockType] === format,
    })
  );

  return !!match;
};

export const BlockBtn: React.FC<{ format: string; icon: string }> = ({
  format,
  icon,
}) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format as 'left' | 'center' | 'right')
          ? 'align'
          : 'type'
      )}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
