import React from 'react';
import Dashboard from '../generated-components/components/dashboard';

// Special route for SSR
export default function Todo() {
  return <Dashboard />;
}

// Include this to make sure this page is in SSR mode
export async function getServerSideProps() {
  return { props: {} };
}
