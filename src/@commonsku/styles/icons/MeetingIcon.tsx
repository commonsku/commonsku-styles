import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

const iconSizes = {
    tiny: {
        width: 15,
        height: 14,
        viewBox: "0 0 49 24",
      },
      small: {
        width: 17,
        height: 16,
        viewBox: "0 0 49 24",
      },
      medium: {
        width: 22,
        height: 21,
        viewBox: "0 0 49 24",
      },
      large: {
        width: 33,
        height: 32,
        viewBox: "0 0 49 24",
      },
      huge: {
        width: 49,
        height: 48,
        viewBox: "0 0 49 24",
      },
      default: {
        width: 22,
        height: 21,
        viewBox: "0 0 49 24",
      },
}

type MeetingIconProps = SVGIconProps;
export default function MeetingIcon({
    color=teal.main,
    size="medium",
    altText="Meeting",
    ...props
}: MeetingIconProps) {
    const renderPath = "M8.25 14C10.45 14 12.25 12.2 12.25 10C12.25 7.8 10.45 6 8.25 6C6.05 6 4.25 7.8 4.25 10C4.25 12.2 6.05 14 8.25 14ZM10.51 16.2C9.77 16.08 9.03 16 8.25 16C6.27 16 4.39 16.42 2.69 17.16C1.21 17.8 0.25 19.24 0.25 20.86V24H9.25V20.78C9.25 19.12 9.71 17.56 10.51 16.2ZM40.25 14C42.45 14 44.25 12.2 44.25 10C44.25 7.8 42.45 6 40.25 6C38.05 6 36.25 7.8 36.25 10C36.25 12.2 38.05 14 40.25 14ZM48.25 20.86C48.25 19.24 47.29 17.8 45.81 17.16C44.11 16.42 42.23 16 40.25 16C39.47 16 38.73 16.08 37.99 16.2C38.79 17.56 39.25 19.12 39.25 20.78V24H48.25V20.86ZM32.73 15.3C30.39 14.26 27.51 13.5 24.25 13.5C20.99 13.5 18.11 14.28 15.77 15.3C13.61 16.26 12.25 18.42 12.25 20.78V24H36.25V20.78C36.25 18.42 34.89 16.26 32.73 15.3ZM16.39 20C16.57 19.54 16.65 19.22 18.21 18.62C20.15 17.86 22.19 17.5 24.25 17.5C26.31 17.5 28.35 17.86 30.29 18.62C31.83 19.22 31.91 19.54 32.11 20H16.39ZM24.25 4C25.35 4 26.25 4.9 26.25 6C26.25 7.1 25.35 8 24.25 8C23.15 8 22.25 7.1 22.25 6C22.25 4.9 23.15 4 24.25 4ZM24.25 0C20.93 0 18.25 2.68 18.25 6C18.25 9.32 20.93 12 24.25 12C27.57 12 30.25 9.32 30.25 6C30.25 2.68 27.57 0 24.25 0Z";

    return <SVG size={size} aria-labelledby="MeetingIcon" iconSizes={iconSizes} {...props} >
        <title id="MeetingIcon">{altText}</title>
        <path
            d={renderPath}
            fill={color}
        />
    </SVG>
}
