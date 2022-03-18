import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import colors, { primary1 } from '../colors';

type CheckmarkOnlyIconProps = SVGIconProps & { fill?: string;};
export default function CheckmarkOnlyIcon({
    fill=primary1.main,
    ...props
}: CheckmarkOnlyIconProps) {
    return <SVG {...props}>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="m8.795 15.875-3.47-3.47a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0l10.58-10.58a.996.996 0 1 0-1.41-1.41l-9.88 9.87Z"
            fill={fill}
        />
    </SVG>
}
