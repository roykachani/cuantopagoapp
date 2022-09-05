import 'tailwindcss/tailwind.css';
import { UserProvider } from '../context/user';
import { MainProvider } from '../context/main';
import Layout from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <MainProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </MainProvider>
  );
}

export default MyApp;
