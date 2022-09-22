import Input from '@components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@utils/trpc';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string(),
});

type UserSchema = z.output<typeof userSchema>;

interface SearchFormProps {
  userToken: string | undefined | unknown;
}

export default function SearchForm({ userToken }: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const { ...userRouter } = trpc.useMutation(['lookup']);

  const onSubmit = async (data: UserSchema) => {
    {
      await userRouter.mutateAsync({
        username: data.username,
        token: userToken as string,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {userRouter.data?.id}
      <Input
        type="text"
        {...register('username')}
        error={errors.username}
        label="Search Username"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
