import React, { useMemo } from 'react';
import { getSvgSizeStyles, SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type UnsplashIconProps = SVGIconProps & { color?: string };
export default function UnsplashIcon({
    color=teal.main,
    size="medium",
    altText="Unsplash",
    ...props
}: UnsplashIconProps) {
    const { style, viewBox } = useMemo(
        () => getSvgSizeStyles({
            height: props.height,
            iconSizes: props.iconSizes,
            pointer: props.pointer,
            size,
            viewBox: props.viewBox,
            width: props.width,
        }),
        [size, props.width, props.height, props.iconSizes, props.pointer, props.viewBox]
    );
    return <svg {...props} aria-labelledby="UnsplashIcon" viewBox={viewBox} style={{...style, ...props.style}}>
        <title id="UnsplashIcon">{altText}</title>
        <g clip-path="url(#clip0_1807_14536)">
            <path d="M6.25 5.625V0H13.75V5.625H6.25ZM13.75 8.75H20V20H0V8.75H6.25V14.375H13.75V8.75Z" fill={color} />
        </g>
        <defs>
            <clipPath id="clip0_1807_14536">
                <rect width={style.width || 20} height={style.height || 20} fill="white" />
            </clipPath>
        </defs>
    </svg>
}


