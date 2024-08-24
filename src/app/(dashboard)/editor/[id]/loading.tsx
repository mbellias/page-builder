import { Loader } from 'lucide-react';
import React from 'react';

function Loading() {
  return (
    <div className='flex items-center justify-center w-full h-[80vh]'>
      <Loader className='animate-spin h-12 w-12' />
    </div>
  );
}

export default Loading;
