'use client';
import { useBEM, useBreakpoint } from '@tectus/hooks';
import './UiTable.scss';
import { JSX } from 'react';

export interface Column {
  key: string; // field name in data
  label: string; // header label
  template?: {
    td?: (row: Record<string, any>) => JSX.Element;
  };
}

export interface UiTableProps {
  columns: Column[];
  mobileColumns?: Column[];
  data: Record<string, any>[];
  className?: string;

  //TEMP
  variant?: 'default' | 'highlighted';
}

export function UiTable({ columns, mobileColumns, data, className, variant = 'default' }: UiTableProps) {
  const { B, E } = useBEM('ui-table');
  const { isLessThan } = useBreakpoint();

  const displayedColumns = isLessThan('tablet-md') ? (mobileColumns || columns): columns;

  return (
    <div className={B(className)}>
      <table>
        <thead className={E('head')}>
          <tr>
            {displayedColumns.map((col) => (
              <th key={col.key} className={E('th', variant)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={E('body')}>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={E('tr')}>
                {displayedColumns.map((col) => (
                  <td key={col.key} className={E('td')}>
                    {col.template?.td ? col.template.td(row) : (row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={E('empty')}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
