'use client';

import { useContext } from 'react';
import { EditorContext } from '../context/EditorContext';

function useEditor() {
  const context = useContext(EditorContext);

  if (!context) throw new Error('useEditor must be used with EditorContext');

  return context;
}

export default useEditor;
