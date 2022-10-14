import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';


const Home: NextPage = () => {
  const { data } = useSession();

  if (data?.user) {
    console.log(data.accessToken);
    return (
      <div className="flex flex-col items-center justify-center h-screen align-middle">
        <a className='justify-center flex-auto text-center text-large text-darkMode-4 '>Hi There! Use this page as a filler for the future!</a>
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
