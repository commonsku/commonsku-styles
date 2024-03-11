import React from 'react';
import * as ReactIs from "react-is";
import { ArrowIcon, DoubleArrowIcon } from '../icons';
import { LabeledCheckbox } from '../Input';
import { styles } from './styles';
import { BaseRowRecord, ColProperty, TableBodyProps } from './types';

type TableHeaderProps<
  T extends BaseRowRecord = BaseRowRecord
> = {
  selection?: boolean;
  headerSticky?: boolean | { top?: number; right?: number; left?: number; };
  isAllSelected?: boolean;
  isSomeSelected?: boolean;
  RowElem?: React.ReactElement<TableBodyProps<T>>;

  handleToggleSelectAll: () => boolean;
  getColProperties: (colKey: string) => ColProperty;
};
function TableHeader<
  T extends BaseRowRecord = BaseRowRecord
>({
  selection,
  headerSticky,
  isAllSelected,
  isSomeSelected,
  RowElem,

  getColProperties,
  handleToggleSelectAll,
}: TableHeaderProps<T>) {
  return (
    <tr>
      {selection && <th className={headerSticky ? 'sticky' : ''} style={styles.th}>
        <LabeledCheckbox
          label=""
          checked={isAllSelected}
          indeterminate={isSomeSelected}
          onChange={() => handleToggleSelectAll()}
        />
      </th>}
      {React.Children.map(RowElem?.props?.children, (child) => {
        const colProps = getColProperties(child?.props.colKey || '');
        const SortIcon = (
          colProps?.sortAsc === undefined
            ? <DoubleArrowIcon />
            : <ArrowIcon direction={colProps?.sortAsc ? 'down' : 'up'} />
        );
        return (
          <th className={headerSticky ? 'sticky' : ''} style={styles.th}>
            {child?.props?.label ?? ''}
            {' '}
            {child?.props.canSort ? SortIcon : null}
          </th>
        );
      })}
    </tr>
  );
};

export default TableHeader;
