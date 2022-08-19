import React from 'react';
import AppHeader from '../generated-components/components/app-header';
import Dashboard from '../generated-components/components/dashboard';

export default function DashboardPage() {
  return (
    <>
      <AppHeader framework="gatsby" path="/dashboard" />
      <Dashboard />
    </>
  );
}

export async function getServerData() {
  return { props: { random: Math.random() } };
}
