import { useStore } from '@builder.io/mitosis';
import { LighthouseDataWithName } from '../dashboard/lighthouse-data.js';

export interface LhReportChartProps {
  data: LighthouseDataWithName[];
}

export default function LhReportChart(props: LhReportChartProps) {
  const state = useStore({
    displayCols: ['ttiNumber', 'tbtNumber', 'fcpNumber'],
    maxHeight: 500,
    getMaxValue() {
      return props.data.reduce((memo, row) => {
        const ttiNumber = row.ttiNumber!;
        const tbtNumber = row.tbtNumber!;
        const fcpNumber = row.fcpNumber!;
        return Math.max(memo, ttiNumber, tbtNumber, fcpNumber);
      }, 0);
    },
  });

  return (
    <>
      <div>
        <div css={{ display: 'flex' }}>
          {props.data.map((row) => (
            <div css={{ display: 'flex' }}>{/* Bars */}</div>
          ))}
        </div>
        <div css={{ display: 'flex' }}>{/* Labels */}</div>
      </div>
    </>
  );
}
