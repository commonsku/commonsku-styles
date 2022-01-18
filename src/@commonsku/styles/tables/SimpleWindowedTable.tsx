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
import { colors } from '../Theme';
import { DownArrowIcon, UpArrowIcon, UpDownArrowsIcon } from '../icons';
import scrollbarWidth from './scrollbarWidth';
import { getThemeColor } from '..';

export const SimpleWindowedTableStyles = styled.div<{
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

  .header.tr {
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
    `.tr:not(.header.tr):hover {
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
    className?: string;
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
    className='',
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
    const rowsRef = useRef<HTMLDivElement | HTMLSpanElement>();

    const onListScroll = (e: Event) => {
        if (headerRef.current && e && e.target) {
            const target = e.target as HTMLDivElement | HTMLSpanElement;
            headerRef.current.scrollLeft = target.scrollLeft;
        }
    };

    useLayoutEffect(() => {
        rowsRef.current && rowsRef.current.addEventListener('scroll', onListScroll);
        return () => {
            rowsRef.current && rowsRef.current.removeEventListener('scroll', onListScroll);
        };
    }, [rowsRef]);

    const RenderRow = React.useCallback(
        ({ index, style }) => {
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
                                className={`td ${cellProps.className || ''}`}>{cell.render("Cell")}</div>
                        );
                    })}
                </div>
            );
        },
        [prepareRow, rows, onClickRow]
    );

    const getHeaderProps = (column: BaseSortByHeaderGroup<object>) => {
        const headerProps = column.getHeaderProps({
            ...column.getSortByToggleProps(),
            ...(column.containerProps || {}),
        });
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

    const getHeaderGroupProps = (headerGroup: SortByHeaderGroup<object>) => {
        const headerGroupProps = headerGroup.getHeaderGroupProps({
            ...(headerGroup.containerProps || {}),
        });
        const headerStyles = {
            ...(headerGroupProps.style || {}),
            ...(headerGroup.style || {}),
        };
        const headerClassNames = [
            'header tr',
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
                    <div {...getHeaderGroupProps(headerGroup)} className="header tr" ref={headerRef}>
                        {headerGroup.headers.map((column) => (
                            <div {...getHeaderProps(column)}>
                                {column.render("Header")}
                                {column.canSort ? <span style={{ display: 'inline-block', paddingLeft: 5, verticalAlign: 'text-top' }}>
                                    {column.isSorted ? (
                                        column.isSortedDesc ? <DownArrowIcon width="15px" /> : <UpArrowIcon width="15px" />
                                    ) : <UpDownArrowsIcon width="15px" />}
                                </span> : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div {...getTableBodyProps()}>
                <FixedSizeList
                    height={height}
                    itemCount={rows.length}
                    itemSize={itemSize}
                    width={totalColumnsWidth + scrollBarSize}
                    className="table-list-rows"
                    outerRef={rowsRef}
                    onScroll={onScroll}
                >{RenderRow}</FixedSizeList>
            </div>
        </div>
    );
}

export default SimpleWindowedTable;
