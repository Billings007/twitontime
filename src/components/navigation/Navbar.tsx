import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import SessionButton from './SessionButton';

export default function Navbar() {
  const { data: sessionData } = useSession();
  const img = (sessionData?.user?.image as string) || '';
  return (
    <nav className="py-3">
      <div className="flex items-center justify-between px-2 py-3 sm:px-6 md:justify-start md:space-x-10">
        <div className="flex w-2/5">
          <Link href={'/'} passHref>
            <div>
              {sessionData && (
                <Image
                  className="rounded-full cursor-pointer hover:opacity-50"
                  src={img}
                  alt=""
                  width={48}
                  height={48}
                />
              )}
            </div>
          </Link>
        </div>
        {/* <div>
          <Link href={'/delete'} passHref className="flex col-end-1">
            <a className="text-base font-medium text-white hover:text-darkMode-4">Delete</a>
          </Link>
        </div> */}
        {/* <div>
          <Link href={'/post'} passHref className="flex col-end-2">
            <a className="text-base font-medium text-white hover:text-darkMode-4">Post</a>
          </Link>
        </div> */}
        {/* <div>
          <Link href={'/search'} passHref className="flex col-end-2">
            <a className="text-base font-medium text-white hover:text-darkMode-4">Search</a>
          </Link>
        </div> */}
        <div className="w-full flex items-center justify-end">
          <SessionButton />
        </div>
      </div>
    </nav>
  );
}
