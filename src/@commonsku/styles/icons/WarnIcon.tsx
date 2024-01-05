import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { errors } from '../colors';

type WarnIconProps = SVGIconProps;
export default function WarnIcon({
    color=errors.main,
    size="medium",
    altText="Alert",
    ...props
}: WarnIconProps) {
    return <SVG size={size} aria-labelledby="WarnIcon" {...props}>
        <title id="WarnIcon">{altText}</title>
        <path fill={color} fillRule="evenodd" d="M0 19.5h22L11 .5l-11 19Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z" />
    </SVG>
}
