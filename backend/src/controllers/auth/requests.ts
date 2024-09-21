import { z } from 'zod';

export const adminLoginRequestBody = z.object({
    email: z
        .string({
            message: 'Please enter a valid email address.',
        })
        .email({
            message: 'Please enter a valid email address.',
        }),
    password: z.string({
        message: 'Please enter a password.',
    }),
});
export type AdminLoginRequestBody = z.infer<typeof adminLoginRequestBody>;
