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

type CompanyShopIconProps = SVGIconProps;
export default function CompanyShopIcon({
  color = teal.main,
  size = "medium",
  altText = "Company Shop Icon",
  ...props
}: CompanyShopIconProps) {
  return (
    <SVG
      size={size}
      iconSizes={iconSizes}
      altText={altText}
      aria-labelledby="CompanyShopIcon"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M61.2 30.0002L63.2 40.0002H16.8L18.8 30.0002H61.2ZM66.6667 16.6668C66.6667 14.8259 65.1743 13.3335 63.3333 13.3335H16.6667C14.8257 13.3335 13.3333 14.8259 13.3333 16.6668C13.3333 18.5078 14.8257 20.0002 16.6667 20.0002H63.3333C65.1743 20.0002 66.6667 18.5078 66.6667 16.6668ZM67.4706 27.3529C67.0031 25.0158 64.951 23.3335 62.5676 23.3335H17.4323C15.0489 23.3335 12.9969 25.0158 12.5294 27.3529L10 40.0002V43.3335C10 45.1744 11.4924 46.6668 13.3333 46.6668V63.1668C13.3333 65.0998 14.9003 66.6668 16.8333 66.6668H43.1667C45.0997 66.6668 46.6667 65.0998 46.6667 63.1668V46.6668H60V63.3335C60 65.1744 61.4924 66.6668 63.3333 66.6668C65.1743 66.6668 66.6667 65.1744 66.6667 63.3335V46.6668C68.5076 46.6668 70 45.1744 70 43.3335V40.0002L67.4706 27.3529ZM20 60.0002V46.6668H40V60.0002H20Z"
        fill={color}
      />
    </SVG>
  );
}
