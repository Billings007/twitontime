import PageLayout from '@layouts/PageLayout';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </SessionProvider>
  );
}

export default MyApp;
