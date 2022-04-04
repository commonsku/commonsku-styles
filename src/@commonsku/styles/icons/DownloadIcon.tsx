import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { primary1 } from '../colors';

type DownloadIconProps = SVGIconProps;
export default function DownloadIcon({
    color=primary1.main,
    size="medium",
    ...props
}: DownloadIconProps) {
    return <SVG size={size} {...props}>
        <path
          d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2Zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5Z"
          fill={color}
        />
    </SVG>
}

