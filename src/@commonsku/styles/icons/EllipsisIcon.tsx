import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type EllipsisIconProps = SVGIconProps;
export default function EllipsisIcon({
    color=teal.main,
    size="medium",
    altText="More",
    ...props
}: EllipsisIconProps) {
    return <SVG size={size} aria-labelledby="EllipsisIcon" {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <title id="EllipsisIcon" >{altText}</title>
        <path
            d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
            fill={color}
        />
    </SVG>
}
