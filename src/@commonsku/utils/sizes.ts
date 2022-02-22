import { CSSObject } from "styled-components";

export const media: {[key: string]: Function} = {
    xs: (styles: string | CSSObject) => `
        @media only screen and (min-width: 0px) {
            ${styles}
        }
    `,
    sm: (styles: string | CSSObject) => `
        @media only screen and (min-width: 640px) {
            ${styles}
        }
    `,
    md: (styles: string | CSSObject) => `
        @media only screen and (min-width: 768px) {
            ${styles}
        }
    `,
    lg: (styles: string | CSSObject) => `
        @media only screen and (min-width: 1024px) {
            ${styles}
        }
    `,
    xl: (styles: string | CSSObject) => `
        @media only screen and (min-width: 1280px) {
            ${styles}
        }
    `,
};

export type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const sizes: TSize[] = Object.keys(media) as TSize[];
