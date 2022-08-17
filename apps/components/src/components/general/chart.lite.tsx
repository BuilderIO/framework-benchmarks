import { useStore } from '@builder.io/mitosis';

export interface ChartProps {
  data: any[];
}

export default function Chart(props: ChartProps) {
  const state = useStore({});
  return <div></div>;
}
