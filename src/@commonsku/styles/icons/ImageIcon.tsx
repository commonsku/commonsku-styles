import { uniqueId } from "lodash";
import React from "react";
import { teal } from "../colors";
import SVG, { SVGIconProps } from "./SvgIcon";

const iconSizes = {
  tiny: {
    width: 16,
    height: 16,
    viewBox: "0 0 32 32",
  },
  small: {
    width: 24,
    height: 24,
    viewBox: "0 0 32 32",
  },
  medium: {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
  },
  large: {
    width: 40,
    height: 40,
    viewBox: "0 0 32 32",
  },
  huge: {
    width: 48,
    height: 48,
    viewBox: "0 0 32 32",
  },
  default: {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
  },
};

type ImageIcon = SVGIconProps;
export default function ImageIcon(props: ImageIcon) {
  const {
    color=teal.main,
    size="medium",
    altText="ImageIcon",
    ...rest
  } = props;
  const id = uniqueId('clip0_1244_70960');
  return (
    <SVG size={size} iconSizes={iconSizes} aria-labelledby={altText} fill="none" {...rest}>
      <g clipPath={`url(#${id})`}>
        <path d="M25.3333 6.66667V25.3333H6.66667V6.66667H25.3333ZM25.3333 4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H25.3333C26.8 28 28 26.8 28 25.3333V6.66667C28 5.2 26.8 4 25.3333 4ZM18.8533 15.8133L14.8533 20.9733L12 17.52L8 22.6667H24L18.8533 15.8133Z" fill={color} />
      </g>
      <defs>
        <clipPath id={id}>
          <rect width="32" height="32" fill="white"/>
        </clipPath>
      </defs>
    </SVG>
  );  
}
