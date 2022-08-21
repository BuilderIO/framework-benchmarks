import type { Todo } from './todo-app.lite';

export type TodoItemProps = {
  item: Todo;
  index: number;
};

export default function TodoItem(props: TodoItemProps) {
  return (
    <li
      data-index={props.index}
      style={{
        textDecoration: props.item.completed ? 'line-through' : 'none',
      }}
      css={{
        padding: '10px',
        borderBottom: 'var(--border-gray)',
      }}
    >
      <input
        css={{
          borderColor: '$gray-4',
        }}
        type="checkbox"
        checked={props.item.completed}
        onInput={(event) => {
          props.item.completed = event.target.checked;
        }}
      />
      <input
        css={{
          all: 'unset',
        }}
        value={props.item.text}
        onInput={(event) => {
          props.item.text = event.target.value;
        }}
      />
    </li>
  );
}
