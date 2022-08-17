import { useStore } from '@builder.io/mitosis';
import { sortBy } from '../utils/sort.js';
import Tooltip from './lite-tooltip.lite';

export interface ColumnInfo {
  name: string;
  tooltipText?: string;
}

export type Primitive = string | number | boolean | null | undefined;
export type TableRecord = Record<string, Primitive>[];

export interface TableProps {
  data: TableRecord[];
  hideKeys?: string[];
  defaultSort?: string;
  columnInfo?: Record<string, ColumnInfo>;
}

export default function LiteTable(props: TableProps) {
  const state = useStore({
    sortByKey: '',
    sortDirection: 'asc' as 'asc' | 'desc',
    getColumnInfo(key: string) {
      return (
        props.columnInfo?.[key] ||
        ({
          name: key,
        } as ColumnInfo)
      );
    },
    getKeys() {
      if (!props.data?.length) {
        return [];
      }
      return Object.keys(props.data[0]).filter(
        (item) => !props.hideKeys?.includes(item)
      );
    },
    getSortKey() {
      return state.sortByKey || props.defaultSort;
    },
    thClicked(key: string) {
      if (state.sortByKey === key) {
        if (state.sortDirection === 'asc') {
          state.sortDirection = 'desc';
        } else {
          state.sortDirection = 'asc';
        }
      }
      state.sortByKey = key;
    },
    getSortedRows() {
      const sortKey = state.getSortKey();
      const rows = props.data;
      if (!sortKey) {
        return rows;
      }
      const sorted = rows.sort(sortBy(sortKey));
      if (state.sortDirection === 'desc') {
        return sorted.reverse();
      }
      return sorted;
    },
  });
  return (
    <table
      css={{
        borderCollapse: 'collapse',
        margin: '25px 0',
        fontSize: '0.9em',
        borderRadius: '$round',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
        '& thead tr': {
          backgroundColor: '$gray-5',
          color: 'white',
          textAlign: 'left',
        },
        '& th, & td': {
          padding: '12px 15px',
        },
        '& tbody tr': {
          borderBottom: '1px solid #dddddd',
        },

        '& tbody tr:nth-of-type(even)': {
          backgroundColor: '#f3f3f3',
        },
      }}
    >
      <thead>
        <tr>
          {state.getKeys().map((key) => (
            <th
              css={{
                cursor: 'pointer',
              }}
              key={key}
              onClick={() => state.thClicked(key)}
            >
              {state.getColumnInfo(key).tooltipText ? (
                <Tooltip
                  text={state.getColumnInfo(key).name}
                  tooltipText={state.getColumnInfo(key).tooltipText!}
                />
              ) : (
                <span>{state.getColumnInfo(key).name}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {state.getSortedRows().map((row, index) => (
          <tr key={index}>
            {state.getKeys().map((key) => (
              <td key={key}>{(row as any)[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
