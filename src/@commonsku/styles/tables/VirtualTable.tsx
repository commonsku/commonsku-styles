import React, { useRef, useLayoutEffect, useMemo, useCallback, useEffect } from 'react';
import {
  useTable,
  useSortBy,
  useFlexLayout,
  SortingRule,
  Column,
  useExpanded,
} from 'react-table';
import { VariableSizeList, ListOnScrollProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { BaseSortByHeaderGroup, SortByHeaderGroup } from './types';
import {
  Row,
  ColumnInstance,
  TableInstance,
  TableOptions,
} from './table-types';
import { FilledChevronIcon } from '../icons';

export type VirtualTableProps = {
  columns: Column<object>[];
  data: object[];
  itemSize?: (value: { index: number; row: Row }) => number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultSort?: SortingRule<string>;
  onClickRow?: (row?: object, index?: number) => void;
  onScroll?: ((props: ListOnScrollProps) => any);
  onUpdateData?: (...args: any) => void;
  useTableProps?: object;
  tableHeaderProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
  tableFooterProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
  TableFooter?: React.ReactNode;
  className?: string;
  hideFooter?: boolean;
  hideHeader?: boolean;
  NoRowsFound?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
  renderRowSubComponent?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
  onSort?: (value: { column: ColumnInstance }) => void;
  onResize?: VoidFunction;
};

function VirtualTable({
  columns,
  data,
  itemSize,
  height,
  minWidth = 140,
  maxWidth = 500,
  defaultSort,
  onClickRow,
  onScroll,
  onUpdateData,
  useTableProps = {},
  tableHeaderProps = {},
  tableFooterProps = {},
  hideFooter = true,
  hideHeader = false,
  className = '',
  NoRowsFound,
  renderRowSubComponent,
  onSort,
  onResize,
}: VirtualTableProps) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: minWidth,
      maxWidth: maxWidth,
      expanded: false,
    }),
    [minWidth, maxWidth]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    totalColumnsWidth,
    prepareRow,
    ...tableData
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        ...(defaultSort ? { sortBy: [defaultSort] } : {}),
      },
      onUpdateData,
      ...useTableProps,
    } as TableOptions,
    useFlexLayout,
    useSortBy,
    useExpanded
  ) as TableInstance;

  const rows = useMemo(() => (tableData.rows as Row[]), [tableData.rows]);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<HTMLDivElement | HTMLSpanElement>(null);
  const listRef = useRef<VariableSizeList<any>>(null);

  const handleSort = useCallback(column => {
    listRef.current && listRef.current.resetAfterIndex(0);
    column.toggleSortBy();
    onSort && onSort({ column });
  }, [listRef, onSort]);

  const onListScroll = useCallback((e: Event) => {
    if (headerRef.current && e && e.target) {
      const target = e.target as HTMLDivElement | HTMLSpanElement;
      headerRef.current.scrollLeft = target.scrollLeft;
    }

    if (footerRef.current && e && e.target) {
      const target = e.target as HTMLDivElement | HTMLSpanElement;
      footerRef.current.scrollLeft = target.scrollLeft;
    }
  }, [headerRef, footerRef]);

  useLayoutEffect(() => {
    const rowsElem = rowsRef.current;
    if (rowsElem) {
      rowsElem.addEventListener('scroll', onListScroll);
    }
    return () => {
      if (rowsElem) {
        rowsElem.removeEventListener('scroll', onListScroll);
      }
    };
  }, [rowsRef, onListScroll]);

  const RenderRow = useCallback(
    ({ index, isScrolling, style }) => {
      const row = rows[index];

      prepareRow(row);

      return (
        <div className="tr-group" {...row.getRowProps()} style={style}>
          <div className="tr">
            {row.cells.map((cell) => {
              const cellProps = cell.getCellProps();
              return (
                <div
                  {...{...cellProps}}
                  onClick={() => (onClickRow ? onClickRow(cell.row.original, index) : null)}
                  className="td"
                >
                  {cell.render("Cell", { isScrolling })}
                </div>
              );
            })}
          </div>
          {row.isExpanded && renderRowSubComponent
            ? renderRowSubComponent({ row })
            : null}
        </div>
      );
    },
    [prepareRow, rows, onClickRow, renderRowSubComponent]
  );

  const getHeaderProps = (column: BaseSortByHeaderGroup<object>, isFooter = false) => {
    let headerProps = column.getHeaderProps({
      ...column.getSortByToggleProps(),
      ...(column.containerProps || {}),
    });
    if (isFooter) {
      headerProps = column.getFooterProps({
        ...column.getSortByToggleProps(),
        ...(column.containerProps || {}),
      });
    }
    const headerStyles = {
      ...(headerProps.style || {}),
      ...(column.style || {}),
    };
    const headerClassNames = [
      'th',
      ...(headerProps.className || "").split(' '),
      ...(column.className || "").split(' '),
    ].filter(v => v).join(' ');

    return {
      ...headerProps,
      style: headerStyles,
      className: headerClassNames,
    };
  };

  const getHeaderGroupProps = (headerGroup: SortByHeaderGroup<object>, isFooter = false) => {
    let headerGroupProps = headerGroup.getHeaderGroupProps({
      ...(headerGroup.containerProps || {}),
    });
    if (isFooter) {
      headerGroupProps = headerGroup.getFooterGroupProps({
        ...(headerGroup.containerProps || {}),
      });
    }
    const headerStyles = {
      ...(headerGroupProps.style || {}),
      ...(headerGroup.style || {}),
    };
    const headerClassNames = [
      isFooter ? 'footer tr' : 'header tr',
      ...(headerGroupProps.className || "").split(' '),
      ...(headerGroup.className || "").split(' '),
    ].filter(v => v).join(' ');

    return {
      ...headerGroupProps,
      style: headerStyles,
      className: headerClassNames,
    };
  };

  return (
    <div {...getTableProps()} className={`table ${className || ''}`}>
      <div
        {...tableHeaderProps}
        className={`thead ${tableHeaderProps.className || ''}`}
        style={{
          ...(tableHeaderProps.style || {}),
          ...(hideHeader ? { display: 'none' } : {}),
        }}
      >
        {headerGroups.map((headerGroup) => (
          <div {...getHeaderGroupProps(headerGroup, false)} ref={headerRef}>
            {headerGroup.headers.map((column) => (
              <div
                {...getHeaderProps(column, false)}
                className="th"
                onClick={() => handleSort(column)}
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? <FilledChevronIcon
                    direction={sortDirection(column)}
                    size="medium"
                    style={{ verticalAlign: 'middle' }}
                  /> : null}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="tbody" {...getTableBodyProps()}>
        {rows.length === 0 && NoRowsFound ? <NoRowsFound /> :
          <AutoSizer onResize={onResize} disableWidth>
            {({ height: sizerHeight }) => (
              <VariableSizeList
                useIsScrolling
                className="table-list-rows"
                height={sizerHeight || height || 500}
                itemCount={rows.length}
                // Hardcoded values only :/
                itemSize={i => {
                  if (itemSize) {
                    return itemSize({ row: rows[i], index: i });
                  }
                  return rows[i] && rows[i].isExpanded ? 300 : 50;
                }}
                width={'100%'}
                onScroll={onScroll}
                ref={listRef}
                outerRef={rowsRef}
              >
                {RenderRow}
              </VariableSizeList>
            )}
          </AutoSizer>}
      </div>

      {!hideFooter ? <div {...tableFooterProps}
        className={`table-footer-wrapper ${tableFooterProps.className || ''}`}
      >
        {footerGroups.map((footerGroup) => (
          <div {...getHeaderGroupProps(footerGroup, true)} className="table-footer tr" ref={footerRef}>
            {footerGroup.headers.map((column) => (
              <div {...getHeaderProps(column, true)}>
                {column.render("Footer")}
              </div>
            ))}
          </div>
        ))}
      </div> : null}
    </div>
  );
}

function sortDirection(col: BaseSortByHeaderGroup<object>) {
  if (col.isSorted) {
    if (col.isSortedDesc) {
      return "down";
    }
    return "up";
  }
  return "updown";
}

export default VirtualTable;