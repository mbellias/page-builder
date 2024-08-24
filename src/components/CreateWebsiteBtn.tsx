'use client';

import { CreateWebsite } from '@/actions/website';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { websiteSchema, websiteSchemaType } from '@/schemas/website';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { CgWebsite } from 'react-icons/cg';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant='default'
      className='w-full mt-4'
      type='submit'
      disabled={pending}
    >
      {pending ? <Loader className='h-8 w-8 animate-spin' /> : 'Save'}
    </Button>
  );
}

function CreateWebsiteBtn() {
  const [state, formAction] = useFormState(CreateWebsite, undefined);
  const form = useForm<websiteSchemaType>({
    resolver: zodResolver(websiteSchema),
    defaultValues: {
      name: '',
      description: '',
      ...(state?.fields ?? {}),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (state?.id) {
      toast({
        title: 'Success!',
        description: 'Website created successfully',
      });

      router.push(`/editor/${state.id}`);
    }

    if (state?.errors || state?.message) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Something went wrong',
      });
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className='group h-[205px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer gap-4 bg-background'
        >
          <CgWebsite className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
          <p className='font-bold text-xl text-muted-foreground group-hover:text-primary'>
            Create new website
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Website</DialogTitle>
          <DialogDescription>
            Create your own website (e.g. for an event, a blog, resume,
            portfolio, etc.)
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          {state?.message && <p className='text-red-500'>{state.message}</p>}
          <form
            ref={formRef}
            className='space-y-2'
            action={formAction}
            onSubmit={(evt) => {
              evt.preventDefault();
              form.handleSubmit(() => {
                formAction(new FormData(formRef.current!));
              })(evt);
            }}
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  {state?.errors?.name && (
                    <p className='text-red-500'>{state.errors.name}</p>
                  )}
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Submit />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWebsiteBtn;
