import React from 'react';
import styled from 'styled-components';
import { media, sizes } from '../utils';

export const Grid = styled.div`
`;

export type RowPropTypes = {
    justify ?: string,
    wrap ?: string, // 'wrap', 'nowrap', 'wrap-reverse', ...
    align ?: string,
    padded ?: boolean,
};
export const Row = styled.div<RowPropTypes>`
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    flex: 0 1 auto;
    justify-content: ${(props) => props.justify || 'space-between' };
    flex-wrap: ${(props) => props.wrap ? props.wrap : 'wrap' };
    align-items: ${(props) => props.align || 'center' };
    padding: ${(props) => props.padded ? '0.5rem' : 'initial'}
`;

export type ColPropTypes = {
    [key: string]: any,
    collapse?: string, // hide
    offset?: number,
    xs?: number|boolean,
    sm?: number|boolean,
    md?: number|boolean,
    lg?: number|boolean,
    xl?: number|boolean,
    xsOffset?: number,
    smOffset?: number,
    mdOffset?: number,
    lgOffset?: number,
    xlOffset?: number,
    first?: string,
    last?: string,
    padded ?: boolean,
    xsStyles ?: string,
    smStyles ?: string,
    mdStyles ?: string,
    lgStyles ?: string,
    xlStyles ?: string,
};

export const Col = styled.div<ColPropTypes>`
    flex: 12;
    flex-grow: 1;
    box-sizing: border-box;
    padding: ${(props) => props.padded ? '0.5rem' : 'initial'};
    margin-left: ${(props) => (props.offset || 0)/12 * 100}%;
    ${(props) => props.collapse && media[props.collapse](`
        display: none;
    `)};
    ${(props) => {
        let res = '';
        for (let i = 0; i < sizes.length; i++) {
            const s: string = sizes[i];
            if(props[s] !== null && props[s] !== undefined) {
                if (props[s] === false) {
                    res += media[s]('display: none;');
                } else {
                    res += media[s](`
                        flex-basis: ${(typeof(props[s]) === 'boolean' ? 12 : props[s])/12 * 100}%;
                        max-width: ${(typeof(props[s]) === 'boolean' ? 12 : props[s])/12 * 100}%;
                        display: initial;
                    `);
                }
            }
            if(props[`${s}Offset`]) {
                res += media[s](`margin-left: ${(props[`${s}Offset`]/12 * 100)}%;`);
            }
            if (props.first && props.first === s) {
                res += media[s](`order: -1;`);
            }
            if (props.last && props.last === s) {
                res += media[s](`order: 1;`);
            }

            // Add Custom Styles for media queries
            if(props[`${s}Styles`]) {
                res += media[s](props[`${s}Styles`]);
            }
        }
        return res;
    }}
`;
