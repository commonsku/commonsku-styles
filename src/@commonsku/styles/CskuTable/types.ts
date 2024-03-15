import {
  ReactElement,
  JSXElementConstructor,
  HTMLAttributes,
} from "react";

export type BaseRowRecord = Record<string, unknown> & {
  id: string;
};

export type TableCellProps<T extends BaseRowRecord = BaseRowRecord> = HTMLAttributes<HTMLTableCellElement> & {
  value: any;
  col?: { key: string, value: any };
  row?: T;
  isRowSelected?: boolean;
  isRowExpanded?: boolean;
  onToggleSelect?: (row: T) => boolean;
  onToggleExpand?: (row: T) => boolean;
};

export type TableFooterCellProps<T extends BaseRowRecord = BaseRowRecord> = HTMLAttributes<HTMLTableCellElement> & {
  data: readonly T[];
};

export type TableCell<
  T extends BaseRowRecord = BaseRowRecord
> = ReactElement<TableCellProps<T>> | JSXElementConstructor<TableCellProps<T>>;

export type TableFooterCell<
  T extends BaseRowRecord = BaseRowRecord
> = ReactElement<TableFooterCellProps<T>> | JSXElementConstructor<TableFooterCellProps<T>>;

export type BaseColProps<T extends BaseRowRecord = BaseRowRecord> = {
  // provided by user
  colKey: string,
  label: string,
  canSort?: boolean;
  minWidth?: string | number,
  maxWidth?: string | number,
  Cell?: string | number | boolean | null | TableCell<T>;
  FooterCell?: string | number | boolean | null | TableFooterCell<T>;
};

export type RowProperty = {
  id: string,
  isSelected?: boolean;
  isExpanded?: boolean;
};

export type ColProperty = {
  colKey: string;
  sortAsc?: boolean;
};

// used by user
export type TableRowProps<
  T extends BaseRowRecord = BaseRowRecord
> = HTMLAttributes<HTMLTableRowElement> & {
  children: ReactElement<BaseColProps<T>>[];
};
// used by user
export type TableColProps<T extends BaseRowRecord = BaseRowRecord> = BaseColProps<T>
  & HTMLAttributes<HTMLTableCellElement>;

export type TableBodyProps<
  T extends BaseRowRecord = BaseRowRecord
> = HTMLAttributes<HTMLTableRowElement> & {
  children: ReactElement<BaseColProps<T>>[];
};
