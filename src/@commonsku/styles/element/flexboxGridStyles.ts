import { css, CSSObject, } from 'styled-components';
import { sizes, media } from '../../utils';


export type FlexRowProps = {
    justify?: string,
    wrap?: string | number, // 'wrap', 'nowrap', 'wrap-reverse', ...
    align?: string,
    padded?: boolean,
    start?: boolean,
    end?: boolean,
    middle?: boolean;
};
export type FlexColProps = {
    collapse?: string|Array<string>, // hide for size(s)
    offset?: number,
    first?: string,
    last?: string,
    padded?: boolean,
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
    xsStyle?: CSSObject | string,
    smStyle?: CSSObject | string,
    mdStyle?: CSSObject | string,
    lgStyle?: CSSObject | string,
    xlStyle?: CSSObject | string,

    totalCols?: number,
};

const defaultTotalCols = 12;
export const flexRowStyles = (p: FlexRowProps): Omit<CSSObject, 'flexWrap'> & {flexWrap: string | number} => {
    return {
        display: 'flex',
        boxSizing: 'border-box',
        flexDirection: 'row',
        flex: '0 1 auto',
        justifyContent: p.justify || 'left',
        flexWrap: p.wrap !== undefined ? p.wrap : 'wrap',
        alignItems: p.align || 'stretch',
        padding: p.padded ? '0.5rem' : 'initial',
        ...(p.start ? {placeContent: 'flex-start'} : {}),
        ...(p.end ? {placeContent: 'flex-end'} : {}),
        ...(p.middle ? {alignItems: 'center'} : {}),
    };
};
export const flexColStyles = (p: FlexColProps): string => {
    const totalCols = p.totalCols || defaultTotalCols;
    const queries = sizes.reduce((acc: string, s: string) => {
        let result = '';
        if (typeof(p[s]) === 'boolean' || typeof(p[s]) === 'number' || !isNaN(p[s])) {
            if (p[s] === false) {
                result += media[s]('display: none;');
            } else {
                result += media[s](`
                    flex-basis: ${(typeof(p[s]) === 'boolean' ? totalCols : p[s])/totalCols * 100}%;
                    max-width: ${(typeof(p[s]) === 'boolean' ? totalCols : p[s])/totalCols * 100}%;
                    display: initial;
                `);
            }
        } else if (typeof(p[s]) === 'string') {
            result += media[s](p[s]);
        }
        if(p[`${s}Offset`]) {
            result += media[s](`margin-left: ${(p[`${s}Offset`]/totalCols * 100)}%;`);
        }
        if(p[`${s}OffsetRight`]) {
            result += media[s](`margin-right: ${(p[`${s}OffsetRight`]/totalCols * 100)}%;`);
        }
        if(p[`${s}Style`]) {
            result += media[s](css(p[`${s}Style`]));
        }
        return acc + "  " + result;
    }, '');
    const collapsesSizes = Array.isArray(p.collapse) ?
    p.collapse.reduce((acc: string, s: string) => {
        return acc + " \n " + media[s]('display: none;');
    }, '') : '';
    const styles = `
        padding: ${p.padded ? '0.5rem' : 'initial'};
        flex: ${totalCols};
        flex-grow: 1;
        box-sizing: border-box;
        ${p.offset ? `margin-left: ${p.offset/totalCols * 100}%;` : ''}
        ${typeof(p.collapse) === 'string' ? media[p.collapse]('display: none;') : ''}
        ${collapsesSizes}
        ${queries}
    `;
    return styles;
};

