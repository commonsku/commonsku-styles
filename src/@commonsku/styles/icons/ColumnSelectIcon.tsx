import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type ColumnSelectIconProps = SVGIconProps;
export default function ColumnSelectIcon({
    color=teal.main,
    size="medium",
    altText="Select Columns",
    ...props
}: ColumnSelectIconProps) {
    return <SVG size={size} aria-labelledby="ColumnSelectIcon" {...props}>
        <title id="ColumnSelectIcon" >{altText}</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.325 20.959V3.09h11.131c.26 0 .47.21.47.47v16.929c0 .26-.21.47-.47.47H9.325Zm5.008-.94V6.654H9.638v13.365h4.695Zm5.653-13.365h-4.695v13.365h4.695V6.654ZM9.638 4.03v1.684h4.695V4.03H9.638Zm5.653 0v1.684h4.693V4.03h-4.693Z"
          fill="#02C0DA"
        />
        <path
          d="M9.167 3.565h-5.65v16.93h5.65V3.564Z"
          fill="#E91B70"
          fillOpacity={0.25}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.01 6.368c-.023-.057 0-.119 0-.184V3.56c0-.26.21-.47.47-.47h6.156v17.874H3.518c-.26 0-.507-.21-.507-.47V6.368Zm5.687.286h-4.71v13.37h4.71V6.655Z"
          fill="#E91B70"
        />
    </SVG>
}
