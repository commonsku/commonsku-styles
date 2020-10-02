import _ from 'lodash';
import React from 'react';
import styled, {css} from 'styled-components'
import { SizerCss, SizerTypes, SizerWrapper } from './Sizer';
import { useTable, useSortBy, useBlockLayout, usePagination, useColumnOrder } from 'react-table'
import { useSticky } from 'react-table-sticky';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

const TD= styled.td<{clickable?: boolean}&SharedStyleTypes|SizerTypes>`
  &&& {
    border: 0 !important;
    color: #52585c;
    font-size: .875rem;
    line-height: 1.75rem;
    display: table-cell;
    padding: 0.5625rem 0.625rem;
    overflow: visible !important;
    &:hover {
      cursor: ${props => props.clickable ? "pointer" : "normal"};
    }
    ${SizerCss}
    ${SharedStyles}
  }
`;

type HeadlessTableProps = React.PropsWithChildren<{columns: any, data: any, setSidePanelRow?: any} & SharedStyleTypes>;

export function HeadlessTable({ columns, data, setSidePanelRow }: HeadlessTableProps) {
  //@ts-ignore
  const partials: any = { pageIndex: 0, pageSize: 50 }

  const table: any = useTable(
    {
      columns,
      data,
      initialState: partials,
    },
    useSortBy,
    usePagination,
    useColumnOrder,
    useSticky,
    useBlockLayout
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    visibleColumns,
    prepareRow,
    setColumnOrder,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = table

  let columnBeingDragged: any = null;

  const onDragStart = (e: any) => {
    columnBeingDragged = e.target.dataset.columnIndex;
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    const newPosition = e.target.dataset.columnIndex;
    const currentCols = visibleColumns.map((c: any) => c.id);
    const colToBeMoved = currentCols.splice(columnBeingDragged, 1);
    currentCols.splice(newPosition, 0, colToBeMoved[0]);
    setColumnOrder(currentCols);
  };

  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <table {...getTableProps()} className="react-table react-table-sticky">
        <thead className="header">
          {headerGroups.map((headerGroup: any, h: any) => (
            <tr key={h} {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column: any, i: any) => (
                <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}
                  data-column-index={i}
                  draggable={column.noDrag ? false : true}
                  onDragStart={column.noDrag ? false : onDragStart}
                  onDragOver={e => e.preventDefault()}
                  onDrop={column.noDrag ? false : onDrop}
                  className="th"
                  width={column.width}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="body">
          {page.map((row: any, r: any) => {
            prepareRow(row)
            return (
              <tr key={r} {...row.getRowProps()} onClick={() => {setSidePanelRow(row.original)}}>
                {row.cells.map((cell: any, c: any) => {
                  return (
                    <TD key={c} {...cell.getCellProps()} className="td" width={cell.column.width}>
                      {cell.render('Cell')}
                    </TD>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="react-table-pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e: any) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e: any) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}