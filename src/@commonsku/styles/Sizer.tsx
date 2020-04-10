import React from 'react';
import styled, { css } from 'styled-components';
import { sizes, media } from '../utils';

export type SizerTypes = {
    [key: string]: any,
    collapse?: string|Array<string>, // hide for size(s)
    offset?: number,
    first?: string,
    last?: string,
    padded ?: boolean,
    xs?: string|number|boolean,
    sm?: string|number|boolean,
    md?: string|number|boolean,
    lg?: string|number|boolean,
    xl?: string|number|boolean,
    xsOffset?: number,
    smOffset?: number,
    mdOffset?: number,
    lgOffset?: number,
    xlOffset?: number,
    xsOffsetRight?: number,
    smOffsetRight?: number,
    mdOffsetRight?: number,
    lgOffsetRight?: number,
    xlOffsetRight?: number,
    xsStyle?: string,
    smStyle?: string,
    mdStyle?: string,
    lgStyle?: string,
    xlStyle?: string,
};

export const SizerCss = css<SizerTypes>`
    padding: ${(props) => props.padded ? '0.5rem' : 'initial'};
    margin-left: ${(props) => (props.offset || 0)/12 * 100}%;
    ${(props) => props.collapse && typeof(props.collapse) === 'string' && media[props.collapse](`
        display: none;
    `)};
    ${(props) => {
        let res = '';

        if (props.collapse) {
            if (typeof(props.collapse) === 'string') {
                res += media[props.collapse]('display: none;');
            } else if (typeof(props.collapse) === 'object' && Array.isArray(props.collapse)) {
                props.collapse.forEach((s: string) => {
                    res += media[s]('display: none;');
                });
            }
        }

        sizes.forEach((s: string) => {
            if(props[s] !== null && props[s] !== undefined) {
                if (typeof(props[s]) === 'boolean' || typeof(props[s]) === 'number' || !isNaN(props[s])) {
                    if (props[s] === false) {
                        res += media[s]('display: none;');
                    } else {
                        res += media[s](`
                            flex-basis: ${(typeof(props[s]) === 'boolean' ? 12 : props[s])/12 * 100}%;
                            max-width: ${(typeof(props[s]) === 'boolean' ? 12 : props[s])/12 * 100}%;
                            display: initial;
                        `);
                    }
                } else if (typeof(props[s]) === 'string') {
                    // Custom Styles
                    res += media[s](props[s]);
                }
            }

            if(props[`${s}Offset`]) {
                res += media[s](`margin-left: ${(props[`${s}Offset`]/12 * 100)}%;`);
            }
            if(props[`${s}OffsetRight`]) {
                res += media[s](`margin-right: ${(props[`${s}OffsetRight`]/12 * 100)}%;`);
            }

            if(props[`${s}Style`]) {
                res += media[s](props[`${s}Style`]);
            }
        });

        return res;
    }}
`;

export const SizerWrapper = styled.div<SizerTypes>`
    ${SizerCss}
`;