import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type CalendarIconProps = SVGIconProps;
export default function CalendarIcon({
    color=teal.main,
    size="medium",
    altText="Date picker",
    ...props
}: CalendarIconProps) {
    return <SVG size={size} aria-labelledby="CalendarIcon" {...props}>
        <title id="CalendarIcon">{altText}</title>
        <path
          d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm-1 16H6c-.55 0-1-.45-1-1V9h14v10c0 .55-.45 1-1 1ZM8 11h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1Z"
          fill={color}
        />
    </SVG>
}


