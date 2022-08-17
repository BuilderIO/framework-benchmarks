import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import ToDoApp_ from '../../components/generated-components/components/todo-app';

export const ToDoApp: any = ToDoApp_;

export default component$(() => {
  return <ToDoApp />;
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik City',
};
