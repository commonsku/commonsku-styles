import React from 'react';
import {
    HeaderGroup,
    TableInstance,
    TableState,
    TableOptions,
    SortingRule,
    UseSortByColumnProps,
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

export interface SortByTableInstance<D extends object = {}> extends Omit<TableInstance<D>, 'headerGroups'> {
    headerGroups: SortByHeaderGroup<object>[];
};

export interface SortByTableOptions<D extends object = {}> extends Omit<TableOptions<D>, 'initialState'> {
    initialState: TableInitialStateStateWithSortBy<D>;
};
