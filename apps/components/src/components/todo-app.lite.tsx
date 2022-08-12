import { useStore } from '@builder.io/mitosis';
import TodoItem from './todo-item.lite';

export type Todo = {
  text: string;
  completed: boolean;
};

export default function ToDoApp() {
  const state = useStore({
    list: [
      { text: 'hello', completed: false },
      { text: 'world', completed: false },
    ],
    newItemName: '',
    setItemName(event: Event) {
      state.newItemName = (event.target as any).value;
    },
    addItem() {
      state.list = [
        ...state.list,
        {
          text: state.newItemName,
          completed: false,
        },
      ];
      state.newItemName = '';
    },
    clear() {
      state.list = [];
    },
  });

  return (
    <div
      css={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div css={{ margin: '0 auto', width: '100%', maxWidth: '800px' }}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            state.addItem();
          }}
        >
          <input
            placeholder="Add new item..."
            class="shadow-md rounded w-full px-4 py-2"
            value={state.newItemName}
            onChange={(event) => state.setItemName(event)}
          />

          <button
            class="bg-blue-500 rounded w-full text-white font-bold py-2 px-4"
            css={{
              margin: '10px 0',
            }}
          >
            Add list item
          </button>
        </form>

        <ul class="shadow-md rounded">
          {state.list.map((item) => (
            <TodoItem item={item} />
          ))}
        </ul>
        {state.list.length && (
          <button
            class="m-4 text-gray-500 w-full"
            onClick={() => state.clear()}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
