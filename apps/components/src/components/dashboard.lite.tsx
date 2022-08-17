import { useStore } from '@builder.io/mitosis';
import Chart from './general/chart.lite';
import Table, { TableRecord } from './general/table.lite';
import { Framework, frameworks } from './dashboard/frameworks';
import Picker from './general/picker.lite';
import CodeViewer from './general/code-viewer.lite';
import { Benchmark } from './dashboard/benchmarks';
import { getReportData } from './dashboard/get-report-data';
import {
  LighthouseDataWithName,
  todoDataList,
} from './dashboard/lighthouse-data';

export default function Dashboard() {
  const state = useStore({
    loading: false,
    framework: 'angular' as Framework,
    benchmark: 'todo' as Benchmark,
    currentData: null as LighthouseDataWithName[] | null,
    getData() {
      return state.currentData || todoDataList;
    },
    getTableData() {
      return state.getData().map((data) => getReportData(data));
    },
    changeFamework(framework: Framework) {
      state.framework = framework;
    },
    changeBenchmark(benchmark: Benchmark) {},
  });

  return (
    <div
      css={{
        padding: '$s3',
      }}
    >
      <Table
        defaultSort="ttiNumber"
        data={state.getTableData() as any}
        columnInfo={{
          ttiNumber: {
            name: 'TTI Number',
            tooltipText: 'Time to Interactive in ms',
          },
        }}
      />
      <Chart data={state.getTableData()} />

      <div css={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <h2>View full median lighthouse data</h2>
        <div css={{ marginLeft: 'auto' }}>
          <Picker
            dropdownSide="right"
            options={frameworks}
            value={state.framework}
            onChange={(event) => state.changeFamework(event as Framework)}
          />
        </div>
      </div>

      <CodeViewer
        style={{ maxHeight: '50vh', minHeight: '200px' }}
        code={JSON.stringify(
          state.getData().find((data) => data.name === state.framework),
          null,
          2
        )}
        language="json"
      />
    </div>
  );
}
