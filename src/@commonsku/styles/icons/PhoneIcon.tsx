import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

const iconSizes = {
    tiny: {
        width: 15,
        height: 14,
        viewBox: "0 0 37 36",
      },
      small: {
        width: 17,
        height: 16,
        viewBox: "0 0 37 36",
      },
      medium: {
        width: 22,
        height: 21,
        viewBox: "0 0 37 36",
      },
      large: {
        width: 33,
        height: 32,
        viewBox: "0 0 37 36",
      },
      huge: {
        width: 49,
        height: 48,
        viewBox: "0 0 37 36",
      },
      default: {
        width: 22,
        height: 21,
        viewBox: "0 0 37 36",
      },
}

type PhoneIconProps = SVGIconProps;
export default function PhoneIcon({
    color=teal.main,
    size="medium",
    altText="Phone",
    ...props
}: PhoneIconProps) {
    const renderPath = "M7.83 4C7.95 5.78 8.25 7.52 8.73 9.18L6.33 11.58C5.51 9.18 4.99 6.64 4.81 4H7.83ZM27.55 28.04C29.25 28.52 30.99 28.82 32.75 28.94V31.92C30.11 31.74 27.57 31.22 25.15 30.42L27.55 28.04ZM9.75 0H2.75C1.65 0 0.75 0.9 0.75 2C0.75 20.78 15.97 36 34.75 36C35.85 36 36.75 35.1 36.75 34V27.02C36.75 25.92 35.85 25.02 34.75 25.02C32.27 25.02 29.85 24.62 27.61 23.88C27.41 23.8 27.19 23.78 26.99 23.78C26.47 23.78 25.97 23.98 25.57 24.36L21.17 28.76C15.51 25.86 10.87 21.24 7.99 15.58L12.39 11.18C12.95 10.62 13.11 9.84 12.89 9.14C12.15 6.9 11.75 4.5 11.75 2C11.75 0.9 10.85 0 9.75 0Z";

    return <SVG size={size} aria-labelledby="PhoneIcon" iconSizes={iconSizes} {...props} >
        <title id="PhoneIcon">{altText}</title>
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}
