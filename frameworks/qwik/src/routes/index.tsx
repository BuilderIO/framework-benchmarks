import { component$, Host } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { HelloWorld as HelloWorld_ } from '../components/generated-components';

export const HelloWorld: any = HelloWorld_;

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
