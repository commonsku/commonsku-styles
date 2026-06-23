import React from 'react';
import SVG, { SVGIconProps, iconSize } from './SvgIcon';
import { teal } from '../colors';

const symbolIconSizes = {
    tiny:    { ...iconSize.tiny,    viewBox: "0 -960 960 960" },
    small:   { ...iconSize.small,   viewBox: "0 -960 960 960" },
    medium:  { ...iconSize.medium,  viewBox: "0 -960 960 960" },
    large:   { ...iconSize.large,   viewBox: "0 -960 960 960" },
    huge:    { ...iconSize.huge,    viewBox: "0 -960 960 960" },
    default: { ...iconSize.default, viewBox: "0 -960 960 960" },
};

type CheckmarkCircleIconProps = SVGIconProps;
export default function CheckmarkCircleIcon({
    color=teal.main,
    size="medium",
    ...props
}: CheckmarkCircleIconProps) {
    return <SVG size={size} iconSizes={symbolIconSizes} {...props}>
        <path fill="none" d="M0-960h960v960H0z" />
        <path
            d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
            fill={color}
        />
    </SVG>
}
