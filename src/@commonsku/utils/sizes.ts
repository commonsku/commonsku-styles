export const mediaSizes = {
    xs: "@media only screen and (min-width: 0px)",
    sm: "@media only screen and (min-width: 640px)",
    md: "@media only screen and (min-width: 768px)",
    lg: "@media only screen and (min-width: 1024px)",
    xl: "@media only screen and (min-width: 1280px)",
};

export const media: {[key: string]: Function} = {
    xs: (styles: any) => `
        ${mediaSizes.xs} {
            ${styles}
        }
    `,
    sm: (styles: any) => `
        ${mediaSizes.sm} {
            ${styles}
        }
    `,
    md: (styles: any) => `
        ${mediaSizes.md} {
            ${styles}
        }
    `,
    lg: (styles: any) => `
        ${mediaSizes.lg} {
            ${styles}
        }
    `,
    xl: (styles: any) => `
        ${mediaSizes.xl} {
            ${styles}
        }
    `,
};

export const sizes: Array<string> = Object.keys(media);
