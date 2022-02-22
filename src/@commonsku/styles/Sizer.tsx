import styled, { css, CSSObject } from 'styled-components';
import { sizes, media, TSize } from '../utils';

export type TSizeOffset = 'xsOffset' | 'smOffset' | 'mdOffset' | 'lgOffset' | 'xlOffset';
export type TSizeOffsetRight = 'xsOffsetRight' | 'smOffsetRight' | 'mdOffsetRight' | 'lgOffsetRight' | 'xlOffsetRight';
export type TSizeStyle = 'xsStyle' | 'smStyle' | 'mdStyle' | 'lgStyle' | 'xlStyle';

export type SizerTypes = {
    // [key: string]: any,
    collapse?: TSize | Array<TSize>, // hide for size(s)
    offset?: number,
    first?: string,
    last?: string,
    padded?: boolean,
    xs?: string|number|boolean|CSSObject,
    sm?: string|number|boolean|CSSObject,
    md?: string|number|boolean|CSSObject,
    lg?: string|number|boolean|CSSObject,
    xl?: string|number|boolean|CSSObject,
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
    xsStyle?: string|CSSObject,
    smStyle?: string|CSSObject,
    mdStyle?: string|CSSObject,
    lgStyle?: string|CSSObject,
    xlStyle?: string|CSSObject,

    start?: boolean,
    end?: boolean,
    center?: boolean,
    totalCols?: number;
};

const getTotalCols = (p: SizerTypes) => p.totalCols || 12;

export const SizerCss = css<SizerTypes>`
    ${(props) => props.start ? `
        justify-content: flex-start;
        text-align: left;
    ` : ''}
    ${(props) => props.center ? `
        justify-content: center;
        text-align: center;
    ` : ''}
    ${(props) => props.end ? `
        justify-content: flex-end;
        text-align: right;
    ` : ''}

    ${(props) => props.offset && `margin-left: ${props.offset/getTotalCols(props) * 100}%;`}
    ${(props) => props.collapse && typeof(props.collapse) === 'string' && media[props.collapse](`
        display: none;
    `)};
    ${(props: SizerTypes) => {
        let styles = '';

        if (props.collapse) {
            if (typeof(props.collapse) === 'string') {
                styles += media[props.collapse]('display: none;');
            } else if (typeof(props.collapse) === 'object' && Array.isArray(props.collapse)) {
                props.collapse.forEach((s: string) => {
                    styles += media[s]('display: none;');
                });
            }
        }

        sizes.forEach((s) => {
            const val = props[s];
            if(val !== null && val !== undefined) {
                if (typeof(val) === 'boolean' || (typeof(val) === 'number' && !isNaN(val))) {
                    if (val === false) {
                        styles += media[s]('display: none;');
                    } else {
                        styles += media[s](`
                            flex-basis: ${(typeof(val) === 'boolean' ? getTotalCols(props) : val)/getTotalCols(props) * 100}%;
                            max-width: ${(typeof(val) === 'boolean' ? getTotalCols(props) : val)/getTotalCols(props) * 100}%;
                            display: initial;
                        `);
                    }
                } else if (typeof(val) === 'string') {
                    styles += media[s](val);
                }
            }

            const offset = props[`${s}Offset` as TSizeOffset];
            const offsetRight = props[`${s}OffsetRight` as TSizeOffsetRight];
            const customStyles = props[`${s}Style` as TSizeStyle];
            if(offset) {
                styles += media[s](`margin-left: ${(offset / getTotalCols(props) * 100)}%;`);
            }
            if(offsetRight) {
                styles += media[s](`margin-right: ${(offsetRight/getTotalCols(props) * 100)}%;`);
            }
            if(customStyles) {
                styles += media[s](customStyles);
            }
        });

        return styles;
    }}
`;

export const SizerWrapper = styled.div<SizerTypes>`
    ${SizerCss}
`;
