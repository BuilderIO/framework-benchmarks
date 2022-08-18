import { useStore } from '@builder.io/mitosis';
import LiteTable, { TableRecord } from './general/lite-table.lite';
import { Framework, frameworks } from './dashboard/frameworks.js';
import LitePicker from './general/lite-picker.lite';
import { Benchmark } from './dashboard/benchmarks.js';
import {
  LighthouseDataWithName,
  dashboardDataList,
} from './dashboard/lighthouse-data.js';

export default function Dashboard() {
  const state = useStore({
    loading: false,
    framework: 'astro' as Framework,
    benchmark: 'dashboard' as Benchmark,
    currentData: null as LighthouseDataWithName[] | null,
    getData() {
      return state.currentData || dashboardDataList;
    },
    getTableData() {
      return state.getData();
    },
    changeFamework(newFramework: Framework) {
      state.framework = newFramework;
    },
    changeBenchmark(newBenchmark: Benchmark) {
      state.benchmark = newBenchmark;
    },
  });

  return (
    <div
      css={{
        padding: '$s3',
      }}
    >
      <LiteTable
        defaultSort="ttiNumber"
        hideKeys={['ttiNumber']}
        data={state.getTableData() as any}
        columnInfo={{
          name: {
            name: 'Name',
          },
          ttiNumber: {
            name: 'TTI Number',
            tooltipText: 'Time to Interactive in ms',
          },
          jsKb: {
            name: 'Eager JS KiB',
            tooltipText:
              'Total KiB of eager downloaded and executed JS from script tags',
          },
          totalKb: {
            name: 'Page Weight KiB',
            tooltipText:
              'Total page weight, including HTML, CSS, prefetched resoures',
          },
        }}
      />
      {/* <Chart data={state.getTableData()} /> */}

      <div css={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <h2>View full median lighthouse data</h2>
        <div css={{ marginLeft: 'auto' }}>
          <LitePicker
            dropdownSide="right"
            options={frameworks}
            value={state.framework}
            onChange={(event) => state.changeFamework(event as Framework)}
          />
        </div>
      </div>
    </div>
  );
}
