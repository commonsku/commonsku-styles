import React from 'react';
import styled, { css } from 'styled-components';
import { sizes, media } from '../utils';

export type SizerTypes = {
    [key: string]: any,
    collapse?: string|Array<string>, // hide for size(s)
    xs?: string|number|boolean,
    sm?: string|number|boolean,
    md?: string|number|boolean,
    lg?: string|number|boolean,
    xl?: string|number|boolean,
};

export const SizerCss = css<SizerTypes>`
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
        });

        return res;
    }}
`;

export const SizerWrapper = styled.div<SizerTypes>`
    ${SizerCss}
`;