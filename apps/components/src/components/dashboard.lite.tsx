import { useStore } from '@builder.io/mitosis';
import {
  dashboardDataList,
  todoDataList,
  helloWorldDataList,
} from './dashboard/lighthouse-data.js';
import LhReportChart from './general/lh-report-chart.lite';
import LhReportTable from './general/lh-report-table.lite';

export default function Dashboard() {
  const state = useStore({});

  return (
    <div
      css={{
        padding: '$s3',
      }}
    >
      <LhReportTable
        title="Dashboard App"
        data={dashboardDataList}
        source="https://github.com/BuilderIO/framework-benchmarks/blob/main/apps/components/src/components/dashboard.lite.tsx"
      />
      <LhReportChart data={dashboardDataList} />
      <LhReportTable
        title="Todo App"
        data={todoDataList}
        source="https://github.com/BuilderIO/framework-benchmarks/blob/main/apps/components/src/components/todo-app.lite.tsx"
      />
      <LhReportChart data={todoDataList} />
      <LhReportTable
        title="Hello World App"
        data={helloWorldDataList}
        source="https://github.com/BuilderIO/framework-benchmarks/blob/main/apps/components/src/components/hello-world.lite.tsx"
      />
      <LhReportChart data={helloWorldDataList} />
    </div>
  );
}
