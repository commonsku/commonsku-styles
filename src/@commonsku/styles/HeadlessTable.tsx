import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components'
import { SizerCss, SizerTypes, SizerWrapper } from './Sizer';
import { useTable, useSortBy, useBlockLayout, usePagination, useColumnOrder } from 'react-table'
import { useSticky } from 'react-table-sticky';
import { PanelIcon } from './icons/PanelIcon'
import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { Button } from './Button'

const Styles = styled.div`
  padding: 1rem;
  overflow-x: scroll;
  .th,
  .td {
    padding: 5px;
    background-color: #fff;
    overflow: hidden;
    border: none !important;
  }
  .react-table {
    .th,
    .td {
      background: '#fff'
    }
    &.react-table-sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }
      .header {
        top: 0;
        //box-shadow: 0px 3px 3px #ccc;
      }
      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }
      .body {
        position: relative;
        z-index: 0;
      }
      [data-sticky-td] {
        position: sticky;
      }
      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 0px #ccc;
      }
      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 0px #ccc;
      }
    }
  }
  .react-table-pagination {
    padding: 0.5rem;
  }
`

const TD= styled.td<{clickable?: boolean, backgroundColor?: String}&SharedStyleTypes|SizerTypes>`
  &&& {
    border: 0 !important;
    color: #52585c;
    font-size: .875rem;
    line-height: 1.75rem;
    display: table-cell;
    padding: 0.5625rem 0.625rem;
    overflow: visible !important;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : "#fff"};
    &:hover {
      cursor: ${props => props.clickable ? "pointer" : "normal"};
    }
    ${SizerCss}
    ${SharedStyles}
  }
`;

type HeadlessTableProps = React.PropsWithChildren<{
  columns: any,
  data: object[], 
  defaultSort?: { id: string, desc: boolean }, 
  sidePanelRow?: object|null, 
  setSidePanelRow?: any, 
  sortDirectionDivRef?: any, 
  currentColumnsDivRef?: any
} & SharedStyleTypes>;

export function HeadlessTable({ columns, data, defaultSort, sidePanelRow, setSidePanelRow, sortDirectionDivRef, currentColumnsDivRef }: HeadlessTableProps) {
  //@ts-ignore
  const initialState: any = { 
    pageIndex: 0, 
    pageSize: 50
  }
  if(defaultSort) {
    initialState.sortBy = [defaultSort]
  }

  const table: any = useTable(
    {
      columns,
      data,
      initialState,
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

  const [sortDirection, setSortDirection] = useState(defaultSort ? { accessor: defaultSort.id, direction: defaultSort.desc ? 'DESC' : 'ASC' } : {})
  const [currentColumns, setCurrentColumns] = useState(visibleColumns.map((c: any) => c.id))

  useEffect(() => {
    setCurrentColumns(visibleColumns.map((c: any) => c.id))
  }, [visibleColumns])

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
    setCurrentColumns(currentCols);
    setColumnOrder(currentCols);
  };

  return (
    <Styles>
      <>
        {/* <pre>
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
            </pre> */}
        
        {sortDirectionDivRef && <div ref={sortDirectionDivRef} style={{ display: 'none' }}>{JSON.stringify(sortDirection)}</div>}
        {currentColumnsDivRef && <div ref={currentColumnsDivRef} style={{ display: 'none' }}>{JSON.stringify(currentColumns)}</div>}
        <table {...getTableProps()} className="react-table react-table-sticky">
          <thead className="header">
            {headerGroups.map((headerGroup: any, h: any) => (
              <tr key={h} {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column: any, i: any) => (
                  <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}
                    data-column-index={i}
                    draggable={column.noDrag ? false : true}
                    onDragStart={column.noDrag ? undefined : onDragStart}
                    onDragOver={e => e.preventDefault()}
                    onDrop={column.noDrag ? undefined : onDrop}
                    className="th"
                    width={column.width}
                    onClick={() => {
                      column.isSorted
                        ? column.isSortedDesc
                          ? column.clearSortBy()
                          : column.toggleSortBy(true)
                        : column.toggleSortBy(false)
                      let direction
                      if(column.isSorted) {
                        if(column.isSortedDesc) {
                          direction = ''
                        }else{
                          direction = 'DESC'
                        }
                      }else{
                        direction = 'ASC'
                      }
                      let sortDirectionState
                      if(direction === '') {
                        sortDirectionState = {}
                      }else{
                        sortDirectionState = { accessor: column.id, direction }
                      }
                      setSortDirection(sortDirectionState)
                    }}
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
                <tr key={r} {...row.getRowProps()}>
                  {row.cells.map((cell: any, c: any) => {
                    let highlight = false
                    if(setSidePanelRow) {
                      if(row.original === sidePanelRow) {
                        highlight = true
                      }
                    }

                    if(cell.column.isRowId) {
                      return (
                        <TD key={c} {...cell.getCellProps()} className="td" width={cell.column.width} backgroundColor={highlight ? '#F4F7FF' : '#fff'}>
                          <div onClick={() => { sidePanelRow ? setSidePanelRow(null) : setSidePanelRow(row.original) }}>
                           <Button secondary size="tiny">&#65291;</Button>
                          </div> 
                        </TD>
                      )
                    }

                    return (
                      <TD key={c} {...cell.getCellProps()} className="td" width={cell.column.width} backgroundColor={highlight ? '#F4F7FF' : '#fff'}>
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
    </Styles>
  )
}