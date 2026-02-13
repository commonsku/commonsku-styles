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

type PoDShopIconProps = SVGIconProps;
export default function PoDShopIcon({
  color = teal.main,
  size = "medium",
  altText = "PoD Shop Icon",
  ...props
}: PoDShopIconProps) {
  return (
    <SVG
      size={size}
      aria-labelledby="PoDShopIcon"
      iconSizes={iconSizes}
      altText={altText}
      {...props}
    >
      <path d="M51.6665 48.3337C52.587 48.3337 53.3332 49.0799 53.3332 50.0003C53.3332 50.9208 52.587 51.667 51.6665 51.667C50.746 51.667 49.9998 50.9208 49.9998 50.0003C49.9998 49.0799 50.746 48.3337 51.6665 48.3337Z" fill="#00A0B6" />
      <path d="M58.3332 48.3337C59.2536 48.3337 59.9998 49.0799 59.9998 50.0003C59.9998 50.9208 59.2536 51.667 58.3332 51.667C57.4127 51.667 56.6665 50.9208 56.6665 50.0003C56.6665 49.0799 57.4127 48.3337 58.3332 48.3337Z" fill="#00A0B6" />
      <path fillRule="evenodd" clipRule="evenodd" d="M56.6665 68.3337H23.3332V61.667H6.6665V48.3337C6.6665 42.8003 11.1332 38.3337 16.6665 38.3337H23.3332V31.667L18.3332 33.3337L9.99984 21.667L23.3332 11.667H29.9998C29.9998 11.667 39.9998 26.667 49.9998 11.667H56.6665L69.9998 21.667L61.6665 33.3337L56.6665 31.667V38.3337H63.3332C68.8665 38.3337 73.3332 42.8003 73.3332 48.3337V61.667H56.6665V68.3337ZM16.6665 45.0003C14.8332 45.0003 13.3332 46.5003 13.3332 48.3337V55.0003H66.6665V48.3337C66.6665 46.5003 65.1665 45.0003 63.3332 45.0003H16.6665Z" fill={color} />
    </SVG>
  );
}
