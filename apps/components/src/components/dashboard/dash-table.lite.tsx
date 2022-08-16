import { useStore } from '@builder.io/mitosis';

export interface DashTableProps {
  data: LH.Result[];
}

export default function DashTable(props: DashTableProps) {
  const state = useStore({});
  return <div></div>;
}
