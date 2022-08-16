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
    clearDone() {
      state.list = state.list.filter((item) => !item.completed);
    },
    markAllDone() {
      state.list = state.list.map((item) => ({
        ...item,
        completed: true,
      }));
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
            css={{
              boxShadow: 'var(--shadow)',
              borderRadius: 'var(--round)',
              width: '100%',
              padding: '0 var(--s1)',
              margin: 'var(--s1) 0',
            }}
            value={state.newItemName}
            onInput={(event) => state.setItemName(event)}
          />

          <button
            css={{
              background: 'var(--primary',
              borderRadius: 'var(--round)',
              width: '100%',
              color: 'white',
              fontWeight: 'bold',
              padding: '0 var(--s1)',
              margin: 'var(--s2) 0',
            }}
          >
            Add list item
          </button>
        </form>

        <ul
          css={{
            boxShadow: 'var(--shadow)',
            borderRadius: 'var(--round)',
          }}
        >
          {state.list.map((item) => (
            <TodoItem item={item} />
          ))}
        </ul>
        {state.list.length && (
          <div
            css={{
              display: 'flex',
            }}
          >
            <button
              css={{
                margin: 'var(--s1)',
                color: 'var(--gray-2',
              }}
              onClick={() => state.clear()}
            >
              Clear All
            </button>
            <button
              css={{
                margin: 'var(--s1)',
                color: 'var(--gray-2',
              }}
              onClick={() => state.clearDone()}
            >
              Clear Done
            </button>
            <button
              css={{
                margin: 'var(--s1)',
                color: 'var(--gray-2',
              }}
              onClick={() => state.markAllDone()}
            >
              Mark all as done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
