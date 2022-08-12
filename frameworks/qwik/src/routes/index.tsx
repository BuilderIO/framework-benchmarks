import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { HelloWorld as HelloWorld_ } from '../components/generated-components';

export const HelloWorld: any = HelloWorld_;

export default component$(() => {
  return <HelloWorld name="Qwik" />;
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik City',
};
