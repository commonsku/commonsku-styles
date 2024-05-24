import React from "react";
import SVG, { SVGIconProps } from "./SvgIcon";
import { errors } from "../colors";

const iconSizes = {
  tiny: {
    width: 12,
    height: 12,
    viewBox: "0 0 12 12",
  },
  small: {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
  },
  medium: {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
  },
  large: {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
  },
  huge: {
    width: 48,
    height: 48,
    viewBox: "0 0 48 48",
  },
  default: {
    width: 64,
    height: 64,
    viewBox: "0 0 64 64",
  },
};

export default function ClearIcon({
  color = errors["60"],
  size = "medium",
  altText = "clear",
  ...props
}: SVGIconProps) {
  return (
    <SVG
      size={size}
      iconSizes={iconSizes}
      aria-labelledby="ClearIcon"
      {...props}
    >
      <title id="ClearIcon">{altText}</title>
      <path
        fill={color}
        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
      ></path>
    </SVG>
  );
}
