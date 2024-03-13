import React, { useMemo } from 'react';
import GridTable from './GridTable';
import TableRow from './TableRow';
import TableFooter from './TableFooter';
import { BaseRowRecord, TableBodyProps } from './types';
import useTable from './useTable';
import TableHeader from './TableHeader';

type TableProps<
  T extends BaseRowRecord = BaseRowRecord
> = {
  readonly data: T[];
  readonly children: React.ReactElement<TableBodyProps<T>>;
  readonly striped?: boolean;
  readonly headerSticky?: boolean | { top?: number; right?: number; left?: number; };
  readonly selection?: boolean;
  readonly noHeader?: boolean;

  readonly onSort?: (colKey: string, sortAsc?: boolean | undefined) => void;
  readonly onToggleSelect?: (row: T, value: boolean) => void;
  readonly onToggleExpand?: (row: T, value: boolean) => void;
  readonly onToggleSelectAll?: (value: boolean) => void;
};

function Table<
  T extends BaseRowRecord = BaseRowRecord
>({
  data: initialData,
  children,
  onSort,
  onToggleExpand,
  onToggleSelect,
  onToggleSelectAll,

  striped = false,
  headerSticky = false,
  selection = false,
  noHeader = false,
}: TableProps<T>) {
  const {
    data,
    isAllSelected,
    isSomeSelected,
    getRowProperties,
    getColProperties,
    handleToggleExpand,
    handleToggleSelect,
    handleToggleSelectAll,
    handleSort,
  } = useTable<T>({ data: initialData, onToggleExpand, onToggleSelect, onToggleSelectAll, onSort, });

  const RowElem = useMemo(
    () => React.Children.only(children),
    [children]
  );
  const hasFooter = RowElem?.props?.children?.find?.(c => Boolean(c.props.FooterCell));
  const columns = useMemo(
    () => (selection ? [['100px', '1fr']] as Array<[string|number, string|number]> : []).concat(
      (RowElem?.props?.children ?? []).map(
        v => ([v?.props?.minWidth ?? '100px', v?.props?.maxWidth ?? '1fr'])
      )
    ),
    [RowElem, selection]
  );

  return (
    <GridTable columns={columns} selectedBorderWidth={1}>
      {!noHeader && <thead>
        <TableHeader
          selection={selection}
          headerSticky={headerSticky}
          isAllSelected={isAllSelected}
          isSomeSelected={isSomeSelected}
          RowElem={RowElem}
          getColProperties={getColProperties}
          handleToggleSelectAll={handleToggleSelectAll}
          handleSort={handleSort}
        />
      </thead>}

      <tbody>
        {data.map((row, i) => (
          <TableRow
            key={'' + row.id}
            {...RowElem?.props}
            data={data}
            row={row}
            index={i}
            selection={selection}
            striped={striped}
            getRowProperties={getRowProperties}
            handleToggleSelect={handleToggleSelect}
            handleToggleExpand={handleToggleExpand}
          />
        ))}
        {data.length === 0 && <tr>
          <td style={{ gridColumn: `1 / span ${columns.length}`, }}>No records found</td>
        </tr>}

        {hasFooter && <TableFooter data={data} RowElem={RowElem} />}
      </tbody>
    </GridTable>
  );
};

export default Table;
