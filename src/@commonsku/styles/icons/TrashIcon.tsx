import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type TrashIconProps = SVGIconProps & {filled?: boolean, pinned?: boolean;};
export default function TrashIcon({
    color=teal.main,
    size="medium",
    filled=false,
    pinned,
    altText="Delete",
    ...props
}: TrashIconProps) {
    const renderPath = filled ? "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z"
    : 
    "M16 9v10H8V9h8Zm-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1ZM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7Z";

    return <SVG size={size} aria-labelledby="TrashIcon" {...props} >
        
        <title id="TrashIcon" >{altText}</title>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}
