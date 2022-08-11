import { useRouter } from 'next/router';
import { AppHeader } from '@builder.io/components/react';

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
