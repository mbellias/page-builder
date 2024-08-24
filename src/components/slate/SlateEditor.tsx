'use client';

import isHotkey from 'is-hotkey';
import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import { CustomEditor, CustomElement, CustomText } from '../../lib/slate-types';
import { WebsiteElementInstance } from '../WebsiteElements';
import useEditor from '../hooks/useEditor';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { Toolbar } from './components';
import { BlockBtn } from './toolbar/BlockBtn';
import ColorPicker from './toolbar/ColorPicker';
import FontPicker from './toolbar/FontPicker';
import { ImageBtn } from './toolbar/ImageBtn';
import { LinkBtn } from './toolbar/LinkBtn';
import { MarkBtn, toggleMark } from './toolbar/MarkBtn';

const HOTKEYS: Record<string, string> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
};

const SlateEditor: React.FC<{
  elementInstance: WebsiteElementInstance;
  readOnly: boolean;
}> = ({ elementInstance, readOnly }) => {
  const renderElement = useCallback(
    (props: {
      attributes: any;
      children: React.ReactNode;
      element: CustomElement;
    }) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: {
      attributes: any;
      children: React.ReactNode;
      leaf: CustomText;
    }) => <Leaf {...props} />,
    []
  );

  const editor = useMemo(
    () => withHistory(withReact(createEditor() as CustomEditor)),
    []
  );

  const initialValue = useMemo(() => {
    return elementInstance.attributes?.content?.length > 0
      ? elementInstance.attributes?.content
      : elementInstance.attributes?.initialValue || [];
  }, [elementInstance]);

  const [value, setValue] = useState<Descendant[]>(initialValue);

  const { updateElement, activePageId } = useEditor();

  const handleChange = (newValue: Descendant[]) => {
    if (!activePageId) return;
    setValue(newValue);

    const updatedElement = {
      ...elementInstance,
      attributes: {
        ...elementInstance.attributes,
        content: newValue,
      },
    };

    updateElement(activePageId, elementInstance.id, updatedElement);
  };

  const [isBlurred, setIsBlurred] = useState(false);

  return (
    <div className='flex flex-col justify-start'>
      <Slate
        editor={editor}
        initialValue={value}
        onChange={handleChange}
      >
        {!isBlurred && !readOnly && (
          <Toolbar>
            <MarkBtn
              format='bold'
              icon='format_bold'
            />
            <MarkBtn
              format='italic'
              icon='format_italic'
            />
            <MarkBtn
              format='underline'
              icon='format_underlined'
            />
            <ColorPicker
              format='color'
              icon='format_color_text'
            />
            <FontPicker
              format='size'
              icon='format_size'
            />
            <BlockBtn
              format='heading-one'
              icon='looks_one'
            />
            <BlockBtn
              format='heading-two'
              icon='looks_two'
            />
            <BlockBtn
              format='block-quote'
              icon='format_quote'
            />
            <BlockBtn
              format='numbered-list'
              icon='format_list_numbered'
            />
            <BlockBtn
              format='bulleted-list'
              icon='format_list_bulleted'
            />
            <BlockBtn
              format='left'
              icon='format_align_left'
            />
            <BlockBtn
              format='center'
              icon='format_align_center'
            />
            <BlockBtn
              format='right'
              icon='format_align_right'
            />
            <LinkBtn />
            <ImageBtn />
          </Toolbar>
        )}
        <Editable
          readOnly={readOnly}
          onBlur={() => setIsBlurred(true)}
          onFocus={() => setIsBlurred(false)}
          className='p-2'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder='Enter some rich text…'
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default SlateEditor;
