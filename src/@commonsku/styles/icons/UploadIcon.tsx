import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type UploadIconProps = SVGIconProps;
export default function UploadIcon({
    color=teal.main,
    size="medium",
    altText="Upload",
    ...props
}: UploadIconProps) {
    return <SVG size={size} aria-labelledby="UploadIcon" {...props}>
        <title id="UploadIcon" >{altText}</title>
        <path
          d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM7 9L8.41 10.41L11 7.83V16H13V7.83L15.59 10.41L17 9L12 4L7 9Z" fill={color}
        />
    </SVG>
}

