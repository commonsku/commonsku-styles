import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type ClientApprovedIconProps = SVGIconProps;
export default function ClientApprovedIcon({
    color=teal[60],
    size="medium",
    altText="Client Approved",
    ...props
}: ClientApprovedIconProps) {
    return <SVG size={size} aria-labelledby="ClientApprovedIcon" {...props}>
        <title id="ClientApprovedIcon" >{altText}</title>
        <path
            d="m13.11 6.72-.57 2.89c-.12.59.04 1.2.42 1.66.38.46.94.73 1.54.73H20v1.08L17.43 19H9.34a.35.35 0 0 1-.34-.34v-7.84l4.11-4.1ZM14 3 7.59 9.41c-.38.38-.59.89-.59 1.42v7.83C7 19.95 8.05 21 9.34 21h8.1c.71 0 1.36-.37 1.72-.97l2.67-6.15c.11-.25.17-.52.17-.8V12c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66a4.8 4.8 0 0 0-.88-1.22L14 3ZM4 10H2v11h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1Z"
            fill={color}
         />
    </SVG>
}
