import React from 'react';
import styled, { css } from 'styled-components';

export const Grid = styled.div`
`;

export type RowPropTypes = {
    justify ?: string,
    wrap ?: boolean,
    align ?: string,
};
export const Row = styled.div<RowPropTypes>`
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    flex: 0 1 auto;
    justify-content: ${(props) => props.justify || 'space-between' };
    flex-wrap: ${(props) => props.wrap ? 'wrap' : 'initial' };
    align-items: ${(props) => props.align || 'center' };
`;


type ViewportSizeType = {
    xs: string,
    sm: string,
    md: string,
    lg: string,
    xl: string,
}

const sizes: Array<string> = [
    'xs', 'sm', 'md', 'lg', 'xl',
];

export type ColPropTypes = {
    [key: string]: any,
    size?: number,
    collapse?: string,
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
    first?: ViewportSizeType,
    last?: ViewportSizeType,
    className?: string,
    tagName?: string,
    children?: React.ReactNode,
};

export const Col = styled.div<ColPropTypes>`
    flex: 12;
    flex-grow: 1;
    box-sizing: border-box;
    ${(props) => props.collapse && media[props.collapse](`
        display: none;
    `)};
    ${(props) => props.xs ? media['xs'](``, props.xs) : ''};
    ${(props) => props.sm ? media['sm']('', props.sm) : ''};
    ${(props) => props.md ? media['md']('', props.md) : ''};
    ${(props) => props.lg ? media['lg']('', props.lg) : ''};
    ${(props) => props.xl ? media['xl']('', props.xl) : ''};    
`;


/*******************
 * Helpers
 *******************/

const media: {[key: string]: Function} = {
    xs: (styles: any, size: number|boolean) => `
        @media only screen and (max-width: 480px) {
            ${styles}
            flex-basis: ${(typeof(size) === 'boolean' ? 12 : size)/12 * 100}%;
            max-width: ${(typeof(size) === 'boolean' ? 12 : size)/12 * 100}%;
        }
    `,
    sm: (styles: any, size: number = 12) => `
        @media only screen and (min-width: 481px) and (max-width: 640px) {
            ${styles}
            flex-basis: ${(typeof(size) === 'boolean' ? 12 : size)/12 * 100}%;
            max-width: ${(typeof(size) === 'boolean' ? 12 : size)/12 * 100}%;
        }
    `,
    md: (styles: any, size: number = 12) => `
        @media only screen and (min-width: 641px) and (max-width: 768px) {
            ${styles}
            flex-basis: ${(typeof(size) === 'boolean' ? 12 : size)/12 * 100}%;
            max-width: ${(typeof(size) === 'boolean' ? 12 : size)/12 * 100}%;
        }
    `,
    lg: (styles: any, size: number = 12) => `
        @media only screen and (min-width: 769px) and (max-width: 1024px) {
            ${styles}
            flex-basis: ${(typeof(size) === 'boolean' ? 12 : size)/12 * 100}%;
            max-width: ${(typeof(size) === 'boolean' ? 12 : size)/12 * 100}%;
        }
    `,
    xl: (styles: any, size: number = 12) => `
        @media only screen and (min-width: 1025px) {
            ${styles}
            flex-basis: ${(typeof(size) === 'boolean' ? 12 : size)/12 * 100}%;
            max-width: ${(typeof(size) === 'boolean' ? 12 : size)/12 * 100}%;
        }
    `,
};
