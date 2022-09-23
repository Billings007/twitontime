import LogoutButton from '@components/LogoutButton';
import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import DeleteTweet from 'src/features/DeleteTweet';
import PostTweet from 'src/features/PostTweet';
import SearchForm from 'src/features/SearchUser';

const Home: NextPage = (props) => {
  const { data } = useSession();

  if (data?.user) {
    console.log(data.accessToken);
    const img = data.user.image as string;
    return (
      <div className="flex flex-col items-center justify-center h-screen align-middle">
        <p className="text-white">Hello {data.user.name}</p>
        <Image src={img} width="40" height="40" alt="" />
        <DeleteTweet userToken={data.accessToken} />
        <SearchForm userToken={data.accessToken} />
        <PostTweet userToken={data.accessToken} />
        <LogoutButton userToken={data.accessToken} />
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
