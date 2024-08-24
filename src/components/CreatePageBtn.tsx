import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { pageSchema, PageSchemaType } from '@/schemas/website';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IoIosAdd } from 'react-icons/io';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';
import { Textarea } from './ui/textarea';

type CreatePageBtnProps = {
  addTab: (
    name: string,
    slug: string,
    createdAt: Date,
    description?: string
  ) => void;
};

function CreatePageBtn(props: CreatePageBtnProps) {
  const { addTab } = props;
  const form = useForm<PageSchemaType>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = (values: PageSchemaType) => {
    const parsed = pageSchema.safeParse(values);
    const slug = parsed.data?.name.toLowerCase().replace(' ', '-');

    if (!parsed.success) throw new Error('invalid page values');

    const data = {
      name: parsed.data?.name as string,
      slug: slug as string,
      description: parsed.data?.description,
      createdAt: new Date(),
    };

    addTab(data.name, data.slug, data.createdAt, data.description);
    toast({
      description: 'Created page successfully!',
    });
    form.reset();
    return;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          variant={'outline'}
          className='text-xs'
        >
          <IoIosAdd className='h-6 w-6' />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add page</DialogTitle>
            <DialogDescription>
              Expand your website by adding more pages.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className='space-y-2'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription className='text-xs'>
                      The name of the page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription className='text-xs'>
                      The description of the page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type='submit'
                    className='mt-2'
                  >
                    Add
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default CreatePageBtn;
