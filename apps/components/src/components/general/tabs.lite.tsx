import { useStore } from '@builder.io/mitosis';

export type TabsProps = {};

export default function Tabs(props: TabsProps) {
  const state = useStore({
    activeTab: 0,
  });

  return <div>{/* TODO */}</div>;
}
