import { orderBy } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { BaseRowRecord, ColProperty, RowProperty } from "./types";

type useTableProps<T extends BaseRowRecord = BaseRowRecord> = {
  readonly data: T[];
  onToggleSelect?: (row: T, value: boolean) => void;
  onToggleExpand?: (row: T, value: boolean) => void;
  onToggleSelectAll?: (value: boolean) => void;
  onSort?: (colKey: string, sortAsc?: boolean) => void;
  onUpdateTable?: (data: T[]) => void;
};
function useTable<T extends BaseRowRecord = BaseRowRecord>({
  data: initialData,
  onSort,
  onToggleSelect,
  onToggleExpand,
  onToggleSelectAll,
  onUpdateTable,
}: useTableProps<T>) {
  const [rowsProperties, setRowsProperties] = useState<{ [key: RowProperty['id']]: RowProperty }>({});
  const [colsProperties, setColsProperties] = useState<{ [key: ColProperty['colKey']]: ColProperty }>({});

  const getRowProperties = useCallback(
    (rowId: string) => rowsProperties[rowId],
    [rowsProperties]
  );

  const getColProperties = useCallback(
    (colKey: string) => colsProperties[colKey],
    [colsProperties]
  );

  const isSelected = useCallback(
    (rowId: string) => Boolean(rowsProperties[rowId]?.isSelected),
    [rowsProperties]
  );

  const isExpanded = useCallback(
    (rowId: string) => Boolean(rowsProperties[rowId]?.isExpanded),
    [rowsProperties]
  );

  const isAllSelected = useMemo(
    () => Object.keys(rowsProperties).filter(
      k => Boolean(rowsProperties[k]?.isSelected)
    ).length === initialData.length,
    [rowsProperties, initialData]
  );

  const isSomeSelected = useMemo(
    () => Object.keys(rowsProperties).filter(
      k => Boolean(rowsProperties[k]?.isSelected)
    ).length > 0,
    [rowsProperties]
  );

  const handleToggleSelect = useCallback(
    (row: T) => {
      const value = !rowsProperties[row.id]?.isSelected;
      const result = {
        ...rowsProperties,
        [row.id]: {
          ...rowsProperties[row.id],
          id: row.id,
          isExpanded: Boolean(rowsProperties[row.id]?.isExpanded),
          isSelected: value,
        },
      };

      setRowsProperties(result);
      onToggleSelect?.(row, value);
      return value;
    },
    [rowsProperties, onToggleSelect]
  );

  const handleToggleSelectAll = useCallback(
    () => {
      const selectedLen = Object.keys(rowsProperties).filter(
        k => Boolean(rowsProperties[k]?.isSelected)
      ).length;
      let result: typeof rowsProperties = {};
      let value = false;
      if (selectedLen === initialData.length) {
        value = false;
        result = initialData.reduce(
          (acc, r) => ({
            ...acc,
            [r.id]: {
              id: r.id,
              isExpanded: rowsProperties[r.id]?.isExpanded ?? false,
              isSelected: value,
            }
          }),
          {}
        );
      } else {
        value = true;
        result = initialData.reduce(
          (acc, r) => ({
            ...acc,
            [r.id]: {
              id: r.id,
              isExpanded: rowsProperties[r.id]?.isExpanded ?? false,
              isSelected: value,
            }
          }),
          {}
        );
      }

      setRowsProperties(result);
      onToggleSelectAll?.(value);
      return value;
    },
    [rowsProperties, initialData, onToggleSelectAll]
  );

  const handleToggleExpand = useCallback(
    (row: T) => {
      const value = !rowsProperties[row.id]?.isExpanded;
      const result = {
        ...rowsProperties,
        [row.id]: {
          ...rowsProperties[row.id],
          id: row.id,
          isExpanded: value,
          isSelected: Boolean(rowsProperties[row.id]?.isSelected),
        },
      };

      setRowsProperties(result);
      onToggleExpand?.(row, value);
      return value;
    },
    [rowsProperties, onToggleExpand]
  );

  const handleSort = useCallback(
    (colKey: string) => {
      const value = colsProperties[colKey]?.sortAsc === false
        ? undefined
        : !colsProperties[colKey]?.sortAsc;

      const result = {
        ...colsProperties,
        [colKey]: {
          ...colsProperties[colKey],
          colKey,
          sortAsc: value,
        },
      };

      setColsProperties(result);
      onSort?.(colKey, value);
    },
    [colsProperties, onSort]
  );

  const data = useMemo(
    () => {
      const colsPropsKeys = Object.keys(colsProperties);

      const hasColsProps = colsPropsKeys.length > 0;
      const hasRowsProps = Object.keys(rowsProperties).length > 0;
      if (!hasColsProps && !hasRowsProps) return initialData;

      const sortProps = colsPropsKeys.filter(
        k => colsProperties[k].sortAsc !== undefined
      );

      const mappedData = initialData.map(r => ({
        ...r,
        isSelected: Boolean(rowsProperties[r.id]?.isSelected),
        isExpanded: Boolean(rowsProperties[r.id]?.isExpanded),
      }));
      const orderedData = orderBy(
        mappedData,
        sortProps.map(k => colsProperties[k].colKey),
        sortProps.map(k => colsProperties[k].sortAsc ? 'asc' : 'desc')
      );
      return orderedData;
    },
    [initialData, rowsProperties, colsProperties]
  );

  return {
    data,
    rowsProperties,
    setRowsProperties,
    colsProperties,
    setColsProperties,

    getRowProperties,
    getColProperties,

    isSelected,
    isExpanded,
    isAllSelected,
    isSomeSelected,

    handleSort,
    handleToggleSelect,
    handleToggleExpand,
    handleToggleSelectAll,
  };
};

export default useTable;
