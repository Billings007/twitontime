import PostTweet from '@components/features/PostTweet';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Post: NextPage = (props) => {
  const { data } = useSession();

  if (data) {
    return (
      <div className="flex flex-col h-screen items-center align-middle justify-center">
        <PostTweet token={data.accessToken} />
      </div>
    );
  }
  return <></>;
};

export default Post;
