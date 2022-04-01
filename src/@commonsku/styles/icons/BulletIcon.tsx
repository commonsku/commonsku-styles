import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { primary1 } from '../colors';

type BulletIconProps = SVGIconProps;
export default function BulletIcon({
    color=primary1.main,
    size="medium",
    ...props
}: BulletIconProps) {
    return <SVG size={size} {...props}>
        <circle cx={12} cy={12} r={7} fill={color} />
    </SVG>
}

