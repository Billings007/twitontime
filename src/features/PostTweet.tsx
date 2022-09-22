//import Input from '@components/input';
//import { zodResolver } from '@hookform/resolvers/zod';
//import { trpc } from '@utils/trpc';
import { Control, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import classNames from '@utils/classNames';


const tweetSchema = z.object({
  tweetbody: z.string().min(1, { message: 'Tweet must be at least 1 characters' }),
});

type TweetSchema = z.output<typeof tweetSchema>;

interface TweetProps{
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

const 