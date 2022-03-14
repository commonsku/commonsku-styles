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

export type TIconSizeObj = typeof iconSize;
export type TIconSize = keyof typeof iconSize;

export type SVGIconProps = {
    size?: TIconSize;
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    iconSizes?: TIconSizeObj;
    style?: CSSObject;
};
const SVG = styled.svg.attrs<SVGIconProps>(p => {
    const iconSizes = p.iconSizes || iconSize;
    const size = p.size ? iconSizes[p.size] : null;
    if (size) {
        return {
            viewBox: size.viewBox,
        };
    }
    const defaultSize = iconSizes['default'];
    return {
        viewBox: p.viewBox || defaultSize.viewBox,
    };
})<SVGIconProps>(
    p => {
        const styles: CSSObject = {};
        const iconSizes = p.iconSizes || iconSize;
        const size = p.size ? iconSizes[p.size] : null;
        if (size) {
            styles['height'] = size.height;
            styles['width'] = size.width;
        } else {
            const defaultSize = iconSizes['default'];
            styles['height'] = p.height !== undefined && p.height !== '' ? p.height : defaultSize.height;
            styles['width'] = p.width !== undefined && p.width !== '' ? p.width : defaultSize.width;
        }
        return styles;
    },
);

export default SVG;
