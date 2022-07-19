import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type DragIconProps = SVGIconProps;
export default function DragIcon({
    color=teal.main,
    size="medium",
    altText="Drag",
    ...props
}: DragIconProps) {
    return <SVG size={size} aria-labelledby="DragIcon" {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <title id="DragIcon" >{altText}</title>
        <path
            d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2Zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
            fill={color}
        />
    </SVG>
}
