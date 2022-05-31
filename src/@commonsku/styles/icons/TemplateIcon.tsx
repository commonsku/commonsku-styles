import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type TemplateIconProps = SVGIconProps & {filled?: boolean};
export default function TemplateIcon({
    color=teal.main,
    size="medium",
    filled=false,
    altText="Template",
    ...props
}: TemplateIconProps) {
    const renderPath = filled ? "M15 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V9l-6-6ZM8 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm6 1V4.5l5.5 5.5H14Z"
    : 
    "M15 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V9l-6-6ZM5 19V5h9v5h5v9H5ZM9 8c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Zm0 4c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Zm0 4c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Z"

    return <SVG size={size} aria-labelledby="TemplateIcon" {...props} >
        
        <title id="TemplateIcon" >{altText}</title>
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}

