import React from "react";
import SVG, { SVGIconProps } from "./SvgIcon";
import { teal } from "../colors";

const iconSizes = {
  tiny: {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
  },
  small: {
    width: 40,
    height: 40,
    viewBox: "0 0 24 24",
  },
  medium: {
    width: 80,
    height: 80,
    viewBox: "0 0 24 24",
  },
  large: {
    width: 120,
    height: 120,
    viewBox: "0 0 24 24",
  },
  huge: {
    width: 160,
    height: 160,
    viewBox: "0 0 24 24",
  },
  default: {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
  },
};

type CheckmarkCircleIconProps = SVGIconProps;
export default function CheckmarkCircleIcon({
  color = teal.main,
  size = "default",
  altText = "Catalog Icon",
  ...props
}: CheckmarkCircleIconProps) {
  return (
    <SVG
      size={size}
      aria-labelledby="CheckmarkCircleIcon"
      iconSizes={iconSizes}
      altText={altText}
      {...props}
    >
      <path
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM14.59 5.58L8 12.17L5.41 9.59L4 11L8 15L16 7L14.59 5.58Z"
        fill={color}
      />
    </SVG>
  );
}
