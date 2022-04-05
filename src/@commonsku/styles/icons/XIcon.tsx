import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type XIconProps = SVGIconProps;
export default function XIcon({
    color=teal.main,
    size="medium",
    altText="X",
    ...props
}: XIconProps) {
    return <SVG size={size} aria-labelledby="XIcon" {...props}>
        <title id="XIcon" >{altText}</title>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4Z"
            fill={color}
        />
    </SVG>
}
