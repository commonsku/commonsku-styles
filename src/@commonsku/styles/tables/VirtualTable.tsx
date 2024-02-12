import React, {useRef, useLayoutEffect, useMemo, useCallback, useState, useEffect} from 'react';
import {
  useTable,
  useSortBy,
  useFlexLayout,
  SortingRule,
  Column,
  Cell,
  useExpanded, UseSortByState,
} from 'react-table';
import { VariableSizeList, ListOnScrollProps, ListChildComponentProps } from 'react-window';
import {BaseSortByHeaderGroup, SortByHeaderGroup, TypedTableInstance} from './types';
import {
  Row,
  TableOptions,
} from './table-types';
import { DoubleArrowIcon, FilledChevronIcon } from '../icons';
import { useWindowSize } from '../hooks';

export type VirtualTableProps<
  RowType extends Record<string, unknown>,
  TableProps,
  TableFooterProps,
> = {
  columns: readonly Column<RowType>[];
  data: RowType[];
  itemSize?: (value: { index: number; row: Row<RowType> }) => number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultSort?: SortingRule<string>;
  onClickRow?: (
    row?: RowType,
    index?: number,
    data?: {
      isScrolling?: boolean;
      cell: Cell<RowType>;
      resetList: (index?: number) => void;
      toggleAllRowsExpanded: (value?: boolean | undefined) => void;
    }
  ) => void;
  onScroll?: ((props: ListOnScrollProps) => any);
  onUpdateData?: (...args: any) => void;
  useTableProps?: TableProps;
  tableHeaderProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
  tableFooterProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
  TableFooter?: (props: React.PropsWithChildren<TableFooterProps>) => React.ReactElement;
  customTableFooterProps?: TableFooterProps;
  className?: string;
  hideFooter?: boolean;
  hideHeader?: boolean;
  NoRowsFound?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
  renderRowSubComponent?: <P = unknown>(props: React.PropsWithChildren<P>) => React.ReactElement;
  onResize?: VoidFunction;
  rowGroupStyles?: (value: {row: Row<RowType>, style: React.CSSProperties }) => React.CSSProperties;
  rowStyles?: (value: {row: Row<RowType>, style: React.CSSProperties }) => React.CSSProperties;
  gutterSize?: number;
  onSortChange?: (sortState: UseSortByState<RowType>) => void;
};

const VirtualTable = <
  RowType extends Record<string, unknown>,
  TableProps,
  TableFooterProps,
> (props: VirtualTableProps<RowType, TableProps, TableFooterProps>) => {
  const {
    columns,
    data,
    itemSize,
    height = 500,
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
    className = "",
    NoRowsFound,
    renderRowSubComponent,
    onResize,
    rowGroupStyles,
    rowStyles,
    gutterSize = 0,
    customTableFooterProps = {},
    TableFooter,
    onSortChange,
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
  ) as TypedTableInstance<RowType>;

  const rows = useMemo(() => tableData.rows, [tableData.rows]);
  const windowSize = useWindowSize();
  const [scrolledToTop, setScrolledToTop] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<HTMLDivElement | HTMLSpanElement>(null);
  const listRef = useRef<VariableSizeList | null>(null);
  const { sortBy } = tableData.state as UseSortByState<RowType>;

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

  const handleSort = useCallback((column: BaseSortByHeaderGroup<RowType>) => {
    listRef.current && listRef.current.resetAfterIndex(0);
    column.toggleSortBy?.();
  }, []);

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
    ({ index, isScrolling, style }: ListChildComponentProps) => {
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
                  onClick={() => (onClickRow ? onClickRow(cell.row.original, index, { cell, isScrolling, resetList, toggleAllRowsExpanded }) : null)}
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

  const getHeaderProps = (column: BaseSortByHeaderGroup<RowType>, isFooter = false) => {
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

  const getHeaderGroupProps = (headerGroup: SortByHeaderGroup<RowType>, isFooter = false) => {
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

  const handleScroll = useCallback((props: ListOnScrollProps) => {
    if (onScroll != null) {
      onScroll(props);
    }

    const rows = rowsRef.current;
    if (rows != null) {
      setScrolledToTop(rows.scrollTop === 0);
      setScrolledToBottom(Math.round(rows.scrollTop) >= rows.scrollHeight - rows.offsetHeight);
    }
  }, [onScroll]);

  const renderTableHeader = useCallback(() => {
    const sortIconDirection = (column: BaseSortByHeaderGroup<RowType>) => column.isSorted
        ? sortDirection(column)
        : "updown";

    return (
        <div
            {...tableHeaderProps}
            className={`thead ${tableHeaderProps.className || ""}`}
            style={{
              ...(tableHeaderProps.style || {}),
              ...(hideHeader ? { display: "none" } : {}),
            }}
        >
          {headerGroups.map((headerGroup) => (
              <div
                  {...getHeaderGroupProps(headerGroup, false)}
                  ref={headerRef}
                  style={{ width: tableWidth }}
              >
                {headerGroup.headers.map((column: BaseSortByHeaderGroup<RowType>) => (
                    <div
                        {...getHeaderProps(column, false)}
                        className="th"
                        onClick={() => handleSort(column)}
                    >
                      {column.render("Header")}
                      <span>
                {column.canSort && (
                    <FilledChevronIcon
                        direction={sortIconDirection(column)}
                        size="medium"
                        style={{ verticalAlign: "middle" }}
                    />
                )}
              </span>
                    </div>
                ))}
              </div>
          ))}
        </div>
    );
  }, [
    getHeaderGroupProps,
    getHeaderProps,
    handleSort,
    headerGroups,
    hideHeader,
    tableHeaderProps,
    tableWidth,
  ]);

  useEffect(() => {
    onSortChange && onSortChange({ sortBy });
  }, [sortBy]);

  const scrollToTop = useCallback(() => {
    listRef.current && listRef.current.scrollTo(0);
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [data, scrollToTop]);

  return (
      <div {...getTableProps()} className={`table ${className || ''}`}>
        {renderTableHeader()}

        <div className="tbody" {...getTableBodyProps()}>
          {rows.length === 0 && NoRowsFound ? <NoRowsFound/> :
              <div className="scroll-container">
                {!scrolledToTop &&
                    <div className="scroll-decoration-top">
                      <DoubleArrowIcon direction="up"/>
                    </div>
                }
                <VariableSizeList
                    useIsScrolling
                    className="table-list-rows"
                    height={height}
                    itemCount={rows.length}
                    itemSize={i => {
                      if (itemSize) {
                        return itemSize({row: rows[i], index: i});
                      }
                      return (rows[i] && rows[i].isExpanded ? 300 : 50) + gutterSize;
                    }}
                    width={tableWidth}
                    onScroll={handleScroll}
                    ref={listRef}
                    outerRef={rowsRef}
                >
                  {RenderRow}
                </VariableSizeList>
                {!scrolledToBottom &&
                    <div className="scroll-decoration-bottom">
                      <DoubleArrowIcon direction="down"/>
                    </div>
                }
              </div>
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
      {TableFooter ? <TableFooter {...(customTableFooterProps as React.PropsWithChildren<TableFooterProps>)} /> : null}
    </div>
  );
};

function sortDirection<
  RowType extends Record<string, unknown> = Record<string, unknown>,
>(col: BaseSortByHeaderGroup<RowType>) {
  if (col.isSorted) {
    if (col.isSortedDesc) {
      return "down";
    }
    return "up";
  }
  return "updown";
}

export default VirtualTable;
