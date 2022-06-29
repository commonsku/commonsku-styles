import { CSSObject, css } from "styled-components";

export const media: {[key: string]: ((value: string | CSSObject) => string)} = {
    xs: (styles: string | CSSObject) => `
        @media only screen and (min-width: 0px) {
            ${typeof styles === 'string' ? css`${styles}` : css(styles)}
        }
    `,
    sm: (styles: string | CSSObject) => `
        @media only screen and (min-width: 640px) {
            ${typeof styles === 'string' ? css`${styles}` : css(styles)}
        }
    `,
    md: (styles: string | CSSObject) => `
        @media only screen and (min-width: 768px) {
            ${typeof styles === 'string' ? css`${styles}` : css(styles)}
        }
    `,
    lg: (styles: string | CSSObject) => `
        @media only screen and (min-width: 1024px) {
            ${typeof styles === 'string' ? css`${styles}` : css(styles)}
        }
    `,
    xl: (styles: string | CSSObject) => `
        @media only screen and (min-width: 1280px) {
            ${typeof styles === 'string' ? css`${styles}` : css(styles)}
        }
    `,
};

export type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const sizes: TSize[] = Object.keys(media) as TSize[];
