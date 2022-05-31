import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type AddNoteIconProps = SVGIconProps;
export default function AddNoteIcon({
    color=teal.main,
    size="medium",
    altText="Add Note",
    ...props
}: AddNoteIconProps) {
    return <SVG size={size} aria-labelledby="AddNoteIcon" {...props}>
        <title id="AddNoteIcon" >{altText}</title>
        <path
          d="M6 2h8l6 6v4h-2V9h-5V4H6v16h6v2H5.99C4.89 22 4 21.1 4 20V4c0-1.1.9-2 2-2Zm2 10h8v2H8v-2Zm0 4h4v2H8v-2Zm10 0a1 1 0 1 1 2 0v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2Z"
          fill={color}
        />
    </SVG>
}

