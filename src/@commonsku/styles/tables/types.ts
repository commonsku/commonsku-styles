import React from 'react';
import {
    HeaderGroup,
    TableInstance,
    TableState,
    TableOptions,
    SortingRule,
    UseSortByColumnProps,
    Row,
    UseExpandedRowProps,
    UseGroupByRowProps,
    UseRowSelectRowProps,
    UseRowStateRowProps,
    UseExpandedInstanceProps,
} from 'react-table';

export interface BaseSortByHeaderGroup<D extends object = {}> extends HeaderGroup<D>, UseSortByColumnProps<D> {
    containerProps?: object;
    style?: React.CSSProperties;
    className?: string;
}
export interface SortByHeaderGroup<D extends object = {}> extends Omit<BaseSortByHeaderGroup, 'headers'> {
    headers: Array<BaseSortByHeaderGroup<D>>;
}

export interface TableInitialStateStateWithSortBy<D extends object = {}> extends Partial<TableState<D>> {
    sortBy?: Array<SortingRule<string>>;
}

export interface SortByTableInstance<D extends object = {}> extends Omit<TableInstance<D>, 'headerGroups' | 'footerGroups'> {
    headerGroups: SortByHeaderGroup<object>[];
    footerGroups: SortByHeaderGroup<object>[];
};

export interface SortByTableOptions<D extends object = {}> extends Omit<TableOptions<D>, 'initialState'> {
    initialState: TableInitialStateStateWithSortBy<D>;
};

export interface TypedTableInstance<D extends object = {}>
    extends Omit<TableInstance<D>, 'rows' | 'headerGroups' | 'footerGroups'>,
    Omit<UseExpandedInstanceProps<D>, keyof TableInstance<D>>
{
    rows: Array<
        Row<D>
        & UseExpandedRowProps<D>
        & UseGroupByRowProps<D>
        & UseRowSelectRowProps<D>
        & UseRowStateRowProps<D>
    >,
    headerGroups: Array<SortByHeaderGroup<D>>,
    footerGroups: Array<SortByHeaderGroup<D>>,
};
