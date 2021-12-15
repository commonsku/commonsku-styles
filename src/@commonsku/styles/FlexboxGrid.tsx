import styled from 'styled-components';
import { SizerCss, SizerTypes } from './Sizer';
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
    middle?: boolean,
} & SharedStyleTypes;

export const Row = styled.div<RowPropTypes>`
    &&& {
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        flex: 0 1 auto;
        justify-content: ${(props) => props.justify || 'left' };
        flex-wrap: ${(props) => props.wrap ? props.wrap : 'wrap' };
        align-items: ${(props) => props.align || 'stretch' };
        padding: ${(props) => props.padded ? '0.5rem' : 'initial'};
        ${props => props.start ? 'place-content: flex-start;' : ''}
        ${props => props.end ? 'place-content: flex-end;' : ''}
        ${props => props.middle ? 'align-items: center;' : ''}
        ${SharedStyles}
    }
`;

export type ColPropTypes = SizerTypes & SharedStyleTypes;

export const Col = styled.div<ColPropTypes>`
    &&& {
        padding: ${(props) => props.padded ? '0.5rem' : 'initial'};
        flex: 12;
        flex-grow: 1;
        box-sizing: border-box;
        ${SizerCss}
        ${SharedStyles}
    }
`;
