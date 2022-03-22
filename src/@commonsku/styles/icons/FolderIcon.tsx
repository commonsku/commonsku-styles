import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { primary1 } from '../colors';

type FolderIconProps = SVGIconProps;
export default function FolderIcon({
    fill=primary1.main,
    ...props
}: FolderIconProps) {
    return <SVG {...props}>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="m7.934 3 2.167 2.167h9.566V16H2.333V3h5.601Zm.9-2.167h-6.5A2.164 2.164 0 0 0 .176 3l-.01 13c0 1.192.975 2.167 2.166 2.167h17.334A2.173 2.173 0 0 0 21.833 16V5.167A2.173 2.173 0 0 0 19.667 3H11L8.833.833Z"
            fill={fill}
        />
    </SVG>
}
