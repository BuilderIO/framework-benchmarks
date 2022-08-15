import React from 'react';
import { ToDoApp, AppHeader } from '@builder.io/components/react';

export default function Todo() {
  return (
    <>
      <AppHeader framework="gatsby" path="/todo" />
      <ToDoApp />
    </>
  );
}
