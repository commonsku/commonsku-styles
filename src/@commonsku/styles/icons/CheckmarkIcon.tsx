import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type CheckmarkIconProps = SVGIconProps;
export default function CheckmarkIcon({
    color=teal.main,
    size="medium",
    altText="Checkmark",
    ...props
}: CheckmarkIconProps) {
    return <SVG size={size} aria-labelledby="CheckmarkIcon" {...props}>
        <title id="CheckmarkIcon" >{altText}</title>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="m8.795 15.875-3.47-3.47a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0l10.58-10.58a.996.996 0 1 0-1.41-1.41l-9.88 9.87Z"
            fill={color}
        />
    </SVG>
}
