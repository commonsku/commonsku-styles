import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import {teal} from '../colors';

type UserIconProps = SVGIconProps;
export default function UserIcon({
    color=teal.main,
    size="medium",
    altText="User",
    ...props
}: UserIconProps) {
    return <SVG size={size} aria-labelledby="UserIcon" {...props}>
        <title id="UserIcon" >{altText}</title>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4Z"
            fill={color}
        />
    </SVG>
}
