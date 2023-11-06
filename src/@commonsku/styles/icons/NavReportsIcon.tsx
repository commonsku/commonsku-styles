import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { white } from '../colors';

type NavReportsIconProps = SVGIconProps & {
    filled?: boolean;
};

export default function NavReportsIcon({
                                           color = white.main,
                                           size = "medium",
                                           filled = false,
                                           altText = "Reports",
                                           ...props
                                       }: NavReportsIconProps) {

    const renderPath = filled ?
        "M9.5 10.02H14.5V21H9.5V10.02ZM16.5 21H19.5C20.6 21 21.5 20.1 21.5 19V10H16.5V21ZM19.5 3H4.5C3.4 3 2.5 3.9 2.5 5V8H21.5V5C21.5 3.9 20.6 3 19.5 3ZM2.5 19C2.5 20.1 3.4 21 4.5 21H7.5V10H2.5V19Z"
        :
        "M19.5 3H4.5C3.4 3 2.5 3.9 2.5 5V19C2.5 20.1 3.4 21 4.5 21H19.5C20.6 21 21.5 20.1 21.5 19V5C21.5 3.9 20.6 3 19.5 3ZM19.5 5V8H4.5V5H19.5ZM14.5 19H9.5V10H14.5V19ZM4.5 10H7.5V19H4.5V10ZM16.5 19V10H19.5V19H16.5Z";

    return (
        <SVG size={size} aria-labelledby="NavReportsIcon" {...props}>
            <title id="NavReportsIcon">{altText}</title>
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                d={renderPath}
                fill={color}
            />
        </SVG>
    );
}
