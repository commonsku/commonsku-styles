import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type NoteIconProps = SVGIconProps;
export default function NoteIcon({
    color=teal.main,
    size="medium",
    altText="Notes",
    ...props
}: NoteIconProps) {
    return <SVG size={size} aria-labelledby="NoteIcon" {...props}>
        <title id="NoteIcon" >{altText}</title>
        <path
          d="M8 16h8v2H8v-2Zm0-4h8v2H8v-2Zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6Zm4 18H6V4h7v5h5v11Z"
          fill={color}
        />
    </SVG>
}

