import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type AddIconProps = SVGIconProps;
export default function AddIcon({
    color=teal.main,
    size="medium",
    altText="Add",
    ...props
}: AddIconProps) {
    return <SVG size={size} aria-labelledby="AddIcon" {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <title id="AddIcon" >{altText}</title>
        <path
            d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1Z"
            fill={color}
        />
    </SVG>
}
