import { useStore } from '@builder.io/mitosis';
import { LighthouseDataWithName } from '../dashboard/lighthouse-data.js';

export interface LhReportChartProps {
  data: LighthouseDataWithName[];
}

export default function LhReportChart(props: LhReportChartProps) {
  const state = useStore({
    
  });

  return <></>;
}
