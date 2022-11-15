import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '../context/user';
import { MainProvider } from '../context/main';
import Layout from '../components/layout';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <MainProvider>
      <UserProvider>
        <Layout>
          <SessionProvider refetchInterval={5 * 60}>
            <Component {...pageProps} />
          </SessionProvider>
        </Layout>
      </UserProvider>
    </MainProvider>
  );
}

export default MyApp;
