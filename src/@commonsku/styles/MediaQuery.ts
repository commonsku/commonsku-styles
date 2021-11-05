import styled, { css, CSSObject } from 'styled-components';

export type MediaQueryProps = {
    minWidth?: string;
    maxWidth?: string;
    query?: string;
    style: CSSObject | string;
};
const MediaQueryWrapper = styled.div<{
    queries: Array<MediaQueryProps>,
}>`
    ${p => p.queries.map(q => {
        const isMinWidth = q.minWidth !== undefined && q.minWidth !== null;
        const isMaxWidth = q.maxWidth !== undefined && q.maxWidth !== null;
        const isQuery = q.query !== undefined && q.query !== null && q.query !== '';

        if (isQuery) {
            return `
                @media ${q.query} {
                    ${typeof q.style === 'object' ? css(q.style) : q.style}
                }
            `;
        }
        if (isMinWidth && isMaxWidth) {
            const res = `
                @media only screen and (min-width: ${q.minWidth}) and (max-width: ${q.maxWidth}) {
                    ${typeof q.style === 'object' ? css(q.style) : q.style}
                }
            `;
            return res;
        }
        if (isMinWidth) {
            return `
                @media only screen and (min-width: ${q.minWidth}) {
                    ${typeof q.style === 'object' ? css(q.style) : q.style}
                }
            `;
        }
        if (isMaxWidth) {
            return `
                @media only screen and (max-width: ${q.maxWidth}) {
                    ${typeof q.style === 'object' ? css(q.style) : q.style}
                }
            `;
        }

        return '';
    })}
`;

export default MediaQueryWrapper;
