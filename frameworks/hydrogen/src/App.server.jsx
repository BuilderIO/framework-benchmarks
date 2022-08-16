import React from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import { Router, FileRoutes, ShopifyProvider } from '@shopify/hydrogen';
import { Suspense } from 'react';
import { useUrl } from '@shopify/hydrogen';
import AppHeader from './generated-components/components/app-header';

function App() {
  const url = useUrl();

  return (
    <>
      <AppHeader framework="hydrogen" path={url.pathname} />
      <Suspense fallback={null}>
        <ShopifyProvider>
          <Router>
            <FileRoutes />
          </Router>
        </ShopifyProvider>
      </Suspense>
    </>
  );
}

export default renderHydrogen(App);
