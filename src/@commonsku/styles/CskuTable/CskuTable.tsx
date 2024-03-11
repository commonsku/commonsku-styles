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
  data: readonly T[];
  children: React.ReactElement<TableBodyProps<T>>;
  striped?: boolean;
  headerSticky?: boolean | { top?: number; right?: number; left?: number; };
  selection?: boolean;
  noHeader?: boolean;
  onToggleSelect?: (row: T, value: boolean) => void;
  onToggleExpand?: (row: T, value: boolean) => void;
  onToggleSelectAll?: (value: boolean) => void;
};

function Table<
  T extends BaseRowRecord = BaseRowRecord
>({
  data: initialData,
  children,
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
  } = useTable<T>({ data: initialData, onToggleExpand, onToggleSelect, onToggleSelectAll });

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

        {hasFooter && <TableFooter data={data} RowElem={RowElem} />}
      </tbody>
    </GridTable>
  );
};

export default Table;
