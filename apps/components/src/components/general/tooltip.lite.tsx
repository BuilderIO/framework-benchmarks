import { Slot, useStore } from '@builder.io/mitosis';
import { JSX } from '@builder.io/mitosis/jsx-runtime';

export type TooltipProps = {
  text: string;
  children: JSX.Element;
};

export default function Tooltip(props: TooltipProps) {
  const state = useStore({
    open: false,
  });
  return (
    <span
      onMouseEnter={() => (state.open = true)}
      onMouseLeave={() => (state.open = false)}
      css={{
        position: 'relative',
      }}
    >
      <Slot />
      {state.open && (
        <div
          css={{
            position: 'absolute',
            zIndex: '1',
            borderRadius: '$round',
            padding: '$s1',
            shadow: '$shadow-2',
            background: '$gray-4',
            color: 'white',
          }}
        >
          {props.text}
        </div>
      )}
    </span>
  );
}
