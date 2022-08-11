import { component$, Host } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { HelloWorld } from '../components/generated-components';

export default component$(() => {
  return (
    <Host>
      <HelloWorld name="Qwik" />
    </Host>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik City',
};
