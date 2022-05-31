import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type EditIconProps = SVGIconProps & {filled?: boolean};
export default function EditIcon({
    color=teal.main,
    size="medium",
    filled=false,
    altText="Edit",
    ...props
}: EditIconProps) {
    const renderPath = filled ? "M2.999 17.251v3.75h3.75l11.06-11.06-3.75-3.75-11.06 11.06ZM20.709 5.631l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41Z"
    : 
    "m14.059 9.02.92.92L5.919 19h-.92v-.92l9.06-9.06Zm3.6-6.02c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29Zm-3.6 3.19L2.999 17.25V21h3.75l11.06-11.06-3.75-3.75Z"

    return <SVG size={size} aria-labelledby="EditIcon" {...props} >
        
        <title id="EditIcon" >{altText}</title>
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}

