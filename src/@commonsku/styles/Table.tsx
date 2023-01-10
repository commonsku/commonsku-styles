import React from 'react';
import styled, {css} from 'styled-components'
import { SizerCss, SizerTypes } from './Sizer';
import { FilledChevronIcon} from './icons';
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
    border-spacing: 0;
    width: 100%;
    table-layout: auto;
    display: table;
    font-family: 'skufont-regular', sans-serif;
    ${sharedStyle}
    ${SizerCss}
    ${SharedStyles}
  }
`;

const TH= styled.th<{clickable?: boolean, sticky?: boolean, stickyTop?: number}&SharedStyleTypes&SizerTypes>`
  &&& {
    background-color: #dae9ee;
    border: none;
    border-spacing: 0;
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

const TD= styled.td<{clickable?: boolean}&SharedStyleTypes&SizerTypes>`
  &&& {
    border: 0;
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

const THContentWrapper = styled.span<SizerTypes>`
  &&& {
    ${SizerCss}
  }
`;

type ResponsiveTableProps = {
  children: React.ReactNode
}

const ResponsiveTable = React.forwardRef<HTMLDivElement, ResponsiveTableProps>(({
  parentProps, children, ...props}
  : React.PropsWithChildren<{parentProps?: {[key: string]: any, style?:object}} & SharedStyleTypes>, ref) => {
  return (
    <div ref={ref} style={{overflowX: 'auto'}} {...parentProps}>
      <Table style={{borderCollapse: 'collapse', borderSpacing: 0, width: '100%'}} {...props}>{children}</Table>
    </div>
  );
});

type THSortedProps = {
  children: React.ReactNode
}

const THSorted = React.forwardRef<HTMLTableCellElement, THSortedProps>(({
  children, order, iconHeight=15, iconStyles, hideIconOnMobile, ...props}
  : React.PropsWithChildren<{order?: string, iconHeight?: number, iconStyles?: object, hideIconOnMobile?:boolean}>, ref) => {
  return (
    <TH ref={ref} {...props}>
      <THContentWrapper
        xs={`display: ${hideIconOnMobile ? 'none': 'inline-block'};`}
        sm={"display: inline-block;"}
      >{order==='desc' 
        ? <FilledChevronIcon direction="down" height={iconHeight} style={{ width: 'auto', verticalAlign: 'middle', ...iconStyles}} />
        : order==='asc'
          ? <FilledChevronIcon direction="up" height={iconHeight} style={{ width: 'auto', verticalAlign: 'middle', ...iconStyles}} />
          : <FilledChevronIcon direction="updown" style={{ width: 'auto', verticalAlign: 'middle', ...iconStyles}} />
      }</THContentWrapper> {children}
    </TH>
  );
});


export { Table, TD, TH, TR, THead, TBody, ResponsiveTable, THSorted };
