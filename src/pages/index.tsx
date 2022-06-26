import { PostTweet } from '@libs/clients/twitter';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

const Home: NextPage = () => {
  const { data } = useSession();
  const [text, setText] = useState<string>('');

  const handleTweetPost = () => {
    if (text.length > 0) {
      PostTweet({ tweetBody: text });
    }
  };

  if (data?.user) {
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
        <form onSubmit={handleTweetPost} className="flex flex-col mt-10">
          <textarea
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-md ring-gray-400 ring-offset-2 ring-4 sm:w-96"
            rows={5}
          />
          <button className="px-2 py-3 mt-10 bg-white rounded-md">Send Tweet</button>
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
