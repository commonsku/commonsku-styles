import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type TilesIconProps = SVGIconProps & {filled?: boolean;};
export default function TilesIcon({
    color=teal.main,
    size="medium",
    filled=false,
    altText="Tiles",
    ...props
}: TilesIconProps) {
    const renderPath = filled ? "M5 11h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2ZM5 21h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2ZM13 5v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2ZM15 21h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2Z" 
    : 
    "M3 3v8h8V3H3Zm6 6H5V5h4v4Zm-6 4v8h8v-8H3Zm6 6H5v-4h4v4Zm4-16v8h8V3h-8Zm6 6h-4V5h4v4Zm-6 4v8h8v-8h-8Zm6 6h-4v-4h4v4Z";

    return <SVG size={size} aria-labelledby="TilesIcon" {...props}>
        <title id="TilesIcon" >{altText}</title>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}
