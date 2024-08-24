import { z } from 'zod';

export const websiteSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
});

export type websiteSchemaType = z.infer<typeof websiteSchema>;

export type WebsiteSchemaState =
  | {
      id?: number;
      message?: string;
      fields?: Record<string, string>;
      errors?: {
        name?: string[];
      };
    }
  | undefined;

 export const pageSchema = z.object({
    name: z.string().min(4),
    description: z.string().optional(),
  });
  
export type PageSchemaType = z.infer<typeof pageSchema>;