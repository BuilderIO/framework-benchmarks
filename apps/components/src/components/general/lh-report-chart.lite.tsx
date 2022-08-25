import { useStore } from '@builder.io/mitosis';
import { LighthouseDataWithName } from '../dashboard/lighthouse-data.js';
import { sortBy } from '../utils/sort.js';
import ColorHash from 'color-hash';

export interface LhReportChartProps {
  data: LighthouseDataWithName[];
}

export default function LhReportChart(props: LhReportChartProps) {
  const state = useStore({
    displayCols: ['ttiNumber', 'tbtNumber', 'fcpNumber'],
    maxHeight: 500,
    getHeight(row: LighthouseDataWithName, key: string) {
      return ((row as any)[key] / state.getMaxValue()) * 100;
    },
    getRows() {
      return props.data.sort(sortBy('ttiNumber'));
    },
    getColor(name: string) {
      const colorHash = new ColorHash({
        lightness: 0.7,
        saturation: 0.7,
      });
      return colorHash.hex(name);
    },
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
          {state.getRows().map((row, index) => (
            <div
              key={index}
              style={{
                height: state.maxHeight + 'px',
              }}
              css={{ display: 'flex', alignItems: 'flex-end' }}
            >
              {state.displayCols.map((col, index) => (
                <div
                  key={index}
                  style={{
                    height: state.getHeight(row, col) + '%',
                    backgroundColor: state.getColor(col),
                  }}
                  css={{
                    width: '20px',
                    marginRight: '$s1',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div css={{ display: 'flex' }}>{/* Labels */}</div>
      </div>
    </>
  );
}
