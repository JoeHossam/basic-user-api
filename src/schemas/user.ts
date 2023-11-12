import * as z from 'zod'

const userSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    marketingConsent: z.boolean()
})

export default userSchema;

export type IUser = z.infer<typeof userSchema>;