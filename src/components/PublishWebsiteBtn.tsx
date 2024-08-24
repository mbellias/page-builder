import React from 'react';
import { MdOutlinePublish } from 'react-icons/md';

function PublishWebsiteBtn() {
  return (
    <div className='flex items-center'>
      <p className='mr-2'>Publish</p>
      <MdOutlinePublish />
    </div>
  );
}

export default PublishWebsiteBtn;
