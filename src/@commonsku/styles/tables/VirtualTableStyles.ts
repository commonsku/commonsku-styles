import styled, { CSSObject } from 'styled-components';

const VirtualTableStyles = styled.div<{
  tableHeight?: number | string;
  bordered?: boolean | string;
  rowClickable?: boolean;
  hoverRowBg?: string | boolean;
  selectedRowIndex?: number;
  selectedRowStyle?: boolean | CSSObject; // if true, then set bg same as hoverRowBg
}>`
padding: 1rem;

.table-list-rows {
  ${p => p.rowClickable ? `
    .tr {
      cursor: pointer;
    }
  ` : ''}
}

.table {
  display: inline-flex;
  flex-direction: column;
  ${p => p.bordered ? `
    border-spacing: 0;
    border: 1px solid black;
  ` : ''}
  width: 100% !important;
  min-width: 100% !important;
  ${p => p.tableHeight ? `height: ${p.tableHeight}${typeof p.tableHeight === 'number' ? 'px' : '' };` : ''}

  .thead {
    padding-right: 15px;
    ${p => p.bordered ? 'border-bottom: 1px solid #000;' : ''}

    .tr {
      overflow-x: hidden;
      min-width: 100%;
    }
  }

  .tbody {
    flex: 1 1 auto;
    height: 80vh;
  }

  .tr-group {
    display: flex;
    flex-direction: column;

    .tr, .tr-sub {
      width: 99%;
    }
  }

  .tr {
    display: flex;

    ${p => p.bordered ? `
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    ` : ''}
  }

  .tr.header {
    position: sticky;
  }

  .th,
  .td {
    margin: 0;
    padding: 0.5rem;
    ${p => p.bordered ? `
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    ` : ''}
  }
}`;

export default VirtualTableStyles;
