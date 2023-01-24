import React, { useMemo } from 'react';
import { teal } from '../colors';
import SVG, { SVGIconProps } from './SvgIcon';

export const iconSizes = {
  tiny: {
    width: 12,
    height: 12,
    viewBox: "0 0 32 32",
  },
  small: {
    width: 22,
    height: 22,
    viewBox: "0 0 32 32",
  },
  medium: {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
  },
  large: {
    width: 62,
    height: 62,
    viewBox: "0 0 32 32",
  },
  huge: {
    width: 82,
    height: 82,
    viewBox: "0 0 32 32",
  },
  default: {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
  },
};

type ArrowIconDirection = 'left' | 'right';
type DoubleArrowIconProps = SVGIconProps & {
  direction?: ArrowIconDirection;
};
export default function DoubleArrowIcon({
  color = teal.main,
  direction = "right",
  size = "medium",
  altText,
  ...props
}: DoubleArrowIconProps) {
  const iconAltText = useMemo(() => {
    if (altText) { return altText; }
    switch (direction) {
      case 'right': return 'Next';
      case 'left': return 'Previous';
      default: return '';
    };
  }, [altText, direction]);

  const directionPaths = React.useMemo(() => {
    if (direction === "left") {
      return [
        'M24.3801 23.0592C24.9001 22.5392 24.9001 21.6992 24.3801 21.1792L19.2201 15.9926L24.3935 10.8192C24.9135 10.2992 24.9135 9.45922 24.3935 8.93922C23.8735 8.41922 23.0335 8.41922 22.5135 8.93922L16.3935 15.0592C15.8735 15.5792 15.8735 16.4192 16.3935 16.9392L22.5001 23.0592C23.0201 23.5792 23.8601 23.5792 24.3801 23.0592Z',
        'M15.5935 23.0592C16.1135 22.5392 16.1135 21.6992 15.5935 21.1792L10.4335 15.9926L15.6068 10.8192C16.1268 10.2992 16.1268 9.45922 15.6068 8.93922C15.0868 8.41922 14.2468 8.41922 13.7268 8.93922L7.6068 15.0592C7.0868 15.5792 7.0868 16.4192 7.6068 16.9392L13.7135 23.0592C14.2335 23.5792 15.0735 23.5792 15.5935 23.0592Z',
      ];
    }
    return [
      'M7.61987 8.94078C7.09987 9.46078 7.09987 10.3008 7.61987 10.8208L12.7799 16.0074L7.60654 21.1808C7.08654 21.7008 7.08654 22.5408 7.60654 23.0608C8.12653 23.5808 8.96654 23.5808 9.48654 23.0608L15.6065 16.9408C16.1265 16.4208 16.1265 15.5808 15.6065 15.0608L9.49987 8.94078C8.97987 8.42078 8.13987 8.42078 7.61987 8.94078Z',
      'M16.4065 8.94078C15.8865 9.46078 15.8865 10.3008 16.4065 10.8208L21.5665 16.0074L16.3932 21.1808C15.8732 21.7008 15.8732 22.5408 16.3932 23.0608C16.9132 23.5808 17.7532 23.5808 18.2732 23.0608L24.3932 16.9408C24.9132 16.4208 24.9132 15.5808 24.3932 15.0608L18.2865 8.94078C17.7665 8.42078 16.9265 8.42078 16.4065 8.94078Z',
    ];
  }, [direction]);

  return (
    <SVG fill="none" xmlns="http://www.w3.org/2000/svg" iconSizes={iconSizes} size={size} {...props}>
      <title id="DoubleArrowIcon">{iconAltText}</title>
      <path d={directionPaths[0]} fill={color} />
      <path d={directionPaths[1]} fill={color} />
    </SVG>
  );
}
