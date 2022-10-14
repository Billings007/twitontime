import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Home: NextPage = (props) => {
  const { data } = useSession();

  if (data?.user) {
    console.log(data.accessToken);
    return (
      <div className="flex flex-col items-center justify-center h-screen align-middle">
        <a className="text-4xl font-extrabold text-darkMode-4">
          Hi There! Use this page as a filler for the future!
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen align-middle">
      <h1 className="text-4xl font-extrabold text-darkMode-4">
        HI! Sign in using the button up top!
      </h1>
    </div>
  );
};

export default Home;
