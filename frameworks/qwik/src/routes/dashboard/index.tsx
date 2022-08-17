/// <reference types="lighthouse/types/global-lh" />

import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Dashboard_ from '../../components/generated-components/components/dashboard';

export const Dashboard: any = Dashboard_;

export default component$(() => {
  return <Dashboard />;
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik City',
};
