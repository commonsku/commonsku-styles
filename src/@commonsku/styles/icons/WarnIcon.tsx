import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { errors } from '../colors';

const iconSizes = {
    tiny: {
        width: 14,
        height: 14,
        viewBox: "0 0 48 48",
    },
    small: {
        width: 16,
        height: 16,
        viewBox: "0 0 48 48",
    },
    medium: {
        width: 24,
        height:24,
        viewBox: "0 0 48 48",
    },
    large: {
        width: 32,
        height:32,
        viewBox: "0 0 48 48",
    },
    huge: {
        width: 48,
        height:48,
        viewBox: "0 0 48 48",
    },
    default: {
        height: 24,
        width: 24,
        viewBox: "0 0 48 48",
    },
};

type WarnIconProps = SVGIconProps;
export default function WarnIcon({
    color=errors.main,
    size="medium",
    altText="Alert",
    ...props
}: WarnIconProps) {
    return <SVG size={size} aria-labelledby="WarnIcon" iconSizes={iconSizes} {...props}>
        <title id="WarnIcon">{altText}</title>
        <path fill="none" d="M0 0h48v48H0z" />
        <path fill={color} d="M2 42h44L24 4 2 42zm24-6h-4v-4h4v4zm0-8h-4v-8h4v8z" />
    </SVG>
}
