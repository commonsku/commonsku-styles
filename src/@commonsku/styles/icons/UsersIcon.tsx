import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import {teal} from '../colors';

type UsersIconProps = SVGIconProps;
export default function UsersIcon({
    color=teal.main,
    size="medium",
    altText="Users",
    ...props
}: UsersIconProps) {
    return <SVG size={size} aria-labelledby="UsersIcon" {...props}>
        <title id="UsersIcon" >{altText}</title>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M16.67 13.13C18.04 14.06 19 15.32 19 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2c0-2.18-3.57-3.47-6.33-3.87ZM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24ZM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4ZM9 13c-2.67 0-8 1.34-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.66-5.33-4-8-4Z"
            fill={color}
        />
    </SVG>
}