import React from 'react';
import AppHeader from '../generated-components/components/app-header';
import ToDoApp from '../generated-components/components/todo-app';

export default function Todo() {
  return (
    <>
      <AppHeader framework="gatsby" path="/todo" />
      <ToDoApp />
    </>
  );
}
