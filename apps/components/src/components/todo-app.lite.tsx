import { useStore } from '@builder.io/mitosis';

export default function ToDoApp() {
  const state = useStore({
    list: ['hello', 'world'],
    newItemName: '',
    setItemName(event: Event) {
      state.newItemName = (event.target as any).value;
    },
    addItem() {
      state.list = [...state.list, state.newItemName];
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
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
          <li
            class="border-gray-200 border-b"
            css={{
              padding: '10px',
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      {state.list.length && (
        <button class="m-4 text-gray-500 w-full" onClick={() => state.clear()}>Clear</button>
      )}
    </div>
  );
}
