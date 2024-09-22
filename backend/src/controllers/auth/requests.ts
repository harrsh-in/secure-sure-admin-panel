import { z } from 'zod';

export const adminStaffLoginRequestBody = z.object({
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
export type AdminStaffLoginRequestBody = z.infer<
    typeof adminStaffLoginRequestBody
>;
