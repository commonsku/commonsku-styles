import React from 'react';
import * as ReactIs from "react-is";
import { styles } from './styles';
import { BaseRowRecord, TableBodyProps } from './types';

type TableFooterProps<
  T extends BaseRowRecord = BaseRowRecord
> = {
  data: readonly T[];
  RowElem?: React.ReactElement<TableBodyProps<T>>;
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
          return <th style={styles.th}>{FooterCell ?? ''}</th>;
        }

        if (ReactIs.isElement(FooterCell)) {
          return (
            <th {...FooterCell.props} style={{...styles.th, ...FooterCell.props.style}}>
              {React.cloneElement(FooterCell, { data })}
            </th>
          );
        }

        return (
          <th {...FooterCell} style={styles.th}>
            <FooterCell data={data} />
          </th>
        );
      })}
    </tr>
  );
};

export default TableFooter;
