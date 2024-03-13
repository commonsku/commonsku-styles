import React from 'react';
import styled from 'styled-components';
import { parseMeasurement } from '../../utils';

export type GridTableProps = {
  columns: number | Array<string|number | [string|number, string|number]>;
  minWidth?: string | number;
  selectedBorderWidth?: string | number;
};
const GridTable = styled.table<GridTableProps>`
 &&& {
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  grid-template-columns: ${p => {
    const minWidth = typeof p.minWidth === 'number' ? (p.minWidth + 'px') : (p.minWidth ?? '150px');
    let columns: Array<string|number | [string|number, string|number]> = [];
    if (typeof p.columns === 'number') {
      columns = new Array(p.columns).fill(1);
    } else {
      columns = p.columns;
    }

    return columns.map(
      (v) => {
        if (Array.isArray(v)) {
          return `minmax(
            ${typeof v[0] === 'number' ? (v[0] + 'px') : v[0]},
            ${typeof v[1] === 'number' ? (v[1] + 'fr') : v[1]}
          )`;
        }
        return `minmax(${minWidth}, ${typeof v === 'number' ? (v + 'fr') : v})`;
      }
    ).join(' ');
  }};

 thead,
  tbody,
  tr {
    display: contents;
  }

  th,
  td {
    padding: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    background: var(--color-neutrals-20);
    text-align: left;
    font-weight: normal;
    font-family: var(--font-family-bold);
    font-size: 16;
    color: var(--color-neutrals-90);
  }

  th.sticky {
    position: sticky;
    top: 0;
  }

  th.clickable {
    cursor: pointer;
  }

  th:last-child {
    border: 0;
  }

  td {
    padding-top: 10px;
    padding-bottom: 10px;
    color: var(--color-neutrals-90);
    font-family: var(--font-family-regular);
    font-size: 14;
    font-weight: normal;
  }

  tr.selected td {
    background: var(--color-teal-10);
    border: ${p => parseMeasurement(p.selectedBorderWidth ?? 1)} solid var(--color-teal-30);
  }

  tr.selected:not(.selected-next) td {
    border-bottom-width: ${p => parseMeasurement(p.selectedBorderWidth ?? 1)};
  }
  tr.selected.selected-next td {
    border-bottom-width: 0px;
  }

  tr.selected td:nth-child(even) {
    border-left-width: 0px;
    border-right-width: 0px;
  }
  tr.selected td:last-child {
    border-right-width: ${p => parseMeasurement(p.selectedBorderWidth ?? 1)};
  }
  tr.selected td:first-child {
    border-left-width: ${p => parseMeasurement(p.selectedBorderWidth ?? 1)};
  }

  tr.striped:nth-child(even):not(last-child) td {
    background: var(--color-primary1-10);
  }
}
`;

export default GridTable;
