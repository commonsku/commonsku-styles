import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

type ShoppingCartIconProps = SVGIconProps;

const iconSizes = {
  tiny: {
    width: 16,
    height: 18,
    viewBox: "0 0 22 20",
  },
  small: {
    width: 20,
    height: 22,
    viewBox: "0 0 22 20",
  },
  medium: {
    width: 30,
    height: 28,
    viewBox: "0 0 22 20",
  },
  large: {
    width: 34,
    height: 36,
    viewBox: "0 0 22 20",
  },
  huge: {
    width: 48,
    height: 50,
    viewBox: "0 0 22 20",
  },
  default: {
    width: 30,
    height: 28,
    viewBox: "0 0 22 20",
  },
};

function ShoppingCartIcon({
  color = teal.main,
  size = "medium",
  altText = "Shopping Cart",
  ...props
}: ShoppingCartIconProps) {
  return (
    <SVG size={size} aria-labelledby="ShoppingCartIcon" iconSizes={iconSizes} altText={altText} {...props}>
      <path d="M15.5463 11C16.2963 11 16.9563 10.59 17.2963 9.97L20.8763 3.48C21.2463 2.82 20.7663 2 20.0063 2H5.20634L4.26634 0H0.996338V2H2.99634L6.59634 9.59L5.24634 12.03C4.51634 13.37 5.47634 15 6.99634 15H18.9963V13H6.99634L8.09634 11H15.5463ZM6.15634 4H18.3063L15.5463 9H8.52634L6.15634 4ZM6.99634 16C5.89634 16 5.00634 16.9 5.00634 18C5.00634 19.1 5.89634 20 6.99634 20C8.09634 20 8.99634 19.1 8.99634 18C8.99634 16.9 8.09634 16 6.99634 16ZM16.9963 16C15.8963 16 15.0063 16.9 15.0063 18C15.0063 19.1 15.8963 20 16.9963 20C18.0963 20 18.9963 19.1 18.9963 18C18.9963 16.9 18.0963 16 16.9963 16Z" fill={color} />
    </SVG>
  );
}

export default ShoppingCartIcon;
