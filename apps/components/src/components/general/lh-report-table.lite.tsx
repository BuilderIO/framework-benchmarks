import { useStore } from '@builder.io/mitosis';
import { LighthouseDataWithName } from '../dashboard/lighthouse-data.js';
import { downloadCsv } from '../utils/generate-csv.js';
import LiteTable from './lite-table.lite';

export interface LhReportTableProps {
  data: LighthouseDataWithName[];
  title: string;
  source: string;
}

export default function LhReportTable(props: LhReportTableProps) {
  const state = useStore({
    getData() {
      return props.data.map((item) => ({
        ...item,
        ttiNumber: Math.round(item.ttiNumber!),
        fcpNumber: Math.round(item.fcpNumber!),
        lcpNumber: Math.round(item.lcpNumber!),
      }));
    },
  });

  return (
    <>
      <div css={{ display: 'flex', alignItems: 'center', marginTop: '$s2' }}>
        <h2 css={{ marginRight: '$s2' }}>{props.title}</h2>
        <a css={{ color: '$primary' }} href={props.source}>
          Source
        </a>
        <button
          css={{
            all: 'unset',
            cursor: 'pointer',
            color: '$gray',
            marginLeft: '$s2',
          }}
          onClick={() => downloadCsv(state.getData())}
        >
          Download CSV
        </button>
      </div>
      <LiteTable
        defaultSort="ttiDisplay"
        hideKeys={['ttiNumber', 'fcpNumber', 'lcpNumber', 'tbtNumber']}
        data={state.getData() as any}
        columnInfo={{
          name: {
            name: 'Name',
          },
          ttiDisplay: {
            name: 'TTI',
            tooltipText: 'Time to Interactive in ms',
          },
          tbtDisplay: {
            name: 'TBT',
            tooltipText: 'Total blocking time',
          },
          fcpDisplay: {
            name: 'FCP',
            tooltipText: 'First Contentful Paint',
          },
          lcpDisplay: {
            name: 'LCP',
            tooltipText: 'Largest Contentful Paint',
          },
          jsKb: {
            name: 'Eager JS KiB',
            tooltipText:
              'Total KiB of eager downloaded and executed JS from script tags',
          },
          score: {
            name: 'Score',
            tooltipText: 'Lighthouse Performance Score',
          },
          totalKb: {
            name: 'Page Weight KiB',
            tooltipText:
              'Total page weight, including HTML, CSS, prefetched resoures',
          },
        }}
      />
    </>
  );
}
