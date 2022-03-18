import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { primary1 } from '../colors';

type ClipboardIconProps = SVGIconProps & { fill?: string;};
export default function ClipboardIcon({
    fill=primary1.main,
    ...props
}: ClipboardIconProps) {
    return <SVG {...props}>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1Zm6 18H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h1v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5h1c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1Z"
            fill={fill}
        />
    </SVG>
}
