import { useState } from 'react';
import { useSlateStatic } from 'slate-react';
import { Button, Icon } from '../components';
import { CustomEditor } from '../../../lib/slate-types';
import { isMarkActive } from './MarkBtn';
import { Editor } from 'slate';

const FONT_SIZES = [
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '26px',
  '28px',
];

export default function FontPicker({
  format,
  icon,
}: {
  format: string;
  icon: string;
}) {
  const editor = useSlateStatic();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleSizeMark = (
    editor: CustomEditor,
    format: string,
    size: string
  ) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, size);
    }
  };

  const toggleSize = (font: string) => {
    toggleSizeMark(editor, format, font);
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
        <div className='fixed mt-2 p-6 bg-white border border-gray-300 z-10'>
          {FONT_SIZES.map((size, i) => (
            <div
              key={size}
              className='flex flex-col justify-start items-start h-6 w-6 cursor-pointer'
              style={{ fontSize: size }}
              onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault();
                toggleSize(size);
              }}
            >
              <p>{size.replace('px', '')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
