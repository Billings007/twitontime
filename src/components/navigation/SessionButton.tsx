import { signIn, signOut, useSession } from 'next-auth/react';

interface SignOutProps {
  userToken: string | undefined | unknown;
}

export default function SessionButton() {
  const { data: sessionData } = useSession();

  return (
    <div className="items-center">
      <button
        className="py-2 px-3 border-2 bg-blue-500 rounded-xl text-white font-bold text-lg shadow-xl hover:bg-blue-200 duration-300 transition-all "
        onClick={() => (sessionData ? signOut() : signIn())}
      >
        {sessionData ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  );
}
