import React, { useRef, useLayoutEffect, useMemo, useCallback, } from 'react';
import {
  useTable,
  useSortBy,
  useFlexLayout,
  SortingRule,
  Column,
  Cell,
  useExpanded,
} from 'react-table';
import { VariableSizeList, ListOnScrollProps } from 'react-window';
import { BaseSortByHeaderGroup, SortByHeaderGroup } from './types';
import {
  Row,
  ColumnInstance,
  TableInstance,
  TableOptions,
} from './table-types';
import { FilledChevronIcon } from '../icons';
import scrollbarWidth from './scrollbarWidth';
import { useWindowSize } from '../hooks';

export type VirtualTableProps = {
  columns: Column<object>[];
  data: object[];
  itemSize?: (value: { index: number; row: Row }) => number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultSort?: SortingRule<string>;
  onClickRow?: (row?: object, index?: number, cell?: Cell<Record<string, unknown>, any>) => void;
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
  TableFooter?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
  customTableFooterProps?: object;
  className?: string;
  hideFooter?: boolean;
  hideHeader?: boolean;
  NoRowsFound?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
  renderRowSubComponent?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
  onSort?: (value: { column: ColumnInstance }) => void;
  onResize?: VoidFunction;
  rowGroupStyles?: (value: {row: Row, style: React.CSSProperties }) => React.CSSProperties;
  rowStyles?: (value: {row: Row, style: React.CSSProperties }) => React.CSSProperties;
  gutterSize?: number;
};

const VirtualTable = (props: VirtualTableProps) => {
  const {
    columns,
    data,
    itemSize,
    height=500,
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
    rowGroupStyles,
    rowStyles,
    gutterSize=0,
    customTableFooterProps={},
    TableFooter,
  } = props;

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
    toggleAllRowsExpanded,
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
  const windowSize = useWindowSize();

  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<HTMLDivElement | HTMLSpanElement>(null);
  const listRef = useRef<VariableSizeList<any> | null>(null);

  function resetList(index: number = 0) {
    listRef.current && listRef.current.resetAfterIndex(index);
  }

  const tableWidth = useMemo(() => {
    if (rowsRef.current) {
      const rect = rowsRef.current.getBoundingClientRect();
      return windowSize[0]-30-rect.left;
    }
    return '100%';
  }, [windowSize, rowsRef]);

  const handleSort = useCallback(column => {
    listRef.current && listRef.current.resetAfterIndex(0);
    column.toggleSortBy();
    onSort && onSort({ column });
  }, [onSort]);

  function onListScroll(e: Event) {
    if (headerRef.current && e && e.target) {
      const target = e.target as HTMLDivElement | HTMLSpanElement;
      headerRef.current.scrollLeft = target.scrollLeft;
    }

    if (footerRef.current && e && e.target) {
      const target = e.target as HTMLDivElement | HTMLSpanElement;
      footerRef.current.scrollLeft = target.scrollLeft;
    }
  }

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
  }, [rowsRef]);

  const RenderRow = useCallback(
    ({ index, isScrolling, style }) => {
      const row = rows[index];

      prepareRow(row);

      return (
        <div
        className="tr-group"
        {...row.getRowProps()}
        style={{
          ...style,
          ...(rowGroupStyles ? rowGroupStyles({row, style}) : {}),
          minWidth: totalColumnsWidth,
          width: '100%',
        }}
      >
          <div className="tr" style={rowStyles ? rowStyles({row, style}) : {}}>
            {row.cells.map((cell) => {
              const cellProps = cell.getCellProps();
              return (
                <div
                  {...{...cellProps}}
                  onClick={() => (onClickRow ? onClickRow(cell.row.original, index, cell) : null)}
                  className="td"
                >
                  {cell.render("Cell", { isScrolling, resetList, toggleAllRowsExpanded })}
                </div>
              );
            })}
          </div>
          {row.isExpanded && renderRowSubComponent
            ? <div className='tr-sub'>{renderRowSubComponent({ row, resetList, })}</div>
            : null}
        </div>
      );
    },
    [
      prepareRow,
      rows,
      onClickRow,
      renderRowSubComponent,
      rowStyles,
      rowGroupStyles,
      totalColumnsWidth,
      toggleAllRowsExpanded,
    ]
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
          <div {...getHeaderGroupProps(headerGroup, false)} ref={headerRef} style={{width: tableWidth,}}>
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
            <VariableSizeList
              useIsScrolling
              className="table-list-rows"
              height={height}
              itemCount={rows.length}
              itemSize={i => {
                if (itemSize) {
                  return itemSize({ row: rows[i], index: i });
                }
                return (rows[i] && rows[i].isExpanded ? 300 : 50) + gutterSize;
              }}
              width={tableWidth}
              onScroll={onScroll}
              ref={listRef}
              outerRef={rowsRef}
            >
              {RenderRow}
            </VariableSizeList>
          }
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
      {TableFooter ? <TableFooter {...customTableFooterProps} /> : null}
    </div>
  );
};

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
