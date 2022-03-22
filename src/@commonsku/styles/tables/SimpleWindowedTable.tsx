import styled, { css, CSSObject } from 'styled-components';
import React, { useRef, useLayoutEffect } from 'react';
import {
    useTable,
    useSortBy,
    useFlexLayout,
    SortingRule,
    Column,
} from 'react-table';
import { FixedSizeList, ListOnScrollProps } from 'react-window';
import { BaseSortByHeaderGroup, SortByHeaderGroup, SortByTableInstance, SortByTableOptions } from './types';
import { colors, getThemeColor } from '../Theme';
import { FilledChevronIcon, UpDownArrowsIcon } from '../icons';
import scrollbarWidth from './scrollbarWidth';

export const SimpleWindowedTableStyles = styled.div<{
    bordered?: boolean | string;
    rowClickable?: boolean;
    hoverRowBg?: string | boolean;
    selectedRowIndex?: number;
    selectedRowStyle?: boolean | CSSObject; // if true, then set bg same as hoverRowBg
}>`
padding: 1rem;

.table-list-rows {
  width: 100% !important;

  ${p => p.rowClickable ? `
    .tr {
      cursor: pointer;
    }
  ` : ''}
}

.table {
  display: inline-block;
  border-spacing: 0;
  width: 100%;
  min-width: 100% !important;

  ${p => p.bordered ?
        `border: ${typeof p.bordered === 'string'
            ? p.bordered
            : `1px solid ${getThemeColor(p, 'tableBorder', '#edf2f5')}`};`
    : ''}

  .header.tr, .table-footer.tr {
    width: 100% !important;
    min-width: 100% !important;
    overflow-x: hidden;
  }

  .tr {
    :last-child {
      .td {
        border-bottom: 0;
      }
    }
  }

  .th {
    border-bottom: 2px solid ${colors.disabledButtonBorder};

    div {
      display: inline-block;
    }
  }

  .td {
    border-bottom: 1px solid ${colors.disabledButtonBorder};
  }

  /* set hover styles */
  ${p => p.hoverRowBg ?
    `.tr:not(.header.tr, .table-footer.tr):hover {
        background: ${typeof p.hoverRowBg === 'string'
            ? p.hoverRowBg
            : getThemeColor(p, 'tableHeaderBg', '#F6FEFF')
        };
    }` : ''}

    /* row selected => if selectedRowStyle === true then set background color else set given styles */
    ${p => p.selectedRowIndex && p.selectedRowStyle ?
        `.tr:nth-child(${p.selectedRowIndex}) {
            ${typeof p.selectedRowStyle === 'boolean'
                ? `background: ${getThemeColor(p, 'tableHeaderBg', '#F6FEFF')};`
                : css(p.selectedRowStyle)
            }
        }` : ''}

  .th,
  .td {
    margin: 0;
    padding: 0.5rem;
  }
}
`;

export type SimpleWindowedTableProps = {
    columns: Column<object>[];
    data: object[];
    itemSize?: number;
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
    NoRowsFound?: (props: React.PropsWithChildren<{ [key: string]: any }>) => React.ReactElement;
};

function SimpleWindowedTable({
    columns,
    data,
    itemSize=80,
    height=500,
    minWidth = 140,
    maxWidth = 500,
    defaultSort,
    onClickRow,
    onScroll,
    onUpdateData,
    useTableProps={},
    tableHeaderProps={},
    tableFooterProps={},
    hideFooter=true,
    className='',
    NoRowsFound,
}: SimpleWindowedTableProps) {
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: minWidth,
            maxWidth: maxWidth,
        }),
        [minWidth, maxWidth]
    );

    const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        totalColumnsWidth,
        prepareRow,
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
        } as SortByTableOptions,
        useSortBy,
        useFlexLayout
    ) as SortByTableInstance;
    const headerRef = useRef<HTMLDivElement | null>(null);
    const footerRef = useRef<HTMLDivElement | null>(null);
    const rowsRef = useRef<HTMLDivElement | HTMLSpanElement>();

    const onListScroll = (e: Event) => {
        if (headerRef.current && e && e.target) {
            const target = e.target as HTMLDivElement | HTMLSpanElement;
            headerRef.current.scrollLeft = target.scrollLeft;
        }

        if (footerRef.current && e && e.target) {
            const target = e.target as HTMLDivElement | HTMLSpanElement;
            footerRef.current.scrollLeft = target.scrollLeft;
        }
    };

    useLayoutEffect(() => {
        rowsRef.current && rowsRef.current.addEventListener('scroll', onListScroll);
        return () => {
            rowsRef.current && rowsRef.current.removeEventListener('scroll', onListScroll);
        };
    }, [rowsRef]);

    const RenderRow = React.useCallback(
        ({ index, isScrolling, style }) => {
            const row = rows[index];
            prepareRow(row);
            return (
                <div
                    {...row.getRowProps({
                        style
                    })}
                    className="tr"
                >
                    {row.cells.map((cell) => {
                        const cellProps = cell.getCellProps();
                        return (
                            <div
                                {...cellProps}
                                onClick={() => onClickRow ? onClickRow(cell.row.original, index) : null}
                                className={`td ${cellProps.className || ''}`}
                            >{cell.render("Cell", { isScrolling })}</div>
                        );
                    })}
                </div>
            );
        },
        [prepareRow, rows, onClickRow]
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

    const getHeaderGroupProps = (headerGroup: SortByHeaderGroup<object>, isFooter=false) => {
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
            <div {...tableHeaderProps}
                className={`header-wrapper ${tableHeaderProps.className || ''}`}
            >
                {headerGroups.map((headerGroup) => (
                    <div {...getHeaderGroupProps(headerGroup, false)} className="header tr" ref={headerRef}>
                        {headerGroup.headers.map((column) => (
                            <div {...getHeaderProps(column, false)}>
                                {column.render("Header")}
                                {column.canSort ? <span style={{ display: 'inline-block', paddingLeft: 5, verticalAlign: 'text-top' }}>
                                    {column.isSorted ? (
                                        column.isSortedDesc ? <FilledChevronIcon direction="down" width="15px" /> : <FilledChevronIcon direction="up" width="15px" />
                                    ) : <UpDownArrowsIcon width="15px" />}
                                </span> : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div {...getTableBodyProps()}>
                {rows.length === 0 && NoRowsFound ? <NoRowsFound /> :<FixedSizeList
                    height={height}
                    itemCount={rows.length}
                    itemSize={itemSize}
                    width={totalColumnsWidth + scrollBarSize}
                    className="table-list-rows"
                    outerRef={rowsRef}
                    onScroll={onScroll}
                    useIsScrolling
                >{RenderRow}</FixedSizeList>}
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

export default SimpleWindowedTable;
