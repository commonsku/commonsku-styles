import React, { useCallback, useEffect, useMemo, useState } from 'react';
import VirtualTable, { VirtualTableProps } from './VirtualTable';
import { Column, CellProps } from 'react-table';
import { LabeledCheckbox } from '../Input';

export type SelectionTableProps<
    RowType extends Record<string, unknown> & { selected?: boolean },
    TableProps,
    TableFooterProps,
> = VirtualTableProps<RowType, TableProps, TableFooterProps> & {
    data: RowType[];
    onSelectRow?: (row: RowType, index: number) => void;
    onSelectionChange?: (selectedRows: RowType[]) => void;
}

type SelectionState = 'none' | 'indeterminate' | 'all';

const SelectionTable = <
    RowType extends Record<string, unknown> & { selected?: boolean },
    TableProps,
    TableFooterProps,
> (props: SelectionTableProps<RowType, TableProps, TableFooterProps>) => {
    const { columns, onSelectRow, onSelectionChange } = props;

    const [data, setData] = useState<RowType[]>(
        props.data.map((row: RowType) => ({
            selected: false,
            ...row,
        })
    ));

    useEffect(() => {
        if (onSelectionChange != null) {
            onSelectionChange(data.filter(row => row.selected));
        }
    }, [data, onSelectionChange]);

    const selectionState: SelectionState = useMemo(() =>
        !data.some(row => row.selected === false)
            ? 'all'
            : data.some(row => row.selected === true)
                ? 'indeterminate'
                : 'none',
        [data]
    );

    const handleSelectHeader = useCallback(() => {
        switch (selectionState) {
            case 'none':
                setData(data.map(row => ({
                    ...row,
                    selected: true,
                })));
                break;
            case 'all':
            case 'indeterminate':
                setData(data.map(row => ({
                    ...row,
                    selected: false,
                })));
                break;
        }
    }, [data, selectionState]);

    const handleSelectRow = useCallback((rowIndex: number) => {
        setData(prev => prev.map((row, index) => {
            if (rowIndex !== index) return row;

            if (onSelectRow != null) {
                onSelectRow(row, rowIndex);
            }

            return {
                ...row,
                selected: rowIndex === index 
                    ? !row.selected
                    : row.selected,
            };
        }));
    }, [onSelectRow]);

    const selectionHeader = useMemo(() => (
        <LabeledCheckbox
            label=""
            checked={selectionState === 'all'}
            indeterminate={selectionState === 'indeterminate'}
            onChange={handleSelectHeader}
        />
    ), [selectionState, handleSelectHeader]);

    const selectionColumn = useMemo<Column<RowType>>(() => ({
        Header: selectionHeader, 
        accessor: 'selected',
        Cell: (cell: CellProps<RowType>) => {
            return (
            <LabeledCheckbox
                label=""
                checked={cell.row.original.selected}
                onChange={() => handleSelectRow(cell.row.index)}
            />
        )},
        width: 40,
        disableSortBy: true,
    } as const), [handleSelectRow, selectionHeader]);

    return (
        <VirtualTable
            {...props}
            columns={[selectionColumn, ...columns]}
            data={data}
            minWidth={40}
        />
    );
}

export default SelectionTable;
