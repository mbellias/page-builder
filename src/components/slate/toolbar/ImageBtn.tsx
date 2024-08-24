import { useSlate } from 'slate-react';
import { ImageElement } from '../../../lib/slate-types';
import { Transforms } from 'slate';
import { Button, Icon } from '../components';

export const ImageBtn: React.FC = () => {
  const editor = useSlate();

  const insertImage = (url: string, alt: string) => {
    const text = { text: '' } as { text: '' };
    const image: ImageElement = { type: 'image', url, alt, children: [text] };
    Transforms.insertNodes(editor, image);
  };

  const handleImageInsert = () => {
    const url = prompt('Enter the URL of the image:');
    const alt = prompt('Enter the alt text for the image:');
    if (url) {
      insertImage(url, alt || '');
    }
  };

  return (
    <Button
      onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        handleImageInsert();
      }}
    >
      <Icon>image</Icon>
    </Button>
  );
};
