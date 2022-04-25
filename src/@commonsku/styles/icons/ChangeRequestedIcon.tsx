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
            d="M10.593 12 3.39 4.797 3.292 4.7A.995.995 0 0 1 4.699 3.29l.099.099L12 10.592l7.203-7.202.098-.099A.995.995 0 1 1 20.71 4.7l-.099.098L13.408 12l7.202 7.203.099.098A.995.995 0 0 1 19.3 20.71l-.098-.099L12 13.407 4.797 20.61l-.098.099A.995.995 0 1 1 3.29 19.3l.099-.098L10.593 12Z"
            fill={color}
        />
    </SVG>
}
