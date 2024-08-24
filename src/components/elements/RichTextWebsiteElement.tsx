import { CustomElement } from '@/lib/slate-types';
import { IoText } from 'react-icons/io5';
import SlateEditor from '../slate/SlateEditor';
import {
  ElementsType,
  WebsiteElement,
  WebsiteElementInstance,
} from '../WebsiteElements';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useEditor from '../hooks/useEditor';

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

const richTextPropertiesSchema = z.object({
  width: z.number().max(1000),
  x: z.number().min(0).max(1000),
  y: z.number().min(0).max(1000),
});

type RichTextPropertiesSchema = z.infer<typeof richTextPropertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: WebsiteElementInstance;
}) {
  const { updateElement, activePageId } = useEditor();
  const form = useForm<RichTextPropertiesSchema>({
    resolver: zodResolver(richTextPropertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      width: elementInstance.size.width,
      x: elementInstance.position.x,
      y: elementInstance.position.y,
    },
  });

  function applyChanges(values: RichTextPropertiesSchema) {
    if (!activePageId) return;
    updateElement(activePageId, elementInstance.id, {
      ...elementInstance,
      size: {
        width: values.width,
        height: 100,
      },
      position: {
        x: values.x,
        y: values.y,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        className='space-y-3'
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormField
          control={form.control}
          name='width'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Width</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The width of the rich text editor.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='x'
          render={({ field }) => (
            <FormItem>
              <FormLabel>X-coordinate</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The x-coordinate of the rich text editor.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='y'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Y-coordinate</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The y-coordinate of the rich text editor.
              </FormDescription>
            </FormItem>
          )}
        />
        <SlateEditor
          elementInstance={elementInstance}
          readOnly={false}
        />
      </form>
    </Form>
  );
}
