import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type Props = SVGIconProps;
export default function MonitorIcon({
  color = teal.main,
  size = "medium",
  altText = "Monitor",
  ...props
}: Props) {
  return <SVG size={size} aria-labelledby="MonitorIcon" {...props}>
    <title id="MonitorIcon" >{altText}</title>
    <path
      fill={color}
      d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z"
    />
  </SVG>
}
