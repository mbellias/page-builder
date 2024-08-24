import { useState } from 'react';
import { Editor } from 'slate';
import { useSlateStatic } from 'slate-react';
import { Button, Icon } from '../components';
import { CustomEditor } from '../../../lib/slate-types';
import { isMarkActive } from './MarkBtn';

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'black'];

export default function ColorPicker({
  format,
  icon,
}: {
  format: string;
  icon: string;
}) {
  const editor = useSlateStatic();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleColorMark = (
    editor: CustomEditor,
    format: string,
    color: string
  ) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, color);
    }
  };

  const toggleColor = (color: string) => {
    toggleColorMark(editor, format, color);
    setShowMenu(false);
  };

  return (
    <div className='relative inline-block text-left'>
      <Button
        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          setShowMenu(!showMenu);
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
      {showMenu && (
        <div className='fixed mt-2 grid grid-cols-3 gap-1 p-2 bg-white border border-gray-300 z-10'>
          {COLORS.map((color) => (
            <div
              key={color}
              className='h-6 w-6 cursor-pointer col-span-1 row-span-1'
              style={{ backgroundColor: color }}
              onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault();
                toggleColor(color);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
