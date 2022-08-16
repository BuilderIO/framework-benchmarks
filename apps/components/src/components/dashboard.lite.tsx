import { useStore } from '@builder.io/mitosis';
// import helloWorldData from '../../reports/angular.json';
// import todoData from '../../reports/todo/angular.json';
import Chart from './dashboard/chart.lite';
import Table from './dashboard/dash-table.lite';
import FrameworkPicker from './dashboard/framework-picker.lite';
import { Framework } from './dashboard/frameworks';

export default function Dashboard() {
  const state = useStore({
    loading: false,
    framework: 'angular' as Framework,
    currentData: null as LH.Result[] | null,
    getData() {
      return [];
      // return state.currentData || [helloWorldData, todoData];
    },
    changeFamework(framework: Framework) {
      state.framework = framework;
      state.loading = true;
      // if (framework === 'angular') {
      //   state.currentData = [helloWorldData, todoData];
      // } else if (framework === 'astro') {
      //   state.currentData = await Promise.all([
      //     import('../../reports/astro.json'),
      //     import('../../reports/todo/astro.json'),
      //   ]);
      // }
      state.loading = false;
      state.currentData = null;
    },
  });

  return (
    <>
      <FrameworkPicker
        value={state.framework}
        onChange={(event) => state.changeFamework(event)}
      />
      <Table data={state.getData()} />
      <Chart data={state.getData()} />
    </>
  );
}
