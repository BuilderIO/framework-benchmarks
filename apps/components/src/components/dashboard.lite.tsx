import { useStore } from '@builder.io/mitosis';
import helloWorldData from '../../reports/qwik.json';
import todoData from '../../reports/todo/qwik.json';
import Chart from './dashboard/chart.lite';
import Table from './dashboard/dash-table.lite';
import FrameworkPicker from './dashboard/framework-picker.lite';
import { Framework } from './dashboard/frameworks';

export default function Dashboard() {
  const state = useStore({
    framework: 'angular' as Framework,
    getData() {
      return [helloWorldData, todoData];
    },
  });

  return (
    <>
      <FrameworkPicker
        value={state.framework}
        onChange={(event) => (state.framework = event)}
      />
      <Table data={state.getData()} />
      <Chart data={state.getData()} />
    </>
  );
}
