import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type SlideInIconProps = SVGIconProps & {hover?:boolean, filled?: boolean;};
export default function StarIcon({
    color=teal.main,
    size="medium",
    hover=false,
    filled=false,
    altText="Open panel",
    ...props
}: SlideInIconProps) {

    return <SVG size={size} aria-labelledby="SlideInIcon" {...props} >
        <title id="SlideInIcon" >{altText}</title>
        <path d="M3 20.99L21 20.99C22.1 20.99 23 20.09 23 18.99L23 15L21 15L21 19.01L3 19.01L3 4.97999L21 4.97999L21 8.99999L23 8.99999L23 4.98999C23 3.88999 22.1 3.00999 21 3.00999L3 3.00999C1.9 3.00999 1 3.88999 1 4.98999L1 18.99C1 20.1 1.9 20.99 3 20.99ZM13 7.99999L9 12L13 16L13 13L23 13L23 11L13 11L13 7.99999ZM3 20.99L21 20.99C22.1 20.99 23 20.09 23 18.99L23 15L21 15L21 19.01L3 19.01L3 4.97999L21 4.97999L21 8.99999L23 8.99999L23 4.98999C23 3.88999 22.1 3.00999 21 3.00999L3 3.00999C1.9 3.00999 1 3.88999 1 4.98999L1 18.99C1 20.1 1.9 20.99 3 20.99ZM13 7.99999L9 12L13 16L13 13L23 13L23 11L13 11L13 7.99999Z" fill={color}/>
    </SVG>
}

