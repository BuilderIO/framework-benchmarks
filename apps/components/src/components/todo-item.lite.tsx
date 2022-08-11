export type TodoItemProps = {
  item: string;
};

export default function TodoItem(props: TodoItemProps) {
  return (
    <li
      class="border-gray-200 border-b"
      css={{
        padding: '10px',
      }}
    >
      {props.item}
    </li>
  );
}
