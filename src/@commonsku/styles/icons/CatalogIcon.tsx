import React from "react";
import SVG, { SVGIconProps } from "./SvgIcon";
import { neutrals } from "../colors";

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

type CatalogIconProps = SVGIconProps;
export default function CatalogIcon({
  color = neutrals["90"],
  size = "default",
  altText = "Catalog Icon",
  ...props
}: CatalogIconProps) {
  return (
    <SVG
      size={size}
      aria-labelledby="CatalogIcon"
      iconSizes={iconSizes}
      altText={altText}
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15.02H3V5.98h18v13.04z"
        fill={color}
      />
      <path d="M11 6h2v13h-2z" fill={color} />
      <path
        d="M14.5 9.5h5V11h-5zm0 2.5h5v1.5h-5zm0 2.5h5V16h-5z"
        fill={color}
      />
    </SVG>
  );
}
