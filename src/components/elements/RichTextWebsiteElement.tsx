import { CustomElement } from '@/lib/slate-types';
import { IoText } from 'react-icons/io5';
import { Descendant } from 'slate';
import useEditor from '../hooks/useEditor';
import SlateEditor from '../slate/SlateEditor';
import {
  ElementsType,
  WebsiteElement,
  WebsiteElementInstance,
} from '../WebsiteElements';

const type: ElementsType = 'RichTextElement';

const position = {
  x: 0,
  y: 0,
};

const size = {
  width: 500,
  height: 100,
};

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a <textarea>!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'heading-one',
    children: [{ text: 'Heading One' }],
  },
  {
    type: 'heading-two',
    children: [{ text: 'Heading Two' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

const attributes = {
  label: 'Rich Text Field',
  initialValue,
  content: [],
};

export const RichTextWebsiteElement: WebsiteElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    position,
    size,
    attributes,
  }),

  editorBtn: {
    label: 'Rich Text',
    icon: IoText,
  },

  editorComponent: EditorComponent,
  websiteComponent: WebsiteComponent,
  propertiesComponent: PropertiesComponent,
};

function EditorComponent({
  elementInstance,
}: {
  elementInstance: WebsiteElementInstance;
}) {
  return (
    <div className='bg-background border border-dashed border-gray-500 p-2'>
      <SlateEditor
        elementInstance={elementInstance}
        readOnly={true}
        key={elementInstance.attributes?.content}
      />
    </div>
  );
}

function WebsiteComponent({
  elementInstance,
}: {
  elementInstance: WebsiteElementInstance;
}) {
  return (
    <div
      style={{
        width: elementInstance.size.width,
        height: elementInstance.size.height,
        left: elementInstance.position.x + 100,
        top: elementInstance.position.y + 100,
        position: 'absolute',
      }}
    >
      <SlateEditor
        elementInstance={elementInstance}
        readOnly={true}
      />
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: WebsiteElementInstance;
}) {
  const { updateElement, activePageId } = useEditor();

  const handleContentChange = (newContent: Descendant[]) => {
    if (!activePageId) return;

    const updatedElement = {
      ...elementInstance,
      attributes: {
        ...elementInstance.attributes,
        content: newContent,
      },
    };

    updateElement(activePageId, elementInstance.id, updatedElement);
  };

  return (
    <SlateEditor
      elementInstance={elementInstance}
      readOnly={false}
      onContentChange={handleContentChange}
    />
  );
}
