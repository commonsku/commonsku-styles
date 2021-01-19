//@ts-nocheck
import React, { 
  memo, useRef, useState, useEffect, useCallback, useLayoutEffect, createContext, forwardRef, useMemo 
} from 'react';
import { partial } from 'lodash';
import styled from 'styled-components'
import { SizerCss, SizerTypes } from './Sizer';
import { useTable, useSortBy, useBlockLayout, usePagination, useColumnOrder } from 'react-table'
import { useSticky } from 'react-table-sticky';
import { FixedSizeList as List, areEqual } from 'react-window';
import verticalScrollbarWidth from './verticalScrollbarWidth';

import { SharedStyles, SharedStyleTypes } from './SharedStyles'
import { Button } from './Button'
import { UpArrowIcon } from './icons';
import { getColor } from './Theme';
import { document } from '../utils';

const PADDING_SIZE = 60

const Styles = styled.div<{minHeight?: number, pagination?: boolean}>`
  overflow-x: ${props => props.pagination ? 'scroll' : 'hidden'};
  min-height: ${props => props.minHeight ? props.minHeight : "600"}px;
  /* -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  .headless-table-list::-webkit-scrollbar {
    display: none;
  } */

  .th,
  .td {
    padding: 5px;
    background-color: #fff;
    overflow: hidden;
    border: none !important;
    text-align: center;
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
  .react-table-wrapper {
    margin-top: 15px;
    position: absolute;
    text-align: center;
    width: 100%;
    left: 0;
  }
  .react-table-pagination {
    padding: 0.5rem;
    margin: auto;
    button {
      font-family: 'skufont-regular', sans-serif;
      font-size: 18px;
      padding: 5px 15px;
      border-radius: 4px;
      background: transparent; 
      text-align: center;
      border: 2px solid #02c0da;
      color: #02c0da;
      cursor: pointer;
    }
    button:hover {
      color: #02c0da;
      background: #E6EFF2;
    }
    button:focus {
      border: 2px solid #02c0da;
      outline-color: #02c0da;
    }
    input {
      border: 1px solid #ABC7D1;
      border-radius: 5px;
      font-family: 'skufont-regular', sans-serif;
      font-size: 18px;
      padding: 5px 15px;
      color: #52585c;
      background-color: white;
      width: 40px;
      text-align: center;
      margin-right: 5px;
    }
    input:focus{
      border: 2px solid #02c0da;
      outline-color: #02c0da;
    }
    .page-select {
      margin: 0 20px;
    }
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
  rowIdField: string,
  selectedRowId?: string | null,
  defaultSort?: { id: string, desc: boolean },
  defaultPageSize?: number,
  defaultPageIndex?: number,
  defaultScrollOffset?: number,
  defaultHorizontalOffset ?: number,
  scrollOffsetDivRef?: any,
  horizontalOffsetDivRef?: any,
  pageIndexDivRef?:any,
  onChangeSelected?:any,
  onChangeSortOrColumns?: any,
  sortDirectionDivRef?: any, 
  currentColumnsDivRef?: any,
  minHeight?: any,
  pagination?: boolean
} & SharedStyleTypes>;

const StickyListContext = createContext({});
StickyListContext.displayName = "StickyListContext"

const DivCell = ({ row, cell, rowIdField, selectedId, onSelectRow, isHoverRow }) => {
  const [isHover, setIsHover] = useState(false);
  const backgroundColor = (row.original[rowIdField] === selectedId) ? '#F4F7FF' : '#FFF';

  return <TABLEDIV
    className="td" {...cell.getCellProps()} 
    width={cell.column.width} 
    backgroundColor={backgroundColor}
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
  >
    {cell.column.isRowId 
    ? ((isHoverRow || isHover || (row.original[rowIdField] === selectedId)) && <div 
      onClick={() => onSelectRow(row.original[rowIdField] !== selectedId ? row.original[rowIdField] : null)}>
      <Button secondary size="tiny">&#65291;</Button>
    </div>)
    : <>
      {cell.render('Cell')}
      {cell.column.hasTooltip && isHover && cell.column.tooltipContent(row.original)}
    </>}
  </TABLEDIV>
}

const RenderDivRow = memo(({ data, index, style }) => {
  const [isHover, setIsHover] = useState(false);
  const row = data[index];
  return <StickyListContext.Consumer>
    {({ width, prepareRow, rowIdField, selectedId, onSelectRow }) => {
      prepareRow(row);
      return <div 
        {...row.getRowProps({
          style: {
            ...style,
            position: "absolute",
            width,
            top: `${parseFloat(style.top) + PADDING_SIZE}px`,
          }
        })} 
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="tr"
      > 
        {row.cells.map((cell: any, c: any) => {
          return <DivCell key={c} row={row} cell={cell} c={c} 
            rowIdField={rowIdField} selectedId={selectedId} onSelectRow={onSelectRow} isHoverRow={isHover}
          />
        })}
      </div>
    }}
  </StickyListContext.Consumer>
}, areEqual);

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

const StickyRow = ({ style, headerGroups, onColumnClick, onDragStart, onDrop }) => (
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
              onColumnClick(column);
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

const StickyContainer = forwardRef(({ children, style, ...props }, ref) => {
  return <StickyListContext.Consumer>
    {({ stickyIndices, width, onHeaderColumnClick, headerGroups, onDragStart, onDrop }) => (
      <div ref={ref} 
        style={{
          ...style,
          width, height: `${parseFloat(style.height) + PADDING_SIZE * 2}px`,
        }} 
        {...props}
      >
        {stickyIndices.map(index => (
          <StickyRow key={index}
            style={{ top: index * 60, left: 0, width: "100%", height: '60px' }}
            headerGroups={headerGroups}
            onColumnClick={onHeaderColumnClick}
            onDragStart={onDragStart} onDrop={onDrop}
          />
        ))}
        {children}
      </div>
    )}
  </StickyListContext.Consumer>
});

const StickyList = ({ 
  children, itemData, rowIdField, selectedId, onSelectRow, headerGroups, onDragStart, onDrop,
  prepareRow, stickyIndices, width, onHeaderColumnClick, ...rest 
}) => {
  return <StickyListContext.Provider value={{ 
    stickyIndices, onHeaderColumnClick, width, rowIdField, selectedId, onSelectRow, prepareRow, headerGroups, 
    onDragStart, onDrop
  }}>
    <List itemData={itemData} className="headless-table-list" {...rest}>
      {children}
    </List>
  </StickyListContext.Provider>
}

export function HeadlessTable({ 
  columns, data, rowIdField, defaultSort, defaultPageSize=200, defaultPageIndex=0, defaultScrollOffset=0, defaultHorizontalOffset=0,
  pageIndexDivRef, onChangeSelected, onChangeSortOrColumns, scrollOffsetDivRef, horizontalOffsetDivRef, selectedRowId,
  sortDirectionDivRef, currentColumnsDivRef, minHeight, pagination=true
}: HeadlessTableProps) {
  //@ts-ignore
  const initialState: any = { 
    pageIndex: defaultPageIndex, 
    pageSize: defaultPageSize
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
    state: { pageIndex },
  } = table

  const [sortDirection, _setSortDirection] = useState(defaultSort ? { accessor: defaultSort.id, direction: defaultSort.desc ? 'DESC' : 'ASC' } : {})
  const [currentColumns, _setCurrentColumns] = useState(visibleColumns.map((c: any) => c.id))
  const [hoverId, setHoverId] = useState(null)
  const [selectedId, _setSelectedId] = useState(selectedRowId)
  const [scrollbarWidth, setScrollbarWidth] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(defaultScrollOffset)
  const [horizontalOffset, setHorizontalOffset] = useState(defaultHorizontalOffset)
  const setSelectedId = (selectedId) => {
    _setSelectedId(selectedId);
    onChangeSelected(selectedId)
  };

  const setSortDirection = (sortDirection) => {
    _setSortDirection(sortDirection);
    onChangeSortOrColumns(sortDirection, currentColumns);
  };

  const setCurrentColumns = (currentColumns) => {
    _setCurrentColumns(currentColumns);
    onChangeSortOrColumns(sortDirection, currentColumns);
  };

  useEffect(() => {
    setSelectedId(selectedRowId);
  }, [selectedRowId]);

  useEffect(() => {
    if(defaultScrollOffset !== 0) {
      setScrollOffset(defaultScrollOffset)
    }
  }, [defaultScrollOffset])

  useEffect(() => {
    if(defaultHorizontalOffset !== 0) {
      setHorizontalOffset(defaultHorizontalOffset)
    }
  }, [defaultHorizontalOffset])

  useEffect(() => {
    if(defaultSort) {
      _setSortDirection({ accessor: defaultSort.id, direction: defaultSort.desc ? 'DESC' : 'ASC' });
    }else{
      _setSortDirection({});
    }
  }, [defaultSort])

  useEffect(() => {
    _setCurrentColumns(visibleColumns.map((c: any) => c.id))
  }, [visibleColumns])

  let columnBeingDragged: any = null;

  const onDragStart = (e: any) => {
    columnBeingDragged = e.target.dataset.columnIndex;
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    const newPosition = e.target.dataset.columnIndex;
    if(newPosition) {
      const currentCols = visibleColumns.map((c: any) => c.id);
      const colToBeMoved = currentCols.splice(columnBeingDragged, 1);
      currentCols.splice(newPosition, 0, colToBeMoved[0]);
      setCurrentColumns(currentCols);
      setColumnOrder(currentCols);
    }
  };

  const tableRef = useRef(null);
  const listContainerRef = useRef(null);

  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollLeft = horizontalOffset;
    }
  }, [listContainerRef, horizontalOffset, rows])

  //Extra horizontal scrollbar on the bottom of the page
  const topScrollRef = useRef(null)

  //Method for syncing horizontal scrollbar movements when we need one at the bottom of the page
  const handleHorizontalScroll = useCallback(
    placement => {
      let scrollNode = listContainerRef.current
      if (pagination) {
        scrollNode = tableRef.current?.parentNode
      }

      if(placement === 'top') {
        scrollNode.scrollLeft = topScrollRef.current.scrollLeft
        return
      }

      if(placement === 'bottom' && topScrollRef.current) {
        topScrollRef.current.scrollLeft = scrollNode.scrollLeft
        return
      }
    },
    [listContainerRef, tableRef, pagination]
  );

  useEffect(() => {
    const ref = topScrollRef.current;
    const handleHorizontalScrollTop = partial(handleHorizontalScroll, 'top');
    if(ref) {
      ref.addEventListener('scroll', handleHorizontalScrollTop);
    
      return () => ref.removeEventListener('scroll', handleHorizontalScrollTop);
    }
  }, [topScrollRef, handleHorizontalScroll])

  useEffect(() => {
    const ref = tableRef.current;
    if(pagination) {
      if(ref) {
        setScrollbarWidth(ref.offsetWidth + 200)
      }
    }else{
      if(listContainerRef) {
        setScrollbarWidth(listContainerRef.current.firstChild.offsetWidth + 200)
      }
    }
  }, [tableRef, listContainerRef, pagination])

  useEffect(() => {
    if(pagination) {
      if(tableRef) {
        setScrollbarWidth(tableRef.current.offsetWidth + 200)
      }
    }else{
      if(listContainerRef) {
        setScrollbarWidth(listContainerRef.current.firstChild.offsetWidth + 200)
      }
    }
  }, [columns, pagination])

  useLayoutEffect(() => {
    const ref = tableRef.current;
    const handleHorizontalScrollBottom = partial(handleHorizontalScroll, 'bottom');
    if(ref) {
      ref.parentNode.addEventListener('scroll', handleHorizontalScrollBottom);
    
      return () => ref.parentNode.removeEventListener('scroll', handleHorizontalScrollBottom)
    }
  }, [tableRef, handleHorizontalScroll])

  useEffect(() => {
    const listScroll = (e) => { 
      if(e.target.className === 'headless-table-list') {
        //handleHorizontalScroll('bottom')
        if(horizontalOffsetDivRef && listContainerRef.current && listContainerRef.current.scrollLeft !== 0) {
          horizontalOffsetDivRef.current.innerText = listContainerRef.current.scrollLeft
        }
      }
    }

    if(listContainerRef) {
      document.addEventListener('scroll', listScroll, true)
    
      return () => document.removeEventListener('scroll', listScroll)
    }
  }, [listContainerRef, horizontalOffsetDivRef])


  //infinite scroll
  const scrollBarSize = useMemo(() => verticalScrollbarWidth(), [])
  return (
    <Styles minHeight={minHeight}>
      <>
        {pagination ?
          <div ref={topScrollRef} style={{ 
            position:'fixed', height: '20px', 
            width: '100%', bottom: 0, zIndex: 100,
            overflowX: 'scroll', overflowY: 'hidden' 
          }}>
            <div style={{ height: '20px', width: scrollbarWidth }}></div>
          </div>
        : null}
        {horizontalOffsetDivRef && <div ref={horizontalOffsetDivRef} style={{ display: 'none' }}>0</div>}
        {scrollOffsetDivRef && <div ref={scrollOffsetDivRef} style={{ display: 'none' }}>0</div>}
        {pageIndexDivRef && <div ref={pageIndexDivRef} style={{ display: 'none' }}>{pageIndex}</div>}
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
                  <tr key={r} {...row.getRowProps()} onMouseEnter={() => setHoverId(row.original[rowIdField])} onMouseLeave={() => setHoverId(null)}>
                    {row.cells.map((cell: any, c: any) => {
                      if(cell.column.isRowId) {
                        return (
                          <TD key={c} {...cell.getCellProps()} className="td" width={cell.column.width} backgroundColor={row.original[rowIdField] === selectedId ? '#F4F7FF' : '#fff' }>
                            {(hoverId === row.original[rowIdField]) || (row.original[rowIdField] === selectedId) ?
                              <div onClick={() => row.original[rowIdField] !== selectedId ? setSelectedId(row.original[rowIdField]) : setSelectedId(null)}>
                                <Button secondary size="tiny">&#65291;</Button>
                              </div> 
                            : null}
                          </TD>
                        )
                      }

                      return (
                        <TD key={c} {...cell.getCellProps()} className="td" width={cell.column.width} backgroundColor={row.original[rowIdField] === selectedId ? '#F4F7FF' : '#fff' }>
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
                width={totalColumnsWidth + scrollBarSize}
                height={minHeight}
                innerElementType={StickyContainer}
                itemCount={rows.length}
                itemSize={70}
                itemData={rows}
                headerGroups={headerGroups}
                rowIdField={rowIdField}
                selectedId={selectedId}
                prepareRow={prepareRow}
                onSelectRow={(id) => {
                  setScrollOffset(parseInt(scrollOffsetDivRef.current.innerText) || 0);
                  setSelectedId(id);
                }}
                stickyIndices={[0]} //sticky header
                outerRef={listContainerRef}
                initialScrollOffset={scrollOffset}
                onScroll={({ scrollOffset, }) => {
                  if(scrollOffset !== 0) {
                    scrollOffsetDivRef.current.innerText = scrollOffset
                  }
                }}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onHeaderColumnClick={(column) => {
                  let sortDirectionState = {};
                  if (column.isSorted) {
                    if (column.isSortedDesc) {
                      column.clearSortBy();
                    } else {
                      column.toggleSortBy(true);
                      sortDirectionState = { accessor: column.id, direction: 'DESC' };
                    }
                  } else {
                    column.toggleSortBy(false);
                    sortDirectionState = { accessor: column.id, direction: 'ASC' };
                  }
                  setSortDirection(sortDirectionState);
                  setHorizontalOffset(horizontalOffsetDivRef.current.innerText);
                  if(listContainerRef.current) {
                    listContainerRef.current.scrollLeft = horizontalOffset
                  }
                }}
              >
                {RenderDivRow}
              </StickyList>
            </div>
          </div>
        }
        {pagination && pageOptions.length > 1 ?
          <div className="react-table-wrapper">
            <div className="react-table-pagination">
              <button style={{opacity: pageIndex === 0 ? 0 : 1}} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'◀◀'}
              </button>{' '}
              <button style={{opacity: pageIndex === 0 ? 0 : 1}} onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'◀'}
              </button>{' '}
              <span className="page-select">
                  <input
                    defaultValue={pageIndex + 1}
                    value={pageIndex + 1}
                    onChange={(e: any) => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0
                      gotoPage(page)
                    }}
                  />
                  of {pageOptions.length}
              </span>
              <button style={{opacity: !canNextPage ? 0 : 1}} onClick={() => nextPage()} disabled={!canNextPage}>
                {'▶'}
              </button>{' '}
              <button style={{opacity: !canNextPage ? 0 : 1}} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'▶▶'}
              </button>{' '}
              {/* <select
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
                </select> */}
            </div>
          </div>
        : null}
      </>
    </Styles>
  )
}
