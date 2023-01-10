import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type CollaborateIconProps = SVGIconProps;
export default function CollaborateIcon({
    color=teal.main,
    size="medium",
    altText="Collaborate",
    ...props
}: CollaborateIconProps) {
    return <SVG size={size} aria-labelledby="CollaborateIcon" {...props}>
        <title id="CollaborateIcon" >{altText}</title>
        <path
          d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2ZM14.85 13.1L14 13.7V16H10V13.7L9.15 13.1C7.8 12.16 7 10.63 7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 10.63 16.2 12.16 14.85 13.1Z"
          fill={color}
        />
    </SVG>
}