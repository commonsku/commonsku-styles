import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type EpsIconProps = SVGIconProps;
export default function EpsIcon({
    color=teal.main,
    size="medium",
    altText="Eps",
    ...props
}: EpsIconProps) {
    return <SVG size={size} aria-labelledby="EpsIcon" {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <title id="EpsIcon" >{altText}</title>
        <path
            d="M19.445 13.535c-3.677 2.602-7.243 4.951-11.597 4.806-4.353-.145-6.378-2.834-6.378-2.834s2.038 6.66 9.858 6.49c7.82-.17 11.672-5.55 11.672-5.55s-1.616-1.371-3.555-2.912Zm-14.9 3.187c-1.036-1.364-3.333-5.025 3.052-8.977 6.385-3.953 9.186-.914 4.862 2.464-3.337 2.607-7.125 3.073-7.125 3.073s2.134 3.845 3.25 3.865c8.634-1.509 12.253-8.842 9.47-12.744C15.555.894 9.024 1.139 4.06 5.726c-4.962 4.587-3.22 8.939.485 10.996Z"
            fill={color}
        />
    </SVG>
}
