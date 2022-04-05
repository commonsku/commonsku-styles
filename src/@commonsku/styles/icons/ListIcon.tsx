import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type ListIconProps = SVGIconProps;
export default function ListIcon({
    color=teal.main,
    size="medium",
    altText="List",
    ...props
}: ListIconProps) {
    return <SVG size={size} aria-labelledby="ListIcon" {...props}>
        <title id="ListIcon">{altText}</title>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M4 13c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1Zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1Zm0-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1Zm4 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1Zm0 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1ZM7 8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1Zm-3 5c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1Zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1Zm0-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1Zm4 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1Zm0 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1ZM7 8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1Z"
            fill={color}
        />
    </SVG>
}

