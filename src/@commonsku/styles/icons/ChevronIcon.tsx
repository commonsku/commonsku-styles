import React from 'react';
import { primary1 } from '../colors';
import SVG, { SVGIconProps } from './SvgIcon';

type ChevronIconDirection = 'up' | 'right' | 'down' | 'left' | 'updown' | 'leftright';

type ChevronIconProps = SVGIconProps & {direction?: ChevronIconDirection};
export default function ChevronIcon({
    color=primary1.main,
    direction="right",
    size="medium",
    ...props
}: ChevronIconProps) {

    const directionPath = React.useMemo(() => {
        if (direction === "right") {
           return "M9 6.71a.996.996 0 0 0 0 1.41L12.88 12 9 15.88a.996.996 0 1 0 1.41 1.41L15 12.7a.996.996 0 0 0 0-1.41L10.41 6.7c-.38-.38-1.02-.38-1.41.01Z";
        } else if (direction === "down") {
           return "m15.875 9-3.88 3.88L8.115 9a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.39-1.42 0Z";
        } else if (direction === "left") {
           return "M15 6.705a.996.996 0 0 0-1.41 0L9 11.295a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41l-3.88-3.89L15 8.115c.39-.39.38-1.03 0-1.41Z";
        } else if (direction === "up") {
           return "m11.295 9-4.59 4.59A.996.996 0 1 0 8.115 15l3.89-3.88 3.88 3.88a.996.996 0 1 0 1.41-1.41L12.705 9a.996.996 0 0 0-1.41 0Z";
        } else if (direction === "updown") {
            return "m12.705 19.707 4.59-4.59a.996.996 0 1 0-1.41-1.41l-3.89 3.88-3.88-3.88a.996.996 0 1 0-1.41 1.41l4.59 4.59c.38.39 1.02.39 1.41 0ZM11.295 4.293l-4.59 4.59a.996.996 0 1 0 1.41 1.41l3.89-3.88 3.88 3.88a.996.996 0 1 0 1.41-1.41l-4.59-4.59a.996.996 0 0 0-1.41 0Z";
        } else if (direction === "leftright") {
            return "m4.293 12.705 4.59 4.59a.996.996 0 1 0 1.41-1.41l-3.88-3.89 3.88-3.88a.996.996 0 1 0-1.41-1.41l-4.59 4.59a.996.996 0 0 0 0 1.41ZM19.707 11.295l-4.59-4.59a.996.996 0 1 0-1.41 1.41l3.88 3.89-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41Z";
        }
    // default to right
    return "M9 6.71a.996.996 0 0 0 0 1.41L12.88 12 9 15.88a.996.996 0 1 0 1.41 1.41L15 12.7a.996.996 0 0 0 0-1.41L10.41 6.7c-.38-.38-1.02-.38-1.41.01Z";
    }, [direction]);
      
    return <SVG size={size} {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            d={directionPath}
            fill={color}
        />
    </SVG>;

}
