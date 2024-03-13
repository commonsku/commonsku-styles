import React from 'react';
import { BaseRowRecord, TableColProps } from './types';

function TableCol<
  T extends BaseRowRecord = BaseRowRecord
>(props: TableColProps<T>) {
  return (
    <>{''}</>
  );
};

export default TableCol;
