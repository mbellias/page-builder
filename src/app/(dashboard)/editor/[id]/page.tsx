import { GetWebsiteById } from '@/actions/website';
import WebsiteEditor from '@/components/WebsiteEditor';
import React from 'react';

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const website = await GetWebsiteById(Number(id));
  if (!website) throw new Error('website not found');
  return <WebsiteEditor website={website} />;
}

export default Page;
