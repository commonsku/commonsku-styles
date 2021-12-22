import styled from 'styled-components';
import React, { useRef, useLayoutEffect } from 'react';
import {
    useTable,
    useSortBy,
    useFlexLayout,
    SortingRule,
    Column,
} from 'react-table';
import { FixedSizeList, ListOnScrollProps } from 'react-window';
import { SortByTableInstance, SortByTableOptions } from './types';
import { colors } from '../Theme';
import { DownArrowIcon, UpArrowIcon, UpDownArrowsIcon } from '../icons';
import scrollbarWidth from './scrollbarWidth';

export const SimpleWindowedTableStyles = styled.div<{ rowClickable?: boolean; }>`
padding: 1rem;

.project-table-list-rows {
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
    onClickRow?: (row?: object) => void;
    onScroll?: ((props: ListOnScrollProps) => any);
    onUpdateData?: (...args: any) => void;
    useTableProps?: object;
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
                        return (
                            <div
                                onClick={() => onClickRow ? onClickRow(cell.row.original) : null}
                                {...cell.getCellProps()}
                                className="td">{cell.render("Cell")}</div>
                        );
                    })}
                </div>
            );
        },
        [prepareRow, rows, onClickRow]
    );

    return (
        <div {...getTableProps()} className="table">
            <div className="header-wrapper">
                {headerGroups.map((headerGroup) => (
                    <div {...headerGroup.getHeaderGroupProps()} className="header tr" ref={headerRef}>
                        {headerGroup.headers.map((column) => (
                            <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                                {column.render("Header")}
                                <span style={{ display: 'inline-block', paddingLeft: 5, verticalAlign: 'text-top' }}>
                                    {column.isSorted ? (
                                        column.isSortedDesc ? <DownArrowIcon width="15px" /> : <UpArrowIcon width="15px" />
                                    ) : <UpDownArrowsIcon width="15px" />}
                                </span>
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
                    className="project-table-list-rows"
                    outerRef={rowsRef}
                    onScroll={onScroll}
                >{RenderRow}</FixedSizeList>
            </div>
        </div>
    );
}

export default SimpleWindowedTable;
