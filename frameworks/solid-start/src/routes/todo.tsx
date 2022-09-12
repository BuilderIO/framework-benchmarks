import AppHeader from '../generated-components/components/app-header';
import Todo from '../generated-components/components/todo-app';

export default function Home() {
  return (
    <>
      <AppHeader framework="solid" path="/todo" />
      <Todo />
    </>
  );
}
