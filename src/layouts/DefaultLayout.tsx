import Navbar from '@components/navigation/Navbar';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-darkMode-1 max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
      <Navbar />
      {children}
    </div>
  );
}
