import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type MenuIconProps = SVGIconProps;
export default function MenuIcon({
    color=teal.main,
    size="medium",
    altText="Menu",
    ...props
}: MenuIconProps) {
    return <SVG size={size} aria-labelledby="MenuIcon" {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <title id="MenuIcon" >{altText}</title>
        <path
            d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1Zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1ZM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1Z"
            fill={color}
        />
    </SVG>
}
