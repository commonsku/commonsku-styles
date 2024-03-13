import React from 'react';
import { FilledChevronIcon } from '../icons';
import { LabeledCheckbox } from '../Input';
import { BaseRowRecord, ColProperty, TableBodyProps } from './types';

type TableHeaderProps<
  T extends BaseRowRecord = BaseRowRecord
> = {
  readonly selection?: boolean;
  readonly headerSticky?: boolean | { top?: number; right?: number; left?: number; };
  readonly isAllSelected?: boolean;
  readonly isSomeSelected?: boolean;
  readonly RowElem?: React.ReactElement<TableBodyProps<T>>;

  readonly handleToggleSelectAll: () => boolean;
  readonly getColProperties: (colKey: string) => ColProperty;
  readonly handleSort: (colKey: string) => void;
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
  handleSort,
}: TableHeaderProps<T>) {
  return (
    <tr>
      {selection && <th className={headerSticky ? 'sticky' : ''}>
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
            ? <FilledChevronIcon
                direction={'updown'}
                size="small"
                style={{ verticalAlign: "middle" }}
              />
            : <FilledChevronIcon
                direction={colProps?.sortAsc ? 'down' : 'up'}
                size="small"
                style={{ verticalAlign: "middle" }}
              />
        );
        return (
          <th
            className={`${headerSticky ? 'sticky' : ''} ${child?.props.canSort ? 'clickable' : ''}`}
            onClick={() => {
              child?.props?.colKey && handleSort(child.props.colKey);
            }}
          >
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
