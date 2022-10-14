import SearchUser from '@components/features/SearchUser';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Search: NextPage = (props) => {
  const { data } = useSession();

  if (data) {
    return (
      <div className="flex flex-col h-screen items-center align-middle justify-center">
        <SearchUser token={data.accessToken} />
      </div>
    );
  }
  return <></>;
};

export default Search;
