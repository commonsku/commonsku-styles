import React from 'react';
import styled, { css } from 'styled-components';

export const Grid = styled.div`
`;

export type RowPropTypes = {
    justify ?: string,
    nowrap ?: boolean,
    align ?: string,
};
export const Row = styled.div<RowPropTypes>`
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    flex: 0 1 auto;
    justify-content: ${(props) => props.justify || 'space-between' };
    flex-wrap: ${(props) => props.nowrap ? 'nowrap' : 'wrap' };
    align-items: ${(props) => props.align || 'center' };
`;

// Row.defaultProps = {
//     wrap: true,
// };

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
};

export const Col = styled.div<ColPropTypes>`
    flex: 12;
    flex-grow: 1;
    box-sizing: border-box;
    margin-left: ${(props) => (props.offset || 0)/12 * 100}%;
    ${(props) => props.collapse && media[props.collapse](`
        display: none;
    `)};
    ${(props) => {
        let res = '';
        for (let i = 0; i < sizes.length; i++) {
            const s = sizes[i];
            if(props[s]) {
                res += media[s](`
                    flex-basis: ${(typeof(props[s]) === 'boolean' ? 12 : props[s])/12 * 100}%;
                    max-width: ${(typeof(props[s]) === 'boolean' ? 12 : props[s])/12 * 100}%;
                `);
            } if(props[`${s}Offset`]) {
                res += media[s](`margin-left: ${(props[`${s}Offset`]/12 * 100)}%;`);
            } if (props.first && props.first === s) {
                res += media[s](`order: -1;`);
            } if (props.last && props.last === s) {
                res += media[s](`order: 1;`);
            }
        }
        return res;
    }};
`;


/*******************
 * Helpers
 *******************/

const sizes: Array<string> = [
    'xs', 'sm', 'md', 'lg', 'xl',
];

const media: {[key: string]: Function} = {
    xs: (styles: any) => `
        @media only screen and (max-width: 480px) {
            ${styles}
        }
    `,
    sm: (styles: any) => `
        @media only screen and (min-width: 481px) and (max-width: 640px) {
            ${styles}
        }
    `,
    md: (styles: any) => `
        @media only screen and (min-width: 641px) and (max-width: 768px) {
            ${styles}
        }
    `,
    lg: (styles: any) => `
        @media only screen and (min-width: 769px) and (max-width: 1024px) {
            ${styles}
        }
    `,
    xl: (styles: any) => `
        @media only screen and (min-width: 1025px) {
            ${styles}
        }
    `,
};
