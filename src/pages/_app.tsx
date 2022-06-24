import PageLayout from '@layouts/PageLayout';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </NextAuthProvider>
  );
}

export default MyApp;
