import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address.'),
    password: z.string().min(1, 'Password must be at least 6 characters long.'),
    rememberMe: z.boolean().default(false),
});

export type LoginSchema = z.infer<typeof loginSchema>;
