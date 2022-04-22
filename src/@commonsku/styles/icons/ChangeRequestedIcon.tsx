import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { pink } from '../colors';

type ChangeRequestedIconProps = SVGIconProps;
export default function ChangeRequestedIcon({
    color=pink.main,
    size="medium",
    altText="Change Requested",
    ...props
}: ChangeRequestedIconProps) {
    return <SVG size={size} aria-labelledby="ChangeRequestedIcon" {...props}>
        <title id="ChangeRequestedIcon" >{altText}</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m12.002 10.588 7.337-7.336a1 1 0 1 1 1.414 1.414l-7.337 7.336 7.337 7.337a1 1 0 0 1-1.414 1.414l-7.337-7.337-7.336 7.337a1 1 0 0 1-1.414-1.414l7.336-7.337-7.336-7.336a1 1 0 0 1 1.414-1.414l7.336 7.336Z"
          fill={color}
        />
    </SVG>
}
