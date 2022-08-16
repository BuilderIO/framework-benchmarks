import React from 'react';
import AppHeader from '../generated-components/components/app-header';
import HelloWorld from '../generated-components/components/hello-world';

export default function Home() {
  return (
    <>
      <AppHeader framework="gatsby" path="/" />
      <HelloWorld name="Gatsby" />
    </>
  );
}
