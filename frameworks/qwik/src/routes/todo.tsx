import { component$, Host } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { ToDoApp } from '@builder.io/mitosis-app-todo/qwik';

export default component$(() => {
  return (
    <Host>
      <ToDoApp />
    </Host>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik City',
};
