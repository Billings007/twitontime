import TextArea from '@components/input/TextArea';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import classNames from '@utils/classNames';
import { trpc } from '@utils/trpc';
import { useRef, useState } from 'react';
import { postTweetSchema, PostTweetSchema } from 'src/data/schemas/TweetSchemas'; //Why @ not work

export default function PostTweet({ token }: Partial<PostTweetSchema>) {
  const formRef = useRef<FormHandles>(null);
  const [tweetBody, setTweetBody] = useState<string>('');
  const limit = tweetBody?.length > 280;
  const limitCaution = tweetBody?.length > 220 && tweetBody?.length < 280;

  const { isSuccess, ...postTweetRouter } = trpc.useMutation(['postTweet']);

  const handlePost: SubmitHandler<PostTweetSchema> = async (data) => {
    const validatePost = postTweetSchema.safeParse(data);
    if (!validatePost.success) {
      validatePost.error.issues.forEach((issue) => {
        formRef.current?.setFieldError(issue.path.join('.'), issue.message);
      });
    }
    if (validatePost.success) {
      await postTweetRouter.mutateAsync({
        token: token,
        tweetBody: data.tweetBody,
      });
      formRef.current?.reset();
    }
  };

  return (
    <Form ref={formRef} onSubmit={handlePost} className="w-full max-w-xl">
      <TextArea
        label="Post a tweet"
        name="tweetBody"
        value={tweetBody}
        onChange={(e) => setTweetBody(e.currentTarget.value)}
      />
      <div
        className={classNames(
          limit ? 'text-red-500 font-bold' : '',
          limitCaution ? 'text-red-400 font-semibold' : '',
          'mt-1 text-right select-none transition-colors duration-1000'
        )}
      >
        {tweetBody.length}/280
      </div>
      <button className="py-2 px-3 border-2 border-transparent bg-blue-600 rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-none hover:bg-blue-400 duration-300 transition-all">
        {isSuccess ? 'Tweet Sent!' : 'Send Tweet'}
      </button>
    </Form>
  );
}
