import React from 'react';
import * as ReactIs from "react-is";
import { BaseRowRecord, TableBodyProps } from './types';

type TableFooterProps<
  T extends BaseRowRecord = BaseRowRecord
> = {
  readonly data: T[];
  readonly RowElem?: React.ReactElement<TableBodyProps<T>>;
};
function TableFooter<
  T extends BaseRowRecord = BaseRowRecord
>({ data, RowElem }: TableFooterProps<T>) {
  return (
    <tr>
      {React.Children.map(RowElem?.props?.children, (child) => {
        const FooterCell = child && React.Children.only(child.props.FooterCell);
        if (FooterCell === null ||
            typeof FooterCell === 'undefined' ||
            typeof FooterCell === 'string' ||
            typeof FooterCell === 'number' ||
            typeof FooterCell === 'boolean'
        ) {
          return <th>{FooterCell ?? ''}</th>;
        }

        if (ReactIs.isElement(FooterCell)) {
          return (
            <th {...FooterCell.props} style={FooterCell.props.style}>
              {React.cloneElement(FooterCell, { data })}
            </th>
          );
        }

        return (
          <th {...FooterCell}>
            <FooterCell data={data} />
          </th>
        );
      })}
    </tr>
  );
};

export default TableFooter;
