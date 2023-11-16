import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type ConnectedIconProps = SVGIconProps;
export default function ConnectedIcon({
    size="medium",
    altText="Connected",
    color=teal.main,
    ...props
}: ConnectedIconProps) {
    return <SVG size={size} aria-labelledby="ConnectedIcon" {...props}>
        <title id="ConnectedIcon" >{altText}</title>
        <path fill={color} d="M12 6.987c1.657 0 3-1.34 3-2.993A2.997 2.997 0 0 0 12 1c-1.657 0-3 1.34-3 2.994a2.997 2.997 0 0 0 3 2.993ZM13.594 8.194a4.513 4.513 0 0 0 2.317-1.978l5.727 9.796a4.486 4.486 0 0 0-3.08.673l-4.964-8.491ZM16.5 20.458c0 .525.09 1.029.256 1.497H7.244c.166-.468.256-.972.256-1.497 0-.525-.09-1.029-.256-1.497h9.512a4.475 4.475 0 0 0-.256 1.497ZM5.442 16.686l4.964-8.492a4.513 4.513 0 0 1-2.317-1.978l-5.727 9.796c.209-.029.421-.044.638-.044.9 0 1.738.264 2.442.718ZM6 20.458a2.997 2.997 0 0 1-3 2.994c-1.657 0-3-1.34-3-2.994a2.997 2.997 0 0 1 3-2.993c1.657 0 3 1.34 3 2.993ZM21 23.452c1.657 0 3-1.34 3-2.994a2.997 2.997 0 0 0-3-2.993c-1.657 0-3 1.34-3 2.993a2.997 2.997 0 0 0 3 2.994Z"/>
    </SVG>
}