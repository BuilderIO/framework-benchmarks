import { useStore } from '@builder.io/mitosis';
import helloWorldData from '../reports/angular';
import todoData from '../reports/todo/angular';
import Chart from './general/chart.lite';
import Table from './general/table.lite';
import { Framework, frameworks } from './dashboard/frameworks';
import Picker from './general/picker.lite';
import CodeViewer from './general/code-viewer.lite';
import { Benchmark } from './dashboard/benchmarks';

export default function Dashboard() {
  const state = useStore({
    loading: false,
    framework: 'angular' as Framework,
    benchmark: 'todo' as Benchmark,
    currentData: null as LH.Result[] | null,
    getData() {
      return state.currentData || ([helloWorldData, todoData] as LH.Result[]);
    },
    changeFamework(framework: Framework) {
      state.framework = framework;
      state.loading = true;
      if (framework === 'angular') {
        state.currentData = [
          helloWorldData as LH.Result,
          todoData as LH.Result,
        ];
        state.loading = false;
      } else if (framework === 'astro') {
        Promise.all([
          import('../reports/astro'),
          import('../reports/todo/astro'),
        ]).then((results) => {
          state.currentData = results as any;
          state.loading = false;
        });
      } else {
        state.currentData = [
          helloWorldData as LH.Result,
          todoData as LH.Result,
        ];
        state.loading = false;
      }
    },
  });

  return (
    <div
      css={{
        padding: '$s3',
      }}
    >
      {/* <Table data={state.getData()} /> */}
      <Chart data={state.getData()} />
      <Picker
        options={frameworks}
        value={state.framework}
        onChange={(event) => state.changeFamework(event as Framework)}
      />
      <CodeViewer
        style={{ maxHeight: '50vh', minHeight: '200px' }}
        code={JSON.stringify(state.getData()[0], null, 2)}
        language="json"
      />
    </div>
  );
}
