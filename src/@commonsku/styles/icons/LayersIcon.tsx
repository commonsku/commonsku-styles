import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type LayersIconProps = SVGIconProps;
export default function LayersIcon({
  color = teal.main,
  size = "medium",
  altText = "Layers",
  ...props
}: LayersIconProps) {
  return (
    <SVG size={size} aria-labelledby="LayersIcon" {...props}>
      <title id="LayersIcon" >{altText}</title>
      <path
        d="m11.99 19.505-7.37-5.73L3 15.035l9 7 9-7-1.63-1.27-7.38 5.74Zm.01-2.54 7.36-5.73L21 9.965l-9-7-9 7 1.63 1.27 7.37 5.73Zm0-11.47 5.74 4.47-5.74 4.47-5.74-4.47L12 5.495Z"
        fill={color}
      />
    </SVG>
  );
}
