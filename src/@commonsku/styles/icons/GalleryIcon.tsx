import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { primary1 } from '../colors';

type GalleryIconProps = SVGIconProps;
export default function GalleryIcon({
    color=primary1.main,
    size="medium",
    ...props
}: GalleryIconProps) {
    return <SVG size={size} {...props}>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M20 4v12H8V4h12Zm0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-8.5 9.67 1.69 2.26 2.48-3.1L19 15H9l2.5-3.33ZM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2Z"
            fill={color}
        />
    </SVG>
}
