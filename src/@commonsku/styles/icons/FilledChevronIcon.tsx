import React from 'react';
import { primary1 } from '../colors';
import SVG, { SVGIconProps } from './SvgIcon';

type FilledChevronIconDirection = 'up' | 'right' | 'down' | 'left' | 'updown' | 'leftright';

type FilledChevronIconProps = SVGIconProps & {direction?: FilledChevronIconDirection};
export default function FilledChevronIcon({
    color=primary1.main,
    direction="right",
    size="medium",
    ...props
}: FilledChevronIconProps) {

    const directionPath = React.useMemo(() => {
        if (direction === "right") {
           return "m9.5 17 5-5-5-5v10Z";
        } else if (direction === "down") {
           return "m7 9.5 5 5 5-5H7Z";
        } else if (direction === "left") {
           return "m14.5 7-5 5 5 5V7Z";
        } else if (direction === "up") {
           return "m7 14.5 5-5 5 5H7Z";
        } else if (direction === "updown") {
            return "m7 13 5 5 5-5H7ZM7 11l5-5 5 5H7Z";
        } else if (direction === "leftright") {
            return "m11 7-5 5 5 5V7ZM13 7l5 5-5 5V7Z";
        }
    // default to right
    return "m9.5 17 5-5-5-5v10Z";
    }, [direction]);
      
    return <SVG size={size} {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            d={directionPath}
            fill={color}
        />
    </SVG>;

}
