import React, { useCallback, useMemo } from 'react';
import VirtualTable, { VirtualTableProps } from './VirtualTable';
import { Column, CellProps } from 'react-table';
import { LabeledCheckbox } from '../Input';

export type SelectionTableProps<
    RowType extends Record<string, unknown>,
    TableProps,
    TableFooterProps,
> = VirtualTableProps<RowType, TableProps, TableFooterProps> & {
    selectedRows?: RowType[];
    onSelectionChange?: (selectedRows: RowType[]) => void;
}

type SelectionState = 'none' | 'some' | 'all';

const SelectionTable = <
    RowType extends Record<string, unknown>,
    TableProps,
    TableFooterProps,
> (props: SelectionTableProps<RowType, TableProps, TableFooterProps>) => {
    const { columns, data, selectedRows, onSelectionChange } = props;

    const selectionState: SelectionState = useMemo(() => {
        if (selectedRows == null) return "none";

        switch (selectedRows.length) {
            case 0:
                return 'none';
            case data.length:
                return 'all';
            default:
                return 'some';
        }
    }, [data.length, selectedRows]);

    const handleSelectRows = useCallback((rows: RowType[]) => {
        if (onSelectionChange == null) return;

        if (selectedRows == null) {
            onSelectionChange(rows);
            return;
        }

        const newSelection = selectedRows.filter(row => !rows.includes(row));
        newSelection.push(
            ...rows.filter(row => !selectedRows.includes(row))
        );

        onSelectionChange(newSelection);
    }, [selectedRows, onSelectionChange]);

    const handleSelectHeader = useCallback(() => {
        if (onSelectionChange == null) return;

        switch (selectionState) {
            case 'none':
                onSelectionChange([...data]);
                break;
            case 'all':
            case 'some':
                onSelectionChange([]);
                break;
        }
    }, [selectionState, data, onSelectionChange]);

    const selectionHeader = useMemo(() => (
        <LabeledCheckbox
            label=""
            checked={selectionState === 'all'}
            indeterminate={selectionState === 'some'}
            onChange={handleSelectHeader}
            labelStyle={{
                height: '100%',
                width: '35px',
                alignItems: 'center',
                alignSelf: 'normal',
            }}
        />
    ), [selectionState, handleSelectHeader]);

    const selectionColumns = useMemo(() => ([
        {
            Header: selectionHeader, 
            accessor: 'selected',
            Cell: (cell: CellProps<RowType>) => (
                <LabeledCheckbox
                    className='row-select-input'
                    label=""
                    checked={selectedRows != null && selectedRows.includes(cell.row.original)}
                    onChange={() => handleSelectRows([cell.row.original])}
                    labelStyle={{
                        height: '100%',
                        width: '35px',
                        alignItems: 'center',
                    }}
                />
            ),
            width: 40,
            disableSortBy: true,
        } as Column<RowType>,
        ...columns
    ]), [columns, selectedRows, selectionHeader, handleSelectRows]);

    return (
        <VirtualTable
            {...props}
            columns={selectionColumns}
            data={data}
            minWidth={40}
        />
    );
}

export default SelectionTable;
