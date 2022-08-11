import { component$, Host } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { ToDoApp as ToDoApp_ } from '../components/generated-components';

export const ToDoApp: any = ToDoApp_;

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
