import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type MailIconProps = SVGIconProps & {filled?: boolean};
export default function MailIcon({
    color=teal.main,
    size="medium",
    filled=false,
    altText="Mail",
    ...props
}: MailIconProps) {
    const renderPath = filled ? "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
    : 
    "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6Zm-2 0-8 5-8-5h16Zm0 12H4V8l8 5 8-5v10Z"

    return <SVG size={size} aria-labelledby="MailIcon" {...props} >
        
        <title id="MailIcon" >{altText}</title>
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}

