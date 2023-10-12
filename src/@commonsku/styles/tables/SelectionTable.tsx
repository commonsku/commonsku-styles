import React, { useCallback, useMemo, useState } from 'react';
import VirtualTable, { VirtualTableProps } from './VirtualTable';
import { Column } from 'react-table';
import { LabeledCheckbox } from '../Input';

export type SelectionTableProps = VirtualTableProps & {
    onSelectRow?: (row?: object, index?: number) => void;
}

type SelectionState = 'none' | 'indeterminate' | 'all';

const SelectionTable = (props: SelectionTableProps) => {
    const { columns, onSelectRow } = props;

    const [data, setData] = useState(
        props.data.map(row => ({
            selected: false,
            ...row,
        })
    ));

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

    const selectionColumn = useMemo<Column<object>>(
        () => ({
            Header: selectionHeader, 
            accessor: 'selected',
            Cell: (cellObj: any) => {
                return (
                <LabeledCheckbox
                    label=""
                    checked={cellObj.row.original.selected}
                    onChange={() => handleSelectRow(cellObj.row.index)}
                />
            )},
            sticky: 'left',
            noDrag: true,
            width: 40,
            disableSortBy: true,
        }),
        [handleSelectRow, selectionHeader]
    );

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