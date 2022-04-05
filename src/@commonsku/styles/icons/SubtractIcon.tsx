import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type SubtractIconProps = SVGIconProps;
export default function SubtractIcon({
    color=teal.main,
    size="medium",
    altText="Remove",
    ...props
}: SubtractIconProps) {
    return <SVG size={size} aria-labelledby="SubtractIcon" {...props}>
        <title id="SubtractIcon">{altText}</title>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1Z"
            fill={color}
        />
    </SVG>
}
