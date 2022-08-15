import React from 'react';
import { HelloWorld, AppHeader } from '@builder.io/components/react';

export default function Home() {
  return (
    <>
      <AppHeader framework="gatsby" path="/" />
      <HelloWorld name="Gatsby" />
    </>
  );
}
