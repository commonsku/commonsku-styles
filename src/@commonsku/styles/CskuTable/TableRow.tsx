import React, { useMemo } from 'react';
import { LabeledCheckbox } from '../Input';
import { styles } from './styles';
import TDContainer from './TDContainer';
import { BaseRowRecord, RowProperty, TableBodyProps } from './types';

type Props<T extends BaseRowRecord = BaseRowRecord> =
  TableBodyProps<T> & {
    data: readonly T[];
    row: T;
    index: number;
    selection?: boolean;
    striped?: boolean;
    getRowProperties: (rowId: string) => RowProperty;
    handleToggleSelect: (row: T) => boolean;
    handleToggleExpand: (row: T) => boolean;
  };

function TableRow<
  T extends BaseRowRecord = BaseRowRecord
>({
  row,
  data,
  index,
  children,
  style,
  striped = false,
  selection = false,

  getRowProperties,
  handleToggleSelect,
  handleToggleExpand,

  ...props
}: Props<T>) {
  const rowProps = useMemo(
    () => getRowProperties(row.id),
    [getRowProperties, row.id]
  );
  const isNextSelected = useMemo(
    () => data[index+1] && getRowProperties(data[index+1]?.id)?.isSelected,
    [getRowProperties, data, index]
  );

  return (
    <tr
      {...props}
      className={[
        striped ? 'striped' : '',
        rowProps?.isSelected ? 'selected' : '',
        isNextSelected ? 'selected-next' : '',
      ].filter(v => v).join(' ')}
      style={style}
    >
      {selection && <td style={styles.td}>
        <LabeledCheckbox
          label=""
          checked={rowProps?.isSelected}
          onChange={() => handleToggleSelect(row)}
        />
      </td>}
      {React.Children.map(children, (child, i) => {
        if (!child) return (
          <TDContainer
            key={'row-' + row.id + '-' + i}
            label=''
            value=''
            colKey=''
          ></TDContainer>
        );

        const Child = React.Children.only(child);
        const { colKey } = Child.props;
        const cellValue = row[colKey] as any;
        return (
          <TDContainer
            key={'row-' + row.id + '-' + colKey}
            {...Child.props}
            value={cellValue}
            row={row}
            col={{ key: colKey, value: row[colKey] as any }}
            isRowSelected={Boolean(rowProps?.isSelected)}
            isRowExpanded={Boolean(rowProps?.isExpanded)}
            onToggleSelect={handleToggleSelect}
            onToggleExpand={handleToggleExpand}
          />
        );
      })}
    </tr>
  );
}

export default TableRow;
