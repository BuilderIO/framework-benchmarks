import { Todo } from './todo-app.lite';

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
        onChange={(event) => {
          props.item.completed = (event.target as any).checked;
        }}
      />
      <input
        value={props.item.text}
        onChange={(event) => {
          props.item.text = (event.target as any).value;
        }}
      />
    </li>
  );
}
