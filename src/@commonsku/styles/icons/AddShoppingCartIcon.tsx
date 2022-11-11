import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type AddShoppingCartIconProps = SVGIconProps;

const iconSizes = {
  tiny: {
    width: 14,
    height: 15,
    viewBox: "0 0 21 22",
  },
  small: {
    width: 16,
    height: 17,
    viewBox: "0 0 21 22",
  },
  medium: {
    width: 21,
    height:22,
    viewBox: "0 0 21 22",
  },
  large: {
    width: 32,
    height:33,
    viewBox: "0 0 21 22",
  },
  huge: {
    width: 48,
    height:49,
    viewBox: "0 0 21 22",
  },
  default: {
    width: 21,
    height:22,
    viewBox: "0 0 21 22",
  },
};

export default function AddShoppingCartIcon({
  color=teal.main,
  size="medium",
  altText="Add to Cart",
  ...props
}: AddShoppingCartIconProps) {
  return (
    <SVG size={size} aria-labelledby="AddShoppingCartIcon" iconSizes={iconSizes} {...props}>
      <path d="M10.4199 8.5H12.4199V5.5H15.4199V3.5H12.4199V0.5H10.4199V3.5H7.41992V5.5H10.4199V8.5ZM6.41992 17.5C5.31992 17.5 4.42992 18.4 4.42992 19.5C4.42992 20.6 5.31992 21.5 6.41992 21.5C7.51992 21.5 8.41992 20.6 8.41992 19.5C8.41992 18.4 7.51992 17.5 6.41992 17.5ZM16.4199 17.5C15.3199 17.5 14.4299 18.4 14.4299 19.5C14.4299 20.6 15.3199 21.5 16.4199 21.5C17.5199 21.5 18.4199 20.6 18.4199 19.5C18.4199 18.4 17.5199 17.5 16.4199 17.5ZM7.51992 12.5H14.9699C15.7199 12.5 16.3799 12.09 16.7199 11.47L20.5799 4.46L18.8399 3.5L14.9699 10.5H7.94992L3.68992 1.5H0.419922V3.5H2.41992L6.01992 11.09L4.66992 13.53C3.93992 14.87 4.89992 16.5 6.41992 16.5H18.4199V14.5H6.41992L7.51992 12.5Z" fill={color} />
    </SVG>
  );
}
