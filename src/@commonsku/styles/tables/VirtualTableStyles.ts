import styled, { CSSObject } from 'styled-components';

const VirtualTableStyles = styled.div<{
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

  .thead {
    padding-right: 15px;
    ${p => p.bordered ? 'border-bottom: 1px solid #000;' : ''}

    .tr {
      overflow-x: hidden;
      width: 100% !important;
      min-width: 100% !important;
    }
  }

  .tbody {
    flex: 1 1 auto;
    height: 500px;
  }

  .tr-group {
    display: flex;
    flex-direction: column;
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
