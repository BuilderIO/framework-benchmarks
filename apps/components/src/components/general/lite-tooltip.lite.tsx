import { onUpdate, useRef, useStore } from '@builder.io/mitosis';
import { createPopper, Placement, Options } from '@popperjs/core';

export type TooltipProps = {
  text: string;
  tooltipText: string;
  placement?: Placement;
  options?: Options;
};

export default function LiteTooltip(props: TooltipProps) {
  const state = useStore({
    open: false,
  });

  const containerRef = useRef<HTMLElement>();
  const popperRef = useRef<HTMLDivElement>();

  onUpdate(() => {
    if (state.open) {
      createPopper(containerRef, popperRef, {
        placement: props.placement || 'auto',
        ...props.options,
      });
    }
  }, [state.open]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => (state.open = true)}
      onMouseLeave={() => (state.open = false)}
      css={{
        position: 'relative',
      }}
    >
      {props.text}
      {state.open && (
        <div
          ref={popperRef}
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
