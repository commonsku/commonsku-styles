import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { errors } from '../colors';

type AlertIconProps = SVGIconProps & {filled?: boolean;};
export default function AlertIcon({
    color=errors.main,
    size="medium",
    filled=false,
    altText="Alert",
    ...props
}: AlertIconProps) {
    const renderPath = filled ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1Zm1 4h-2v-2h2v2Z"
    : 
    "M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1Zm-.01-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2ZM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Zm1-3h-2v-2h2v2Z";

    return <SVG size={size} aria-labelledby="AlertIcon" {...props}>
        <title id="AlertIcon" >{altText}</title>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}

