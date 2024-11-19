import { z } from 'zod';

export const profileSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  title: z.string().optional(),
  organization: z.string().optional(),
  phone: z.string().optional(),
  avatar_url: z.string().url().optional(),
  bio: z.string().optional(),
  email_notifications: z.boolean().default(true),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

export type Profile = z.infer<typeof profileSchema>;

export const profileUpdateSchema = profileSchema.partial().omit({
  id: true,
  user_id: true,
  created_at: true,
  updated_at: true
});