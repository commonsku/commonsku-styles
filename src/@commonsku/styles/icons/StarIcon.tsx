import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type StarIconProps = SVGIconProps & {hover?:boolean, filled?: boolean;};
export default function StarIcon({
    color=teal.main,
    size="medium",
    hover=false,
    filled=false,
    altText="Star",
    ...props
}: StarIconProps) {

    filled ? altText="Unstar" : altText="Star";

    const renderPath = filled ? "m12 17.52 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.88l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5Z"
    : 
    "m19.648 9.295-4.84-.42-1.89-4.45c-.34-.81-1.5-.81-1.84 0l-1.89 4.46-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73 3.67-3.18c.67-.58.32-1.68-.56-1.75Zm-7.65 6.36-3.76 2.27 1-4.28-3.32-2.88 4.38-.38 1.7-4.03 1.71 4.04 4.38.38-3.32 2.88 1 4.28-3.77-2.28Z"

    return <SVG size={size} aria-labelledby="StarIcon" {...props} >
        
        <title id="StarIcon" >{altText}</title>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}

