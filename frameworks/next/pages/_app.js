import { useRouter } from 'next/router';

import { Header } from '@builder.io/components/react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Header framework="next" path={router.pathname} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
