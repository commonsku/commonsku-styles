import _ from 'lodash';
import { CSSObject, CSSPseudos, CSSProperties, css } from 'styled-components';
import { themeOptions, ThemeProps } from '../Theme';
import { MediaQueryProps, mediaQueriesStyles } from './mediaQueriesStyles';
import {
    FlexRowProps,
    FlexColProps,
    flexColStyles,
    flexRowStyles,
} from './flexboxGridStyles';
import { allowedStyles } from './allowedStyles';
import { pseudoSelectors, PseudoProps } from '../pseudos';

export interface BaseElementProps extends CSSProperties, CSSPseudos {
    theme?: ThemeProps;
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
};

export interface ElementProps extends
    BaseElementProps,
    PseudoProps<BaseElementProps> {};


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


export const parseStyleValue = (value: any, theme?: ThemeProps) => {
    theme = theme || themeOptions;
    const colorKeys = Object.keys(theme.colors);
    const fontSizesKeys = Object.keys(theme.fontSizes);
    if (typeof value !== 'string') { return value; }
    let result = value;
    for (let i = 0; i < colorKeys.length; i++) {
        const v = colorKeys[i];
        if (result.indexOf(v) !== -1) {
            result = result.replaceAll(`colors.${v}`, theme.colors[v]);
        }
    }
    for (let i = 0; i < fontSizesKeys.length; i++) {
        const v = fontSizesKeys[i];
        if (result.indexOf(v) !== -1) {
            result = result.replaceAll(`fontSize.${v}`, theme.fontSizes[v]);
        }
    }
    return result;
};

export const parseStyleObject = (styles: CSSObject, theme?: ThemeProps): CSSObject => {
    theme = theme || themeOptions;
    const result: CSSObject = {};
    for (const k in styles) {
        const s = styles[k];
        if (typeof s === 'object' && _.isPlainObject(s)) {
            result[k] = parseStyleObject(s, theme);
        } else {
            result[k] = parseStyleValue(s, theme);
        }
    }
    return result;
};

export const parseStyleString = (styles: string, theme?: ThemeProps): string => {
    const _theme = theme || themeOptions;
    const colorKeys = Object.keys(_theme.colors);
    const fontSizesKeys = Object.keys(_theme.fontSizes);
    let result = styles;
    if (!_.isEmpty(result)) {
        colorKeys.forEach(k => {
            result = result.replaceAll(`colors.${k}`, _theme.colors[k]);
        });
        fontSizesKeys.forEach(k => {
            result = result.replaceAll(`fontSize.${k}`, _theme.fontSizes[k]);
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
                styles[pseudoSelectors[k]] = parseStyleObject(props[k], props.theme);
            } else {
                styles[pseudoSelectors[k]] = parseStyleValue(props[k], props.theme);
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
