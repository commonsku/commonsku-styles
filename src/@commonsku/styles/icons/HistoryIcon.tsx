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
        <path fill="none" d="M0 0h24v24H0z" />
        <title id="HistoryIcon" >{altText}</title>
        <path
            d="M12.5 0C7.53 0 3.5 4.03 3.5 9H0.5L4.39 12.89L4.46 13.03L8.5 9H5.5C5.5 5.13 8.63 2 12.5 2C16.37 2 19.5 5.13 19.5 9C19.5 12.87 16.37 16 12.5 16C10.57 16 8.82 15.21 7.56 13.94L6.14 15.36C7.77 16.99 10.01 18 12.5 18C17.47 18 21.5 13.97 21.5 9C21.5 4.03 17.47 0 12.5 0ZM11.5 5V10L15.75 12.52L16.52 11.24L13 9.15V5H11.5Z"
            fill={color}
        />
    </SVG>
}