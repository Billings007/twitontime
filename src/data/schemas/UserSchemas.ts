import { z } from 'zod'

export const userLookupSchema = z.object({
  username: z.string(),
  token: z.string().or(z.unknown()).or(z.undefined()),
})

export const userStreamSchema = z.object({
  token: z.string().or(z.unknown()).or(z.undefined()),
})

export type UserLookupSchema = z.output<typeof userLookupSchema>
export type UserStreamSchema = z.output<typeof userStreamSchema>
