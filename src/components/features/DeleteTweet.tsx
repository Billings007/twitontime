import Input from '@components/input/input';
import { DeleteTweetSchema, deleteTweetSchema } from '@data/schemas/TweetSchemas';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { trpc } from '@utils/trpc';
import { useRef, useState } from 'react';

export default function DeleteTweet({ token }: Partial<DeleteTweetSchema>) {
  const formRef = useRef<FormHandles>(null);
  const [tweetID, setTweetID] = useState<string>('');

  const { isSuccess, isError, ...deleteRouter } = trpc.useMutation(['deleteTweet']);

  const handleDelete: SubmitHandler<DeleteTweetSchema> = async (data) => {
    const validateID = deleteTweetSchema.safeParse(data);
    if (!validateID.success) {
      validateID.error.issues.forEach((issue) => {
        formRef.current?.setFieldError(issue.path.join('.'), issue.message);
      });
    }
    if (validateID.success) {
      await deleteRouter.mutateAsync({
        token: token,
        tweetID: data.tweetId,
      });
      formRef.current?.reset();
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleDelete} className="w-full max-w-xl">
      <Input
        type="text"
        label="Delete a Tweet"
        name="tweetID"
        value={tweetID}
        onChange={(e) => setTweetID(e.currentTarget.value)}
      />
      <button className="py-2 px-3 border-2 border-transparent bg-blue-600 rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-none hover:bg-blue-400 duration-300 transition-all">
        {isSuccess ? 'Post Deleted!' : 'Type ID'}
      </button>
    </Form>
  );
}
