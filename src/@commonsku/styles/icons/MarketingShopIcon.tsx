import React from "react";
import SVG, { SVGIconProps } from "./SvgIcon";
import { teal } from "../colors";

const iconSizes = {
  tiny: {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
  },
  small: {
    width: 40,
    height: 40,
    viewBox: "0 0 80 80",
  },
  medium: {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
  },
  large: {
    width: 120,
    height: 120,
    viewBox: "0 0 80 80",
  },
  huge: {
    width: 160,
    height: 160,
    viewBox: "0 0 80 80",
  },
  default: {
    width: 80,
    height: 80,
    viewBox: "0 0 80 80",
  },
};

type MarketingShopIconProps = SVGIconProps;
export default function MarketingShopIcon({
  color = teal.main,
  size = "medium",
  altText = "Marketing Shop Icon",
  ...props
}: MarketingShopIconProps) {
  return (
    <SVG
      size={size}
      aria-labelledby="MarketingShopIcon"
      iconSizes={iconSizes}
      altText={altText}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.9999 33.3333L39.9999 18.3333L19.9999 33.3333V63.3333H59.9999V33.3333ZM36.9999 12.25C38.7777 10.9167 41.2221 10.9167 42.9999 12.25L64.6666 28.5C65.9256 29.4443 66.6666 30.9262 66.6666 32.5V64C66.6666 67.3137 63.9803 70 60.6666 70H19.3333C16.0195 70 13.3333 67.3137 13.3333 64V32.5C13.3333 30.9262 14.0742 29.4443 15.3332 28.5L36.9999 12.25ZM30.9999 43.2692C30.9999 41.45 32.4666 39.9615 34.2592 39.9615H40.7777L48.9258 35V54.8462L40.7777 49.8846H39.1481V56.5H35.8888V49.8846H34.2592C32.4666 49.8846 30.9999 48.3962 30.9999 46.5769V43.2692Z"
        fill={color}
      />
    </SVG>
  );
}
