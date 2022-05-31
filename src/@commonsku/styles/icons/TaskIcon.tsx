import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type TaskIconProps = SVGIconProps;
export default function TaskIcon({
    color=teal.main,
    size="medium",
    altText="Tasks",
    ...props
}: TaskIconProps) {
    return <SVG size={size} aria-labelledby="TaskIcon" {...props}>
        <title id="TaskIcon" >{altText}</title>
        <path
          d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6Zm4 18H6V4h7v5h5v11Zm-9.18-6.95L7.4 14.46 10.94 18l5.66-5.66-1.41-1.41-4.24 4.24-2.13-2.12Z"
          fill={color}
        />
    </SVG>
}

