import TextAreaInput from '@components/TextArea';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from '@utils/classNames';
import { trpc } from '@utils/trpc';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Control, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import DeleteTweet from 'src/features/DeleteTweet';
import { z } from 'zod';

const tweetSchema = z.object({
  tweetbody: z.string().min(1, { message: 'Tweet must be at least 1 characters' }),
});

type TweetSchema = z.output<typeof tweetSchema>;

function WatchTextArea({ control }: { control: Control<TweetSchema> }) {
  const textArea = useWatch({
    control,
    defaultValue: '',
    name: 'tweetbody',
  });
  const limit = textArea.length > 280;
  const limitCaution = textArea.length > 220 && textArea.length < 280;

  return (
    <p
      className={classNames(
        limit ? 'text-red-400' : '',
        limitCaution ? 'text-red-500' : 'text-white',
        'text-right text-sm'
      )}
    >
      {textArea.length}
    </p>
  );
}

const Home: NextPage = (props) => {
  const { data } = useSession();

  //* New Router. isSuccess is a general boolean that we can use for conditional functions. For example, maybe we want to change the button text based on if the tweet was sent successfully. isSuccess ? 'Tweet Sent!' : 'Send Tweet'.//

  const { isSuccess, isLoading, ...postRouter } = trpc.useMutation(['post']);

  //* Optional schema validation. Technically we're doing this in server/tweet/index. You can even just create a schema folder with schemas like this, then import them into server/tweet/index */

  //* Adding React Hook Forms, the general go-to form library right now. As simple as forms can seem, focus control, screen-reader support, and proper error handling can be an absolute nightmare to do without a library.*/

  const {
    control,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<TweetSchema>({
    resolver: zodResolver(tweetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      tweetbody: '',
    },
  });

  const handleTweetPost: SubmitHandler<TweetSchema> = async (values) => {
    const validation = await tweetSchema.safeParseAsync(values);
    if (!validation.success) {
      return;
    }
    if (validation.success) {
      if (data && data.accessToken) {
        await postRouter.mutateAsync({
          tweetbody: values.tweetbody,
          token: data.accessToken as string,
        });
        formState.isSubmitSuccessful;
      }
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  });

  if (data?.user) {
    console.log(data.accessToken);
    const img = data.user.image as string;
    return (
      <div className="flex flex-col items-center justify-center h-screen align-middle">
        <button
          onClick={() => signOut()}
          className="px-2 py-3 text-white border-2 border-white rounded-md"
        >
          Logout
        </button>
        <p className="text-white">Hello {data.user.name}</p>

        <Image src={img} width="40" height="40" alt="" />
        <DeleteTweet userToken={data.accessToken} />

        <form onSubmit={handleSubmit(handleTweetPost)} className="flex flex-col mt-10">
          <TextAreaInput
            name="tweetbody"
            error={errors.tweetbody}
            defaultValue=""
            value={formState.isSubmitSuccessful ? '' : undefined}
            control={control}
            label="Write tweet here"
          />
          <WatchTextArea control={control} />
          <button
            type="submit"
            disabled={isLoading}
            className="px-2 py-3 mt-10 bg-white rounded-md"
          >
            {isSuccess ? 'Tweet Sent!' : 'Send Tweet'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen align-middle">
      <h1 className="text-4xl font-extrabold text-darkMode-4">HI TWITTER</h1>
      <button
        onClick={() => signIn()}
        className="px-2 py-3 text-white border-2 border-white rounded-md"
      >
        Login
      </button>
    </div>
  );
};

export default Home;
