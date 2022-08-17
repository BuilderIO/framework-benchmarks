import { useStore } from '@builder.io/mitosis';

export type AccordionProps = {};

export default function Accordion(props: AccordionProps) {
  const state = useStore({
    activeTab: 0,
  });

  return <div>{/* TODO */}</div>;
}
