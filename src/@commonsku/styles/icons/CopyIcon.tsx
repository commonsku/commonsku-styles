import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

const iconSizes = {
    tiny: {
        width: 15,
        height: 14,
        viewBox: "0 0 24 25",
      },
      small: {
        width: 17,
        height: 16,
        viewBox: "0 0 24 25",
      },
      medium: {
        width: 22,
        height: 21,
        viewBox: "0 0 24 25",
      },
      large: {
        width: 33,
        height: 32,
        viewBox: "0 0 24 25",
      },
      huge: {
        width: 49,
        height: 48,
        viewBox: "0 0 24 25",
      },
      default: {
        width: 22,
        height: 21,
        viewBox: "0 0 24 25",
      },
}

type CopyIconProps = SVGIconProps;
export default function CopyIcon({
    color=teal.main,
    size="medium",
    altText="Meeting",
    ...props
}: CopyIconProps) {
    const renderPath = "M16.5 1.5H4.5C3.4 1.5 2.5 2.4 2.5 3.5V17.5H4.5V3.5H16.5V1.5ZM19.5 5.5H8.5C7.4 5.5 6.5 6.4 6.5 7.5V21.5C6.5 22.6 7.4 23.5 8.5 23.5H19.5C20.6 23.5 21.5 22.6 21.5 21.5V7.5C21.5 6.4 20.6 5.5 19.5 5.5ZM19.5 21.5H8.5V7.5H19.5V21.5Z";

    return <SVG size={size} aria-labelledby="CopyIcon" iconSizes={iconSizes} {...props} >
        <title id="CopyIcon">{altText}</title>
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}
