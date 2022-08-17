import React from 'react';
import AppHeader from '../generated-components/components/app-header';
import Dashboard from '../generated-components/components/dashboard';

export default function Todo() {
  return (
    <>
      <AppHeader framework="gatsby" path="/dashboard" />
      <Dashboard />
    </>
  );
}
