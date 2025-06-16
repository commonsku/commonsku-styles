import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type FlagIconProps = SVGIconProps & { filled?: boolean; };

export default function FlagIcon(
  {
    color = teal.main,
    size = "medium",
    filled = false,
    altText = "Flag",
    ...props
  }: FlagIconProps
) {
  const renderPath = filled ?
    "M13.9 5.5L13.5 3.5H4.5V20.5H6.5V13.5H12.1L12.5 15.5H19.5V5.5H13.9Z" : 
    "M11.86 5.5L11.94 5.89L12.26 7.5H17.5V13.5H14.14L14.06 13.11L13.74 11.5H6.5V5.5H11.86ZM13.5 3.5H4.5V20.5H6.5V13.5H12.1L12.5 15.5H19.5V5.5H13.9L13.5 3.5Z";

  return (
    <SVG size={size} aria-labelledby={altText} {...props}>
      <title id="FlagIcon">{altText}</title>
      <path
        d={renderPath}
        fill={color}
      />
    </SVG>
  );
}
