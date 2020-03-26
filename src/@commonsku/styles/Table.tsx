import styled, {css} from 'styled-components'
import { SizesCss, SizeTypes } from './Sizes';

const sharedStyle = css`
  line-height: 1.125rem;
  box-sizing: border-box;
`

const optionalPadding = css<{padded?: boolean}>`
  &:first-child {
    padding-left: ${props => props.padded ? "20px" : "inherit"};
  }

  &:last-child {
    padding-right: ${props => props.padded ? "20px" : "inherit"};
  }
`

const Table= styled.table.attrs(() => ({ cellPadding: 0, cellSpacing: 0 }))`
  background-color: white;
  border: none;
  border-spacing: none;
  width: 100%;
  table-layout: auto;
  display: table;
  font-family: 'skufont-regular', sans-serif
  ${sharedStyle}
  ${SizesCss}
`;

const TH= styled.th<{clickable?: boolean, sticky?: boolean, stickyTop?: number}|SizeTypes>`
  background-color: #dae9ee;
  border: none;
  border-spacing: none;
  color: ${props => props.clickable ? "#00889B" : "#123952"};
  font-size: 1rem;
  padding: 0.5rem 0.625rem 0.625rem;
  display: table-cell;
  text-align: left;
  font-family: "skufont-demibold", sans-serif;
  ${props => props.sticky ? `position: sticky; top: ${props.stickyTop ? props.stickyTop : 0};` : null}
  &:hover {
    background-color: ${props => props.clickable ? "#d2e6ec" : "#dae9ee"};
    cursor: ${props => props.clickable ? "pointer" : "normal"};
  }
  ${optionalPadding}
  ${sharedStyle}
  ${SizesCss}
`;

const TD= styled.td<{clickable?: boolean}|SizeTypes>`
  color: #52585c;
  font-size: .875rem;
  line-height: 1.75rem;
  display: table-cell;
  padding: 0.5625rem 0.625rem;
  &:hover {
    cursor: ${props => props.clickable ? "pointer" : "normal"};
  }
  ${optionalPadding}
  ${sharedStyle}
  ${SizesCss}
`;

const TR= styled.tr`
  ${SizesCss}
  &:hover {
    background: #EDF2F4;
  }
`;

const THead= styled.thead`
  ${SizesCss}
`;

const TBody= styled.tbody`
  ${SizesCss}
`;


export { Table, TD, TH, TR, THead, TBody };