import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type HistoryIcon = SVGIconProps;
export default function HistoryIcon({
    color=teal.main,
    size="medium",
    altText="Credit Card",
    ...props
}: HistoryIcon) {
    return <SVG size={size} aria-labelledby="HistoryIcon" {...props}>
        <title id="HistoryIcon" >{altText}</title>
        <path
            d="M13.5 3C8.53 3 4.5 7.03 4.5 12H1.5L5.39 15.89L5.46 16.03L9.5 12H6.5C6.5 8.13 9.63 5 13.5 5C17.37 5 20.5 8.13 20.5 12C20.5 15.87 17.37 19 13.5 19C11.57 19 9.82 18.21 8.56 16.94L7.14 18.36C8.77 19.99 11.01 21 13.5 21C18.47 21 22.5 16.97 22.5 12C22.5 7.03 18.47 3 13.5 3ZM12.5 8V13L16.75 15.52L17.52 14.24L14 12.15V8H12.5Z"
            fill={color}
        />
    </SVG>
}




