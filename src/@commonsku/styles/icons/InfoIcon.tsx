import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type InfoIconProps = SVGIconProps & {filled?: boolean, pinned?: boolean;};
export default function InfoIcon({
    color=teal.main,
    size="medium",
    filled=false,
    pinned,
    altText="Information",
    ...props
}: InfoIconProps) {
    const renderPath = filled ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"
    : 
    "M11 7h2v2h-2V7Zm0 4h2v6h-2v-6Zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z"

    return <SVG size={size} aria-labelledby="InfoIcon" {...props} >
        
        <title id="InfoIcon" >{altText}</title>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}

