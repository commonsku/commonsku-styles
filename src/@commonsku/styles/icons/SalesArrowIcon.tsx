import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import {green, errors} from '../colors';

type SalesArrowIconDirection = 'up' | 'down';

type SalesArrowIconProps = SVGIconProps & {direction?: SalesArrowIconDirection};
export default function SalesArrowIcon({
    color=green.main,
    size="medium",
    direction="up",
    altText="Up",
    ...props
}: SalesArrowIconProps) {

    if(direction === "down") {
        color=errors.main;
        altText="Down";
    } else {
        color = green.main;
        altText="Up"
    }

    const renderPath = direction === "up" ? "m12 4 9 15H3l9-15Z" : "M12 19 3 4h18l-9 15Z" ;

    return <SVG size={size} aria-labelledby="SalesArrowIcon" {...props}>
        <title id="SalesArrowIcon" >{altText}</title>
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}

