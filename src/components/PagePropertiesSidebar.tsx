import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { pageSchema, PageSchemaType } from '@/schemas/website';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import useEditor from './hooks/useEditor';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';
import { Textarea } from './ui/textarea';
import { useEffect } from 'react';

function PagePropertiesSidebar() {
  const { pages, selectedPage, setSelectedPage, removePage, updatePage } =
    useEditor();

  if (!selectedPage) return;

  const form = useForm<PageSchemaType>({
    resolver: zodResolver(pageSchema),
    mode: 'onBlur',
    defaultValues: {
      name: selectedPage?.name,
      description: selectedPage?.description,
    },
  });

  useEffect(() => {
    if (selectedPage) {
      form.reset({
        name: selectedPage.name,
        description: selectedPage.description,
      });
    }
  }, [selectedPage, form]);

  function applyChanges(values: PageSchemaType) {
    const { name, description } = values;
    if (!selectedPage) return;
    updatePage(selectedPage.slug, {
      ...selectedPage,
      name,
      description,
      slug: name.toLowerCase().replace(' ', '-'),
    });
  }

  return (
    <div className='flex flex-col w-full px-2'>
      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={() => {
          setSelectedPage(null);
        }}
      >
        <AiOutlineClose />
      </Button>
      <p className='text-muted-foreground my-4'>Page properties</p>
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') e.currentTarget.blur();
                    }}
                  />
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
                  <Textarea
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') e.currentTarget.blur();
                    }}
                  />
                </FormControl>
                <FormDescription className='text-xs'>
                  The description of the page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={'destructive'}
            className='mt-6'
            disabled={pages.length === 1}
          >
            Remove
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              page and any content it has.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!selectedPage || pages.length === 1) return;
                removePage(selectedPage.slug);
                setSelectedPage(null);
                toast({
                  description: 'Removed page successfully!',
                });
              }}
            >
              Proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PagePropertiesSidebar;
