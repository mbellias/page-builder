import { GetWebsites } from '@/actions/website';
import CreateWebsiteBtn from '@/components/CreateWebsiteBtn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Website } from '@prisma/client';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { Suspense } from 'react';
import { MdPreview, MdEditSquare } from 'react-icons/md';
import { FaAngleRight } from 'react-icons/fa';
import DeleteWebsiteBtn from '@/components/DeleteWebsiteBtn';

export default function Home() {
  return (
    <main className='container p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateWebsiteBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((card) => (
            <WebsiteCardSkeleton key={card} />
          ))}
        >
          <WebsiteCards />
        </Suspense>
      </div>
    </main>
  );
}

function WebsiteCardSkeleton() {
  return <Skeleton className='border-2 border-primary/20 h-[190px] w-full' />;
}

async function WebsiteCards() {
  const websites = await GetWebsites();

  return (
    <>
      {websites.map((website) => (
        <WebsiteCard
          key={website.id}
          website={website}
        />
      ))}
    </>
  );
}

function WebsiteCard({ website }: { website: Website }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between gap-2'>
          <span className='truncate font-semibold'>{website.name}</span>
          {website.published && <Badge>Published</Badge>}
          {!website.published && <Badge variant={'outline'}>Draft</Badge>}
        </CardTitle>
        <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
          {formatDistance(website.createdAt, new Date(), {
            addSuffix: true,
          })}
          {website.published && (
            <span className='flex items-center gap-2'>
              <MdPreview className='text-muted-foreground' />
              <span>{website.visits.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
        {website.description || 'No description'}
      </CardContent>
      <CardFooter className='flex items-center justify-center gap-5 m-1'>
        {website.published && (
          <Button asChild>
            <Link href={`/site/${website.shareUrl}`}>
              View website <FaAngleRight />
            </Link>
          </Button>
        )}
        {!website.published && (
          <Button
            asChild
            variant={'secondary'}
            className='w-full mt-2 text-md gap-4'
          >
            <Link href={`/editor/${website.id}`}>
              Edit website <MdEditSquare />
            </Link>
          </Button>
        )}
        <DeleteWebsiteBtn id={website.id} />
      </CardFooter>
    </Card>
  );
}
