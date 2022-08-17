import { useStore } from '@builder.io/mitosis';

export type TooltipProps = {
  text: string;
  tooltipText: string;
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
      {props.text}
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
          {props.tooltipText}
        </div>
      )}
    </span>
  );
}
