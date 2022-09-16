import Input from '@components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@utils/trpc';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const deleteSchema = z.object({
  tweetId: z.string(),
});

type DeleteSchema = z.output<typeof deleteSchema>;

interface TokenProps {
  userToken: string | undefined | unknown;
}

export default function DeleteTweet({ userToken }: TokenProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteSchema>({
    resolver: zodResolver(deleteSchema),
  });

  const { isSuccess, isError, ...deleteRouter } = trpc.useMutation(['delete']);

  const onSubmit = async (data: DeleteSchema) => {
    console.log(deleteRouter.status);
    {
      await deleteRouter.mutateAsync({
        tweetID: data.tweetId,
        token: userToken as string,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {deleteRouter.data?.toString()}
      <Input type="text" {...register('tweetId')} error={errors.tweetId} label="Delete Tweet" />

      <button type="submit">
        {isSuccess ? 'Success' : isError ? deleteRouter.error?.data?.code : 'Submit'}
      </button>
    </form>
  );
}
