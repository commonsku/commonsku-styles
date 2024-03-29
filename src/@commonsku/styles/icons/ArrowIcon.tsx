import React from 'react';
import { teal } from '../colors';
import SVG, { SVGIconProps } from './SvgIcon';

type ArrowIconDirection = 'up' | 'right' | 'down' | 'left';

type ArrowIconProps = SVGIconProps & {direction?: ArrowIconDirection};
export default function ArrowIcon({
    color=teal.main,
    direction="right",
    altText="Next",
    size="medium",
    ...props
}: ArrowIconProps) {

    switch (direction) {
        case "up":
            altText="Up";
            break;
        case "right":
            altText="Next";
            break;
        case "down":
            altText="Down";
            break;
        case "left":
            altText="Previous";
            break;
        default:
            altText="Next";
    };
    

    const directionPath = React.useMemo(() => {
        if (direction === "right") {
           return "M5.209 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41l4.87 4.89H5.209c-.55 0-1 .45-1 1s.45 1 1 1Z";
        } else if (direction === "down") {
           return "M11.005 5.209v11.17l-4.88-4.88c-.39-.39-1.03-.39-1.42 0a.996.996 0 0 0 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 1 0-1.41-1.41l-4.88 4.88V5.209c0-.55-.45-1-1-1s-1 .45-1 1Z";
        } else if (direction === "left") {
           return "M18.791 11.005H7.621l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41l-4.88-4.88h11.17c.55 0 1-.45 1-1s-.45-1-1-1Z";
        } else if (direction === "up") {
           return "M13 18.791V7.621l4.88 4.88c.39.39 1.03.39 1.42 0a.996.996 0 0 0 0-1.41l-6.59-6.59a.996.996 0 0 0-1.41 0l-6.6 6.58a.996.996 0 1 0 1.41 1.41L11 7.621v11.17c0 .55.45 1 1 1s1-.45 1-1Z";
        }

        // default to right
        return "M5.209 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41l4.87 4.89H5.209c-.55 0-1 .45-1 1s.45 1 1 1Z";
    }, [direction]);
      
    return <SVG size={size} aria-labelledby="ArrowIcon" {...props}>
        <title id="ArrowIcon" >{altText}</title>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            d={directionPath}
            fill={color}
        />
    </SVG>;
}
