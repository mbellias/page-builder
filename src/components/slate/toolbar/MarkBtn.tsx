import { Editor } from 'slate';
import { CustomEditor } from '../../../lib/slate-types';
import { useSlate } from 'slate-react';
import { Button, Icon } from '../components';

export const toggleMark = (editor: CustomEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: CustomEditor, format: string) => {
  const marks = Editor.marks(editor) as { [key: string]: boolean } | undefined;
  return marks ? marks[format] === true : false;
};

export const MarkBtn: React.FC<{ format: string; icon: string }> = ({
  format,
  icon,
}) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
