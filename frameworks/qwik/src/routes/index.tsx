import { component$, Host } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { HelloWorld } from '@builder.io/mitosis-app-hello-world/qwik'

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
