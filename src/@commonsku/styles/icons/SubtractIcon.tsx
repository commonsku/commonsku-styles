import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { primary1 } from '../colors';

type SubtractIconProps = SVGIconProps;
export default function SubtractIcon({
    color=primary1.main,
    size="medium",
    ...props
}: SubtractIconProps) {
    return <SVG size={size} {...props}>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1Z"
            fill={color}
        />
    </SVG>
}
