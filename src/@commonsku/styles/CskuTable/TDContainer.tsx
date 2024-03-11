import React from 'react';
import * as ReactIs from "react-is";
import { styles } from './styles';
import { BaseColProps, BaseRowRecord, TableCellProps } from './types';

type TDContainerProps<T extends BaseRowRecord = BaseRowRecord> =
  & BaseColProps<T>
  & TableCellProps<T>;
const TDContainer = <T extends BaseRowRecord = BaseRowRecord>({
  colKey,
  row,
  Cell,
  value,
  isRowSelected,
  isRowExpanded,
  onToggleSelect,
  onToggleExpand,
  label,
  style,
  ...props
}: TDContainerProps<T>) => {
  if (typeof Cell === 'undefined' || Cell === null) {
    return <td {...props}  style={{...styles.td, ...style}}>{value}</td>
  }
  if (typeof Cell === 'string'
    || typeof Cell === 'number'
    || typeof Cell === 'boolean'
  ) {
    return <td {...props}  style={{...styles.td, ...style}}>{Cell}</td>
  }

  if (ReactIs.isElement(Cell)) {
    return (
      <td {...props} style={{...styles.td, ...style}}>
        {React.cloneElement(Cell, {
          value: value,
          row,
          col: { key: colKey, value: row ? row[colKey] as any : undefined },
          isRowSelected,
          isRowExpanded,
          onToggleSelect,
          onToggleExpand,
        })}
      </td>
    );
  }

  return (
    <td {...props} style={{...styles.td, ...style}}>
      <Cell
        value={value}
        row={row}
        col={{ key: colKey, value: row ? row[colKey] as any : undefined }}
        isRowSelected={isRowSelected}
        isRowExpanded={isRowExpanded}
        onToggleSelect={onToggleSelect}
        onToggleExpand={onToggleExpand}
      />
    </td>
  );
};

export default TDContainer;
