import { useRouter } from 'next/router';
import AppHeader from '../generated-components/components/app-header';

Error.stackTraceLimit = Infinity;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <AppHeader framework="next" path={router.pathname} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
