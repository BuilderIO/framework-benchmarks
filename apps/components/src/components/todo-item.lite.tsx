import type { Todo } from './todo-app.lite';

export type TodoItemProps = {
  item: Todo;
};

export default function TodoItem(props: TodoItemProps) {
  return (
    <li
      class="border-gray-200 border-b"
      style={{
        textDecoration: props.item.completed ? 'line-through' : 'none',
      }}
      css={{
        padding: '10px',
      }}
    >
      <input
        type="checkbox"
        checked={props.item.completed}
        onInput={(event) => {
          props.item.completed = event.target.checked;
        }}
      />
      <input
        value={props.item.text}
        onInput={(event) => {
          props.item.text = event.target.value;
        }}
      />
    </li>
  );
}
