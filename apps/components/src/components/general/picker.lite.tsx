import {
  onUnMount,
  onUpdate,
  useRef,
  useStore,
  onMount,
} from '@builder.io/mitosis';
import Fuse from 'fuse.js';

export interface PickerProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function Picker(props: PickerProps) {
  const inputRef = useRef<HTMLInputElement | undefined>();
  const buttonRef = useRef<HTMLButtonElement | undefined>();
  const containerRef = useRef<HTMLOListElement | undefined>();

  const state = useStore({
    searchString: '',
    dropdownOpen: false,
    highlightedIndex: 0,
    onDocumentClick(event: MouseEvent) {
      if (state.dropdownOpen) {
        // Click outside
        if (!(event.target as HTMLElement).contains(inputRef!)) {
          state.closeTheDropdown();
        }
      }
    },
    getFilteredResults() {
      if (!state.searchString) {
        return props.options;
      }
      return new Fuse(props.options)
        .search(state.searchString)
        .map((item) => item.item);
    },
    submit(value: string) {
      props.onChange(value);
      state.closeTheDropdown();
    },
    isHighlighted(index: number) {
      return index === state.highlightedIndex;
    },
    onKeyDown(event: KeyboardEvent) {
      if (!state.dropdownOpen) {
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const isLast =
          state.highlightedIndex === state.getFilteredResults().length - 1;
        if (isLast) {
          state.highlightedIndex = 0;
        } else {
          state.highlightedIndex = state.highlightedIndex + 1;
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (state.highlightedIndex === 0) {
          state.highlightedIndex = Math.max(
            state.getFilteredResults().length - 1,
            0
          );
        } else {
          state.highlightedIndex = state.highlightedIndex - 1;
        }
      } else if (event.key === 'Enter') {
        const results = state.getFilteredResults();
        if (results.length) {
          event.preventDefault();
          state.submit(results[state.highlightedIndex]);
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        state.closeTheDropdown();
      }
    },
    closeTheDropdown() {
      state.dropdownOpen = false;
      setTimeout(() => {
        buttonRef?.focus();
      });
    },
    openTheDropdown() {
      state.dropdownOpen = true;
      setTimeout(() => {
        inputRef?.focus();
      });
    },
  });

  onMount(() => {
    document.addEventListener('click', state.onDocumentClick);
    document.addEventListener('keydown', state.onKeyDown);
  });

  onUnMount(() => {
    document.removeEventListener('click', state.onDocumentClick);
    document.removeEventListener('keydown', state.onKeyDown);
  });

  onUpdate(() => {
    if (state.highlightedIndex > state.getFilteredResults().length - 1) {
      state.highlightedIndex = Math.max(
        state.getFilteredResults().length - 1,
        0
      );
    }
    if (state.dropdownOpen && containerRef) {
      const highlighted = containerRef.querySelector(
        `[data-index="${state.highlightedIndex}"]`
      );
      if (highlighted && !isVisible(highlighted as HTMLElement, containerRef)) {
        setTimeout(() => {
          highlighted.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        });
      }
    }
  });

  function isVisible(el: HTMLElement, container: Element) {
    const elTop = el.offsetTop;
    const elBottom = elTop + el.clientHeight;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    // The element is fully visible in the container
    return elTop >= containerTop && elBottom <= containerBottom;
  }

  return (
    <div css={{ position: 'relative' }}>
      <button
        ref={buttonRef}
        css={{
          cursor: 'pointer',
        }}
        aria-haspopup="listbox"
        aria-expanded={state.dropdownOpen}
        onClick={() => {
          if (state.dropdownOpen) {
            state.closeTheDropdown();
          } else {
            state.openTheDropdown();
          }
        }}
      >
        {props.value}
      </button>
      {state.dropdownOpen && (
        <div
          css={{
            position: 'absolute',
            zIndex: '2',
            width: '200px',
            boxShadow: '$shadow-2',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            border: '$border',
            borderRadius: '$round',
          }}
        >
          <input
            ref={inputRef}
            autofocus
            placeholder="Search frameworks..."
            value={state.searchString}
            css={{
              border: 'none',
              padding: '$s1',
              margin: '$s1',
            }}
            onInput={(event) => {
              state.searchString = event.target.value;
              state.highlightedIndex = 0;
            }}
          />
          <ol
            ref={containerRef}
            role="listbox"
            css={{
              flexGrow: '1',
              overflow: 'auto',
              maxHeight: '300px',
              borderTop: '$border',
            }}
          >
            {state.getFilteredResults().map((result, index) => (
              <li key={index}>
                <button
                  role="option"
                  data-index={index}
                  aria-selected={props.value === result}
                  css={{
                    all: 'unset',
                    display: 'block',
                    width: '100%',
                    padding: '$s1',
                  }}
                  style={{
                    backgroundColor: state.isHighlighted(index)
                      ? 'var(--primary)'
                      : '',
                    color: state.isHighlighted(index) ? 'white' : '',
                  }}
                  onClick={() => {
                    props.onChange(result);
                  }}
                >
                  {result}
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
