import { z } from 'zod'

export const deleteTweetSchema = z.object({
  tweetId: z.string(),
  token: z.string().or(z.unknown()).or(z.undefined()),
})

export const postTweetSchema = z.object({
  tweetBody: z.string(),
  token: z.string().or(z.unknown()).or(z.undefined()),
})

export type DeleteTweetSchema = z.infer<typeof deleteTweetSchema>
export type PostTweetSchema = z.infer<typeof postTweetSchema>
