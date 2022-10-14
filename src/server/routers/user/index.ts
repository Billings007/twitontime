import * as trpc from '@trpc/server';
import { userLookupSchema, userStreamSchema } from 'src/data/schemas/UserSchemas';
import { userLookup } from './userLookup';
import { userStream } from './userStream';

export const userRouter = trpc
  .router()
  .mutation('userLookup', {
    input: userLookupSchema,
    async resolve({ input }) {
      return await userLookup(input);
    },
  })
  .mutation('userStream', {
    input: userStreamSchema,
    async resolve({ input }) {
      return await userStream(input);
    },
  });
