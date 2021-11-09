import { css, CSSObject, } from 'styled-components';

export type MediaQueryProps = {
    minWidth?: string|number;
    maxWidth?: string|number;
    query?: string;
    style: CSSObject | string;
};

/**
 * mediaQueriesStyles
 * 
 * <Element mediaQueries={[
 *   {minWidth: 0, maxWidth: 640px, style: {color: 'red', marginTop: 12, width: '20%',}},
 *   {query: 'only screen and (min-width: 0px) and (max-width: 640px)', style: `color: red; margin-top: 12; width: 20%;`},
 * ]} />
 * 
 * @param {Array<MediaQueryProps>} p 
 * @returns {string}
 */
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
