export const media: {[key: string]: Function} = {
    xs: (styles: any) => `
        @media only screen and (max-width: 480px) {
            ${styles}
        }
    `,
    sm: (styles: any) => `
        @media only screen and (max-width: 640px) {
            ${styles}
        }
    `,
    md: (styles: any) => `
        @media only screen and (max-width: 768px) {
            ${styles}
        }
    `,
    lg: (styles: any) => `
        @media only screen and (max-width: 1024px) {
            ${styles}
        }
    `,
    xl: (styles: any) => `
        @media only screen and (min-width: 1025px) {
            ${styles}
        }
    `,
};

export const sizes: Array<string> = Object.keys(media);
