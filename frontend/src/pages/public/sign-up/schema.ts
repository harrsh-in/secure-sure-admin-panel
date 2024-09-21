import { z } from 'zod';

export const signUpSchema = z.object({
    username: z.string().min(1, 'Username is required'),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
