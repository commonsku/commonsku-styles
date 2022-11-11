import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type ShoppingCartIconProps = SVGIconProps;

const iconSizes = {
  tiny: {
      width: 14,
      height: 17,
      viewBox: "0 0 25 28",
  },
  small: {
      width: 16,
      height: 19,
      viewBox: "0 0 25 28",
  },
  medium: {
      width: 25,
      height:28,
      viewBox: "0 0 25 28",
  },
  large: {
      width: 32,
      height:35,
      viewBox: "0 0 25 28",
  },
  huge: {
      width: 48,
      height:51,
      viewBox: "0 0 25 28",
  },
  default: {
      height: 25,
      width: 25,
      viewBox: "0 0 25 28",
  },
};

export default function ShoppingCartIcon({
  color=teal.main,
  size="medium",
  altText="Cart",
  ...props
}: ShoppingCartIconProps) {
  return (
    <SVG size={size} aria-labelledby="ShoppingCartIcon" iconSizes={iconSizes} {...props}>
      <path d="M22.395 13.9613C21.9416 14.788 21.0616 15.3346 20.0616 15.3346H10.1283L8.66162 18.0013H24.6616V20.668H8.66162C6.63495 20.668 5.35495 18.4946 6.32829 16.708L8.12829 13.4546L3.32829 3.33464H0.661621V0.667969H5.02162L6.27495 3.33464H11.3332V6.0013H7.54162L10.7016 12.668H20.0616H23.3332L22.395 13.9613Z" fill={color} />
      <path d="M6.00829 24.668C6.00829 23.2013 7.19495 22.0013 8.66162 22.0013C10.1283 22.0013 11.3283 23.2013 11.3283 24.668C11.3283 26.1346 10.1283 27.3346 8.66162 27.3346C7.19495 27.3346 6.00829 26.1346 6.00829 24.668Z" fill={color} />
      <path d="M19.3416 24.668C19.3416 23.2013 20.5283 22.0013 21.995 22.0013C23.4616 22.0013 24.6616 23.2013 24.6616 24.668C24.6616 26.1346 23.4616 27.3346 21.995 27.3346C20.5283 27.3346 19.3416 26.1346 19.3416 24.668Z" fill={color} />
    </SVG>
  );
}
