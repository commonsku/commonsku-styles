import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type SearchIconProps = SVGIconProps;
export default function SearchIcon({
    color=teal.main,
    size="medium",
    altText="Search",
    ...props
}: SearchIconProps) {
    return <SVG size={size} aria-labelledby="SearchIcon" {...props}>
        <title id="SearchIcon" >{altText}</title>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M15.977 14.472h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49l-4.24-4.26Zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5Z"
            fill={color}
        />
    </SVG>
}
