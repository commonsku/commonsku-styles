import React from 'react';
import styled, {css} from 'styled-components'
import { SizerCss, SizerTypes } from './Sizer';
import { UpDownArrowsIcon, UpArrowIcon, DownArrowIcon, } from './icons';
import { colors } from './Theme';
import { aeval } from '../utils';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

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

const Table= styled.table.attrs(() => ({ cellPadding: 0, cellSpacing: 0 }))<SharedStyleTypes>`
  &&& {
    background-color: white;
    border: none;
    border-spacing: none;
    width: 100%;
    table-layout: auto;
    display: table;
    font-family: 'skufont-regular', sans-serif
    ${sharedStyle}
    ${SizerCss}
    ${SharedStyles}
  }
`;

const TH= styled.th<{clickable?: boolean, sticky?: boolean, stickyTop?: number}&SharedStyleTypes|SizerTypes>`
  &&& {
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
    ${SizerCss}
    ${SharedStyles}
  }
`;

const TD= styled.td<{clickable?: boolean}&SharedStyleTypes|SizerTypes>`
  &&& {
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
    ${SizerCss}
    ${SharedStyles}
  }
`;

const TR= styled.tr<SizerTypes&{selected?: boolean}>`
  &&& {
    ${SizerCss}
    &:hover {
      background: #EDF2F4;
    }
    ${p => p.selected && 'background: #EDF2F4;'}
  }
`;

const THead= styled.thead<SizerTypes>`
  &&& {
    ${SizerCss}
  }
`;

const TBody= styled.tbody<SizerTypes>`
  &&& {
    ${SizerCss}
  }
`;

const ResponsiveTable = ({parentProps, children, ...props}: React.PropsWithChildren<{parentProps?: {[key: string]: any, style?:object}} & SharedStyleTypes>) => {
  return (
    <div style={{overflowX: 'auto'}} {...parentProps}>
      <Table style={{borderCollapse: 'collapse', borderSpacing: 0, width: '100%'}} {...props}>{children}</Table>
    </div>
  );
}

const THSorted = ({children, order, iconHeight=15, iconStyles, ...props}: React.PropsWithChildren<{order?: string, iconHeight?: number, iconStyles?: object}>) => {
  return (
    <TH {...props}>
      {order==='desc' 
        ? <DownArrowIcon height={iconHeight} style={{ width: 'auto', verticalAlign: 'middle', ...iconStyles}} />
        : order==='asc'
          ? <UpArrowIcon height={iconHeight} style={{ width: 'auto', verticalAlign: 'middle', ...iconStyles}} />
          : <UpDownArrowsIcon height={iconHeight} style={{ width: 'auto', verticalAlign: 'middle', ...iconStyles}} />
      } {children}
    </TH>
  );
}


export { Table, TD, TH, TR, THead, TBody, ResponsiveTable, THSorted };
