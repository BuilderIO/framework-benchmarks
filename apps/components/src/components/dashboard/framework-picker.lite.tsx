import { useStore } from '@builder.io/mitosis';
import { Framework } from './frameworks';
import { fuse } from './search';

export interface FrameworkPickerProps {
  value: Framework;
  onChange: (framework: Framework) => void;
}

export default function FrameworkPicker(props: FrameworkPickerProps) {
  const state = useStore({
    searchString: '',
    openDropdown: false,
    getFilteredResults() {
      return fuse.search(state.searchString);
    },
  });
  return (
    <div css={{ position: 'relative' }}>
      <div onClick={() => (state.openDropdown = !state.openDropdown)}>
        {props.value}
      </div>
      {state.openDropdown && (
        <div css={{ position: 'absolute', zIndex: '1' }}>
          <input
            value={state.searchString}
            onInput={(event) => (state.searchString = event.target.value)}
          />
          {state.getFilteredResults().map((result) => (
            <button
              onClick={() => {
                props.onChange(result.item);
              }}
              css={{
                all: 'unset',
              }}
            >
              {result.item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
