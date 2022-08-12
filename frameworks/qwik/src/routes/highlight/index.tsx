import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Highlight as Highlight_ } from '../../components/generated-components';

export const Highlight: any = Highlight_;

export default component$(() => {
  return <Highlight />;
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik City',
};
