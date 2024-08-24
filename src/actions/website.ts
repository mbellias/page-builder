'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidateTag } from 'next/cache';
import prisma from '../lib/prisma';
import { WebsiteSchemaState, websiteSchema } from '../schemas/website';

export async function CreateWebsite(
  prevState: WebsiteSchemaState,
  data: FormData
): Promise<WebsiteSchemaState> {
  const { userId, redirectToSignIn } = auth();
  if (!userId) redirectToSignIn();

  const formData = {
    name: data.get('name'),
    description: data.get('description'),
  };

  const parsed = websiteSchema.safeParse(formData);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, fields: parsed.data };
  }

  const existingName = await prisma.website.findFirst({
    where: { userId: userId as string, name: parsed.data.name },
  });

  if (existingName)
    return {
      message: 'Name is already in use. Please choose a different one.',
      fields: parsed.data,
    };

  const website = await prisma.website.create({
    data: {
      userId: userId as string,
      name: parsed.data?.name as string,
      description: parsed.data?.description,
    },
  });

  if (!website) throw new Error('Something went wrong');

  revalidateTag('websites');

  return { id: website.id };
}

export async function GetWebsites() {
  const { userId, redirectToSignIn } = auth();
  if (!userId) redirectToSignIn();

  return await prisma.website.findMany({
    where: { userId: userId as string },
  });
}

export async function GetWebsiteById(id: number) {
  const { userId, redirectToSignIn } = auth();
  if (!userId) redirectToSignIn();

  return await prisma.website.findUnique({
    where: { userId: userId as string, id },
  });
}

export async function UpdateWebsiteContent(id: number, content: string) {
  const { userId, redirectToSignIn } = auth();
  if (!userId) redirectToSignIn();

  revalidateTag('website');

  return await prisma.website.update({
    where: { userId: userId as string, id },
    data: {
      content,
    },
  });
}

export async function DeleteWebsite(id: number) {
  const { userId, redirectToSignIn } = auth();
  if (!userId) redirectToSignIn();

  revalidateTag('website');

  return await prisma.website.delete({
    where: { userId: userId as string, id },
  });
}
