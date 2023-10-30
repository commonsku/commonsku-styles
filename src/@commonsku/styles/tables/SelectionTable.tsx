import React, { useCallback, useMemo, useState } from 'react';
import VirtualTable, { VirtualTableProps } from './VirtualTable';
import { Column, CellProps } from 'react-table';
import { LabeledCheckbox } from '../Input';

export type SelectionTableProps<
    RowType extends Record<string, unknown>,
    TableProps,
    TableFooterProps,
> = VirtualTableProps<RowType, TableProps, TableFooterProps> & {
    onSelectRow?: (row: RowType, isSelected: boolean) => void;
    onSelectionChange?: (selectedRows: RowType[]) => void;
}

type SelectionState = 'none' | 'some' | 'all';

const SelectionTable = <
    RowType extends Record<string, unknown>,
    TableProps,
    TableFooterProps,
> (props: SelectionTableProps<RowType, TableProps, TableFooterProps>) => {
    const { columns, onSelectRow, onSelectionChange, data } = props;
    const [selection, setSelection] = useState<RowType[]>([]);

    const selectionState: SelectionState = useMemo(() => {
        switch (selection.length) {
            case 0:
                return 'none';
            case data.length:
                return 'all';
            default:
                return 'some';
        }
    }, [data.length, selection.length]);

    const handleSelectHeader = useCallback(() => {
        switch (selectionState) {
            case 'none':
                setSelection(data);
                break;
            case 'all':
            case 'some':
                setSelection([]);
                break;
        }

        if (onSelectionChange != null) {
            onSelectionChange(data.filter(row => row.selected));
        }
    }, [selectionState, onSelectionChange, data]);

    const handleSelectRow = useCallback((row: RowType) => {
        const isSelected = selection.includes(row);
    
        if (isSelected) {
            setSelection(selection.filter(r => r !== row));
        } else {
            setSelection([...selection, row]);
        }

        if (onSelectRow != null) {
            onSelectRow(row, isSelected);
        }

        if (onSelectionChange != null) {
            onSelectionChange(selection);
        }
    }, [onSelectRow, onSelectionChange, selection]);

    const selectionHeader = useMemo(() => (
        <LabeledCheckbox
            label=""
            checked={selectionState === 'all'}
            indeterminate={selectionState === 'some'}
            onChange={handleSelectHeader}
        />
    ), [selectionState, handleSelectHeader]);

    const selectionColumn = useMemo<Column<RowType>>(() => ({
        Header: selectionHeader, 
        accessor: 'selected',
        Cell: (cell: CellProps<RowType>) => (
            <LabeledCheckbox
                label=""
                checked={selection.includes(cell.row.original)}
                onChange={() => handleSelectRow(cell.row.original)}
            />
        ),
        width: 40,
        disableSortBy: true,
    }), [handleSelectRow, selection, selectionHeader]);

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
