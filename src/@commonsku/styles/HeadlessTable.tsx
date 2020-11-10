// @ts-nocheck

import _, { initial } from 'lodash';
import ReactDOM from 'react-dom';
import React, { useRef, useState, useEffect, createContext, useContext, forwardRef } from 'react';
import styled, { css } from 'styled-components'
import { SizerCss, SizerTypes, SizerWrapper } from './Sizer';
import { useTable, useSortBy, useBlockLayout, usePagination, useColumnOrder } from 'react-table'
import { useSticky } from 'react-table-sticky';
import { FixedSizeList as List } from 'react-window';

import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { Button } from './Button'
import { UpArrowIcon } from './icons';
import { getColor } from './Theme';
import scrollbarWidth from './scrollbarWidth';
import { containerCSS } from 'react-select/src/components/containers';

const Styles = styled.div<{pagination?: boolean}>`
  overflow-x: ${props => props.pagination ? 'scroll' : 'hidden'};
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
        z-index: 5 !important;
      }
      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 0px #ccc;
      }
    }

    .sticky {
      position: sticky !important;
      position: -webkit-sticky !important;
      z-index: 100 !important;
    }

    .row,
    .sticky {
      display: flex;
      align-items: center;
      background-color: white;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
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

const TABLEDIV = styled.div<{clickable?: boolean, backgroundColor?: String}&SharedStyleTypes|SizerTypes>`
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
  containerHeight?: number,
  defaultSort?: { id: string, desc: boolean },
  pagination?: boolean,
  onSelectRow?:any, 
  sortDirectionDivRef?: any, 
  currentColumnsDivRef?: any,
  onChangeSortOrColumns?: any,
  initialScrollIndex?: number
} & SharedStyleTypes>;

