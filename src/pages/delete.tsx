import DeleteTweet from '@components/features/DeleteTweet';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Delete: NextPage = (props) => {
  const { data } = useSession();

  if (data) {
    return (
      <div className="flex flex-col h-screen items-center align-middle justify-center">
        <DeleteTweet token={data.accessToken} />
      </div>
    );
  }
  return <></>;
};

export default Delete;
