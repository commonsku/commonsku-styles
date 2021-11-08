import styled, { css, CSSObject, CSSPseudos, CSSProperties } from 'styled-components';
import { sizes, media } from '../utils';
import { pseudoSelectors } from './pseudos';


export type FlexRowProps = {
    justify?: string,
    wrap?: string, // 'wrap', 'nowrap', 'wrap-reverse', ...
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
};
export type MediaQueryProps = {
    minWidth?: string;
    maxWidth?: string;
    query?: string;
    style: CSSObject | string;
};

export const flexRowStyles = (p: FlexRowProps): CSSObject => {
    return {
        display: 'flex',
        boxSizing: 'border-box',
        flexDirection: 'row',
        flex: '0 1 auto',
        justifyContent: p.justify || 'left',
        flexErap: p.wrap || 'wrap',
        alignItems: p.align || 'stretch',
        padding: p.padded ? '0.5rem' : 'initial',
        ...(p.start ? {placeContent: 'flex-start'} : {}),
        ...(p.end ? {placeContent: 'flex-end'} : {}),
        ...(p.middle ? {alignItems: 'center'} : {}),
    };
};
export const flexColStyles = (p: FlexColProps): string => {
    const styles = `
        padding: ${p.padded ? '0.5rem' : 'initial'};
        flex: 12;
        flex-grow: 1;
        box-sizing: border-box;
        ${p.offset && `margin-left: ${p.offset/12 * 100}%;`}
        ${typeof(p.collapse) === 'string' && media[p.collapse]('display: none;')}
        ${typeof(p.collapse) === 'object' && Array.isArray(p.collapse) &&
            p.collapse.reduce((acc: string, s: string) => {
                return acc + " \n " + media[s]('display: none;');
            }, '')}
        ${sizes.reduce((acc: string, s: string) => {
            let result = '';
            if (typeof(p[s]) === 'boolean' || typeof(p[s]) === 'number' || !isNaN(p[s])) {
                if (p[s] === false) {
                    result += media[s]('display: none;');
                } else {
                    result += media[s](`
                        flex-basis: ${(typeof(p[s]) === 'boolean' ? 12 : p[s])/12 * 100}%;
                        max-width: ${(typeof(p[s]) === 'boolean' ? 12 : p[s])/12 * 100}%;
                        display: initial;
                    `);
                }
            } else if (typeof(p[s]) === 'string') {
                result += media[s](p[s]);
            }
            if(p[`${s}Offset`]) {
                result += media[s](`margin-left: ${(p[`${s}Offset`]/12 * 100)}%;`);
            }
            if(p[`${s}OffsetRight`]) {
                result += media[s](`margin-right: ${(p[`${s}OffsetRight`]/12 * 100)}%;`);
            }
            if(p[`${s}Style`]) {
                result += media[s](css(p[`${s}Style`]));
            }
            return acc + "  " + result;
        }, '')}
    `;
    return styles;
};

export const mediaQueriesStyles = (p: Array<MediaQueryProps>): string => {
    const results = p.map(q => {
        const isMinWidth = q.minWidth !== undefined && q.minWidth !== null;
        const isMaxWidth = q.maxWidth !== undefined && q.maxWidth !== null;
        const isQuery = q.query !== undefined && q.query !== null && q.query !== '';
        let result = "";

        if (isQuery) {
            result += `
                @media ${q.query} {
                    ${typeof q.style === 'object' ? css(q.style) : q.style}
                }
            `;
        }
        if (isMinWidth && isMaxWidth) {
            result += `
                @media only screen and (min-width: ${q.minWidth}) and (max-width: ${q.maxWidth}) {
                    ${typeof q.style === 'object' ? css(q.style) : q.style}
                }
            `;
        }
        if (isMinWidth) {
            result += `
                @media only screen and (min-width: ${q.minWidth}) {
                    ${typeof q.style === 'object' ? css(q.style) : q.style}
                }
            `;
        }
        if (isMaxWidth) {
            result += `
                @media only screen and (max-width: ${q.maxWidth}) {
                    ${typeof q.style === 'object' ? css(q.style) : q.style}
                }
            `;
        }

        return result;
    });

    return results.reduce((acc: string, v: string) => acc + '  ' + v, '');
}

export type CskuProps = {
    flexRow?: FlexRowProps;
    flexCol?: FlexColProps;
    bg?: string;
    mediaQueries?: Array<MediaQueryProps>;
    sx?: CSSObject | string;

    // aliases
    h?: string | number;
    w?: string | number;
    pt?: string | number;
    pr?: string | number;
    pb?: string | number;
    pl?: string | number;
    px?: string | number;
    py?: string | number;
    mt?: string | number;
    mr?: string | number;
    mb?: string | number;
    ml?: string | number;
    mx?: string | number;
    my?: string | number;
    grid?: boolean;
    float?: 'left' | 'right' | 'none' | 'clearfix';
    pos?: string;
    z?: string;
} | CSSProperties | CSSPseudos;

const sizeStyleFunc = (keys: string | Array<string>) => (v: string | number) => (
    typeof keys === 'string' ? ({[keys]: v}) : keys.reduce(
        (acc: {[k: string]: string | number}, key: string) => ({...acc, [key]: v}),
        {}
    )
);

const config = {
    flexRow: flexRowStyles,
    flexCol: flexColStyles,
    mediaQueries: mediaQueriesStyles,
    bg: (v: string) => ({background: v}),
    h: sizeStyleFunc('height'),
    w: sizeStyleFunc('width'),
    pt: sizeStyleFunc('paddingTop'),
    pr: sizeStyleFunc('paddingRight'),
    pb: sizeStyleFunc('paddingBottom'),
    pl: sizeStyleFunc('paddingLeft'),
    px: sizeStyleFunc(['paddingLeft', 'paddingRight']),
    py: sizeStyleFunc(['paddingTop', 'paddingBottom']),
    mt: sizeStyleFunc('marginTop'),
    mr: sizeStyleFunc('marginRight'),
    mb: sizeStyleFunc('marginBottom'),
    ml: sizeStyleFunc('marginLeft'),
    mx: sizeStyleFunc(['marginLeft', 'marginRight']),
    my: sizeStyleFunc(['marginTop', 'marginBottom']),
    grid: () => ({display: 'grid'}),
    float: (v: 'left' | 'right' | 'none' | 'clearfix') => `${v === 'clearfix' ? `
        &::after {
            content: "";
            display: table;
            clear: both;
        }` : `float: ${v}`};`,
    pos: (v: string) => ({position: v}),
    overflow: (v: string) => ({overflow: v}),
    z: (v: number | string) => ({zIndex: v}),
    sx: (styles: CSSObject | string) => styles,
};

const Csku = styled.div.attrs<CskuProps>({})<CskuProps>(
    {boxSizing: 'border-box'},
    (props: CskuProps) => {
        let styles: CSSObject = {};
        let stringStyles = '';
        for(const k in props) {
            if (pseudoSelectors[k]) {
                styles[pseudoSelectors[k]] = props[k];
            } else if (config[k]) {
                const sx = config[k](props[k]);
                if (typeof sx === 'object') {
                    styles = {...styles, ...sx,};
                } else {
                    stringStyles += "  " + sx;
                }
            } else {
                styles[k] = props[k];
            }
        }

        return [css(styles), stringStyles];
    }
);

export default Csku;