export function HeadlessTable({ 
  columns, data, containerHeight=400, pagination=false, defaultSort,
  onSelectRow, sortDirectionDivRef, currentColumnsDivRef,
  onChangeSortOrColumns, initialScrollIndex=0
}: HeadlessTableProps) {
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
    rows,
    totalColumnsWidth,
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
  const [selectedRowIndex, setSelectedRowIndex] = useState(null)
  const [hover, setHover] = useState({}) //for pagination hover

  useEffect(() => {
    onSelectRow(selectedRowIndex)
  }, [selectedRowIndex])

  useEffect(() => {
    setCurrentColumns(visibleColumns.map((c: any) => c.id))
  }, [visibleColumns])

  useEffect(() => {
    onChangeSortOrColumns(sortDirection, currentColumns)
  }, [sortDirection, currentColumns])

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

  const iconProps = {
    width: '10px',
    fill: getColor('primary100')
  }

  const iconStyle = (up: boolean) => {
    return {
      verticalAlign: 'middle', 
      transitionDuration: '.3s', 
      transform: 'rotate(' + ( up ? 0 : 180 ) + 'deg)',
      marginLeft: '5px'
    }
  }

  const tableRef = useRef(null)

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])

  const RenderDivRow = ({ index, style }) => {
    const row = rows[index]
    prepareRow(row)
    return (
      <DivRow row={row} index={index} style={style}></DivRow>
    )
  }

  const DivRow = ({ row, index, style }) => {
    const [isHover, setIsHover] = useState(false)

    return (
      <div {...row.getRowProps({
        style: {
          ...style,
          position: "absolute",
          width: totalColumnsWidth + scrollBarSize,
        }
      })} className="tr" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}> 
        {row.cells.map((cell: any, c: any) => {
          if(cell.column.isRowId) {
            return (
              <DivCell row={row} cell={cell} c={c} index={index} selectedRowIndex={selectedRowIndex} setSelectedRowIndex={setSelectedRowIndex} isHover={isHover} />
            )
          }

          return <DivCell row={row} cell={cell} c={c} index={index} selectedRowIndex={selectedRowIndex} setSelectedRowIndex={setSelectedRowIndex} isHover={isHover} />
        })}
      </div>
    )
  }

  const DivCell = ({ row, cell, c, index, selectedRowIndex, setSelectedRowIndex, isHover }) => {
    const [isHoverCell, setIsHoverCell] = useState(false)

    if(cell.column.isRowId) {
      return (
        <TABLEDIV {...cell.getCellProps()} className="td" key={c} {...cell.getCellProps()} width={cell.column.width} backgroundColor={index === selectedRowIndex ? '#F4F7FF' : '#fff' }>
          {isHover || index === selectedRowIndex ?
            <div onClick={() => setSelectedRowIndex(index)}>
              <Button secondary size="tiny">&#65291;</Button>
            </div> 
          : null}
        </TABLEDIV>
      )
    }

    return (
      <TABLEDIV {...cell.getCellProps()} 
        className="td" key={c} {...cell.getCellProps()} 
        width={cell.column.width} 
        backgroundColor={index === selectedRowIndex ? '#F4F7FF' : '#fff' }
        onMouseEnter={() => setIsHoverCell(true)}
        onMouseLeave={() => setIsHoverCell(false)}
      >
        {cell.render('Cell')}
        {cell.column.hasTooltip && isHoverCell ? cell.column.tooltipContent(row.original) : null}
      </TABLEDIV>
    )
  }

  const StickyListContext = createContext()
  StickyListContext.displayName = "StickyListContext"

  const ItemWrapper = ({ data, index, style }) => {
    const { ItemRenderer, stickyIndices } = data
    if (stickyIndices && stickyIndices.includes(index)) {
      return null
    }
    return <ItemRenderer index={index} style={style} />
  }

  const StickyRow = ({ index, style }) => (
    <div className="row sticky" style={style}>
      {headerGroups.map((headerGroup: any, h: any) => (
        <div key={h} {...headerGroup.getHeaderGroupProps()} className="tr">
          {headerGroup.headers.map((column: any, i: any) => (
            <div key={i} {...column.getHeaderProps(column.getSortByToggleProps())}
              data-column-index={i}
              draggable={column.noDrag ? false : true}
              onDragStart={column.noDrag ? undefined : onDragStart}
              onDragOver={e => {
                e.preventDefault()
              }}
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
                    ? <UpArrowIcon {...iconProps} style={iconStyle(false)} />
                    : <UpArrowIcon {...iconProps} style={iconStyle(true)} />
                  : ''}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  const innerElementType = forwardRef(({ children, ...rest }, ref) => {
    let style = {...rest.style}
    style.width = totalColumnsWidth + scrollBarSize
    let props = {...rest}
    delete props.style

    return (
      <StickyListContext.Consumer>
        {({ stickyIndices }) => (
          <div ref={ref} style={style} {...props}>
            {stickyIndices.map(index => (
              <StickyRow
                index={index}
                key={index}
                style={{ top: index * 60, left: 0, width: "100%", height: '60px' }}
              />
            ))}
    
            {children}
          </div>
        )}
      </StickyListContext.Consumer>
    )
  });

  const listRef = React.createRef()
  useEffect(() => {
    const tableDiv = document.getElementsByClassName('headless-table-list')[0]
    const leftScroll = leftScrollRef.current.innerText
    if(listRef) {
      if(selectedRowIndex) {
        listRef.current.scrollToItem(selectedRowIndex, 'smart')
        tableDiv.scroll(leftScroll, 0)
      }else if(initialScrollIndex) {
        listRef.current.scrollToItem(initialScrollIndex, 'smart')
        tableDiv.scroll(leftScroll, 0)
      }
    }
  }, [listRef, selectedRowIndex, initialScrollIndex])

  const listContainerRef = useRef()
  const leftScrollRef = useRef(null)
  useEffect(() => {
    function handleListScroll(e) {
      if(listContainerRef.current.scrollLeft) {
        leftScrollRef.current.innerText = listContainerRef.current.scrollLeft
      }
    }

    listContainerRef.current.addEventListener("scroll", handleListScroll)
    return function cleanup() {
      listContainerRef.current.removeEventListener("scroll", handleListScroll)
    }
  });

  const StickyList = ({ children, stickyIndices, ...rest }) => (
    <StickyListContext.Provider value={{ ItemRenderer: children, stickyIndices }}>
      <List 
        itemData={{ ItemRenderer: children, stickyIndices }}
        ref={listRef}
        outerRef={listContainerRef}
        className="headless-table-list"
        {...rest}
      >
        {ItemWrapper}
      </List>
    </StickyListContext.Provider>
  )

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
        
        <div ref={leftScrollRef} style={{ display: 'none' }}>0</div>
        {sortDirectionDivRef && <div ref={sortDirectionDivRef} style={{ display: 'none' }}>{JSON.stringify(sortDirection)}</div>}
        {currentColumnsDivRef && <div ref={currentColumnsDivRef} style={{ display: 'none' }}>{JSON.stringify(currentColumns)}</div>}
        {pagination ? 
          <table ref={tableRef} {...getTableProps()} className="react-table react-table-sticky">
            <thead className="header">
              {headerGroups.map((headerGroup: any, h: any) => (
                <tr key={h} {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column: any, i: any) => (
                    <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}
                      data-column-index={i}
                      draggable={column.noDrag ? false : true}
                      onDragStart={column.noDrag ? undefined : onDragStart}
                      onDragOver={e => {
                        e.preventDefault()
                        /* const draggable = e.currentTarget.getAttribute('draggable')
                        if(draggable === 'false') {
                          _.throttle(() => {
                            //@ts-ignore
                            tableRef.current.parentNode.scroll(tableRef.current.getBoundingClientRect().x + 1, tableRef.current.getBoundingClientRect().y)
                          }, 1000, { 'trailing': true })
                        } */
                      }}
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
                            ? <UpArrowIcon {...iconProps} style={iconStyle(false)} />
                            : <UpArrowIcon {...iconProps} style={iconStyle(true)} />
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
                  <tr key={r} {...row.getRowProps()} onMouseEnter={() => setHover(row.original)} onMouseLeave={() => setHover({})}>
                    {row.cells.map((cell: any, c: any) => {
                      if(cell.column.isRowId) {
                        return (
                          <TD key={c} {...cell.getCellProps()} className="td" width={cell.column.width} backgroundColor={r === selectedRowIndex ? '#F4F7FF' : '#fff' }>
                            {hover === row.original || r === selectedRowIndex ?
                              <div onClick={() => setSelectedRowIndex(r)}>
                                <Button secondary size="tiny">&#65291;</Button>
                              </div> 
                            : null}
                          </TD>
                        )
                      }

                      return (
                        <TD key={c} {...cell.getCellProps()} className="td" width={cell.column.width} backgroundColor={r === selectedRowIndex ? '#F4F7FF' : '#fff' }>
                          {cell.render('Cell')}
                        </TD>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        : 
          <div ref={tableRef} {...getTableProps()} className="react-table react-table-sticky" style={{ overflow: 'hidden'}}>
            <div {...getTableBodyProps()} className="body"> 
              <StickyList
                height={containerHeight}
                innerElementType={innerElementType}
                itemCount={rows.length}
                itemSize={70}
                stickyIndices={[0]}
              >
                {RenderDivRow}
              </StickyList>
            </div>
          </div>
        }
        {pagination ? 
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
        : null}
      </>
    </Styles>
  )
}