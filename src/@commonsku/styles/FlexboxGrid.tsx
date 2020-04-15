import React from 'react';
import styled from 'styled-components';
import { media, sizes } from '../utils';
import { SizerCss, SizerTypes } from './Sizer';
import { colors } from './Theme';
import { aeval } from '../utils';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

export const Grid = styled.div<SharedStyleTypes>`
    ${SharedStyles}
`;

export type RowPropTypes = {
    justify ?: string,
    wrap ?: string, // 'wrap', 'nowrap', 'wrap-reverse', ...
    align ?: string,
    padded ?: boolean,
    start ?: boolean,
    end ?: boolean,
};
export const Row = styled.div<RowPropTypes & SharedStyleTypes>`
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    flex: 0 1 auto;
    justify-content: ${(props) => props.justify || 'space-between' };
    flex-wrap: ${(props) => props.wrap ? props.wrap : 'wrap' };
    align-items: ${(props) => props.align || 'center' };
    padding: ${(props) => props.padded ? '0.5rem' : 'initial'};
    ${props => props.start ? 'place-content: flex-start;' : ''}
    ${props => props.end ? 'place-content: flex-end;' : ''}
    ${SharedStyles}
`;

export const Col = styled.div<SizerTypes & SharedStyleTypes>`
    flex: 12;
    flex-grow: 1;
    box-sizing: border-box;
    ${SizerCss}
    ${SharedStyles}
`;
