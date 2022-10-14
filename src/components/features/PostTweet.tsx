import TextAreaInput from '@components/input/TextArea'
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from '@utils/classNames';
import { trpc } from '@utils/trpc';
import { useEffect } from 'react';
import { Control, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

const tweetSchema = z.object({
  tweetbody: z.string().min(1, { message: 'Tweet must be at least 1 characters' }),
});

type TweetSchema = z.output<typeof tweetSchema>;

interface TweetProps {
  userToken: string | undefined | unknown;
}

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

export default function PostTweet({ userToken }: TweetProps) {
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

  const { isSuccess, isLoading, ...postRouter } = trpc.useMutation(['postTweet']);

  const onSubmit = async (data: TweetSchema) => {
    if (data.tweetbody.length <= 280) {
      await postRouter.mutateAsync({
        tweetBody: data.tweetbody,
        token: userToken as string,
      });
      formState.isSubmitSuccessful;
    } else {
      //Does this actually return?
      return ("Your tweet is too long!")
    }
  };

  //does this work?
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextAreaInput
        name="tweetbody"
        error={errors.tweetbody}
        defaultValue=""
        value={formState.isSubmitSuccessful ? '' : undefined}
        control={control}
        label="Write tweet here"
      />
      <WatchTextArea control={control} />
      <button type="submit" disabled={isLoading} className="px-2 py-3 mt-10 bg-white rounded-md">
        {isSuccess ? 'Tweet Sent!' : 'Send Tweet'}
      </button>
    </form>
  );
}
