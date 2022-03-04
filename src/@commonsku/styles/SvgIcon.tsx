import styled, { StyledComponent, CSSObject } from 'styled-components';

export const iconSize = {
    tiny: {
        width: 14,
        height: 14,
        viewBox: "0 0 24 24",
    },
    small: {
        width: 16,
        height: 16,
        viewBox: "0 0 24 24",
    },
    medium: {
        width: 24,
        height:24,
        viewBox: "0 0 24 24",
    },
    large: {
        width: 32,
        height:32,
        viewBox: "0 0 24 24",
    },
    huge: {
        width: 48,
        height:48,
        viewBox: "0 0 24 24",
    },
    default: {
        height: 24,
        width: 24,
        viewBox: "0 0 24 24",
    },
};

export type SVGProps = {
    size?: string;
    width?: string | number;
    height?: string | number;
    viewBox?: string;
};
const SVG = styled.svg<SVGProps>`
    ${p => {
        const styles: CSSObject = {};
        const size = p.size ? iconSize[p.size] : null;
        if (size) {
            styles['height'] = size.height;
            styles['width'] = size.width;
        } else {
            const defaultSize = iconSize['default'];
            styles['height'] = p.height || defaultSize.height;
            styles['width'] = p.width || defaultSize.width;
        }
        return styles;
    }}
`;

export default SVG;