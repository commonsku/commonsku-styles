import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type AddTaskIconProps = SVGIconProps;
export default function AddTaskIcon({
    color=teal.main,
    size="medium",
    altText="Add Task",
    ...props
}: AddTaskIconProps) {
    return <SVG size={size} aria-labelledby="AddTaskIcon" {...props}>
        <title id="AddTaskIcon" >{altText}</title>
        <path
          d="M6 2h8l6 6v4h-2V9h-5V4H6v16h6v2H5.99C4.89 22 4 21.1 4 20l.01-16c0-1.1.89-2 1.99-2Zm1.4 12.46 1.42-1.41 2.13 2.12 4.24-4.24 1.41 1.41L10.94 18 7.4 14.46ZM18 16a1 1 0 1 1 2 0v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2Z"
          fill={color}
        />
    </SVG>
}

