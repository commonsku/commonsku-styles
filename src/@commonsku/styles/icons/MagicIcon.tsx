import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type MagicIconProps = SVGIconProps & {hover?:boolean, filled?: boolean;};
export default function MagicIcon({
    color=teal.main,
    size="medium",
    hover=false,
    filled=false,
    altText="AI",
    ...props
}: MagicIconProps) {

    return <SVG size={size} aria-labelledby="MagicIcon" {...props} >
        <title id="MagicIcon" >{altText}</title>
        <path d="M19 9L20.25 6.25L23 5L20.25 3.75L19 1L17.75 3.75L15 5L17.75 6.25L19 9Z" fill={color}/>
        <path d="M19 15L17.75 17.75L15 19L17.75 20.25L19 23L20.25 20.25L23 19L20.25 17.75L19 15Z" fill={color}/>
        <path d="M11.5 9.5L9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5ZM9.99 12.99L9 15.17L8.01 12.99L5.83 12L8.01 11.01L9 8.83L9.99 11.01L12.17 12L9.99 12.99Z" fill={color}/>
    </SVG>
}

