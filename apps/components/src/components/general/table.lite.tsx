import { useStore } from '@builder.io/mitosis';
import Tooltip from './tooltip.lite';

export interface ColumnInfo {
  name: string;
  tooltipText?: string;
}

export interface TableProps {
  data: any[];
  columnInfo?: Record<string, ColumnInfo>;
}

export default function Table(props: TableProps) {
  const state = useStore({
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
      return Object.keys(props.data[0]);
    },
  });
  return (
    <table>
      <thead>
        <tr>
          {state.getKeys().map((key) => (
            <th key={key}>
              {state.getColumnInfo(key).tooltipText ? (
                <Tooltip text={state.getColumnInfo(key).tooltipText!}>
                  {state.getColumnInfo(key).name}
                </Tooltip>
              ) : (
                <span>{state.getColumnInfo(key).name}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, index) => (
          <tr key={index}>
            {state.getKeys().map((key) => (
              <td key={key}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
