import _ from 'lodash';
import { CSSObject, CSSPseudos, CSSProperties, css } from 'styled-components';
import { themeOptions } from '../Theme';
import { MediaQueryProps, mediaQueriesStyles } from './mediaQueriesStyles';
import {
    FlexRowProps,
    FlexColProps,
    flexColStyles,
    flexRowStyles,
} from './flexboxGridStyles';
import { allowedStyles } from './allowedStyles';
import { pseudoSelectors } from '../pseudos';

export type ElementProps = {
    flexRow?: FlexRowProps;
    flexCol?: FlexColProps;
    mediaQueries?: Array<MediaQueryProps>;
    sx?: CSSObject | string;

    // aliases
    bg?: string;
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
    clearfix?: boolean;
    pos?: string;
    z?: string;
} | CSSProperties | CSSPseudos;

export const sizeStyleFunc = (keys: string | Array<string>) => (v: string | number) => (
    typeof keys === 'string' ? ({[keys]: v}) : keys.reduce(
        (acc: {[k: string]: string | number}, key: string) => ({...acc, [key]: v}),
        {}
    )
);

export const elementPropsConfig = {
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
    clearfix: () => ({
        ':after': {
            content: '',
            display: 'table',
            clear: 'both',
        },
    }),
    pos: (v: string) => ({position: v}),
    overflow: (v: string) => ({overflow: v}),
    z: (v: number | string) => ({zIndex: v}),
    sx: (styles: CSSObject | string) => styles,
};


const colorKeys = Object.keys(themeOptions.colors);
const fontSizesKeys = Object.keys(themeOptions.fontSizes);
export const parseStyleValue = (value: any) => {
    if (typeof value !== 'string') { return value; }
    let result = value;
    for (let i = 0; i < colorKeys.length; i++) {
        const v = colorKeys[i];
        if (value.indexOf(v) !== -1) {
            result = value.replaceAll(`colors.${v}`, themeOptions.colors[v]);
        }
    }
    for (let i = 0; i < fontSizesKeys.length; i++) {
        const v = fontSizesKeys[i];
        if (value.indexOf(v) !== -1) {
            result = value.replaceAll(`fontSize.${v}`, themeOptions.fontSizes[v]);
        }
    }
    return result;
};

export const parseStyleObject = (styles: CSSObject): CSSObject => {
    const result: CSSObject = {};
    for (const k in styles) {
        const s = styles[k];
        if (typeof s === 'object') {
            result[k] = parseStyleObject(s);
        } else {
            result[k] = parseStyleValue(s);
        }
    }
    return result;
};

export const parseStyleString = (styles: string): string => {
    let result = styles;
    if (!_.isEmpty(result)) {
        colorKeys.forEach(k => {
            result = result.replaceAll(`colors.${k}`, themeOptions.colors[k]);
        });
        fontSizesKeys.forEach(k => {
            result = result.replaceAll(`fontSize.${k}`, themeOptions.fontSizes[k]);
        });
    }
    return result;
};

export const parseProps = (props: ElementProps) => {
    let styles: CSSObject = {};
    let stringStyles = '';
    for(const k in props) {
        if (!allowedStyles[k] && !elementPropsConfig[k] && !pseudoSelectors[k]) {
            continue;
        }

        if (pseudoSelectors[k]) {
            if (typeof props[k] === 'object') {
                styles[pseudoSelectors[k]] = parseStyleObject(props[k]);
            } else {
                styles[pseudoSelectors[k]] = parseStyleValue(props[k]);
            }
        } else if (elementPropsConfig[k]) {
            const sx = elementPropsConfig[k](props[k]);
            if (typeof sx === 'object') {
                styles = parseStyleObject({...styles, ...sx});
            } else if (typeof sx === 'string') {
                stringStyles += "  " + parseStyleString(sx);
            } else {
                stringStyles += "  " + sx;
            }
        } else {
            styles[k] = parseStyleValue(props[k]);
        }
    }

    return [css(styles), css`${stringStyles}`];
}
