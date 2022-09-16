import { useSession } from 'next-auth/react';
import SearchForm from 'src/features/SearchUser';

export default function Lookup() {
  const { data } = useSession();
  if (data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen align-middle">
        <SearchForm userToken={data.accessToken} />
      </div>
    );
  }
  return <div>Not logged in</div>;
}
