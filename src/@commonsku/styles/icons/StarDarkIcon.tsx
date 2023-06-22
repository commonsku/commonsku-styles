import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

const iconSizes = {
  tiny: {
    width: 81,
    height: 80,
    viewBox: "0 0 100 101",
  },
  small: {
    width: 91,
    height: 90,
    viewBox: "0 0 100 101",
  },
  medium: {
    width: 101,
    height: 100,
    viewBox: "0 0 100 101",
  },
  large: {
    width: 111,
    height: 110,
    viewBox: "0 0 100 101",
  },
  huge: {
    width: 121,
    height: 120,
    viewBox: "0 0 100 101",
  },
  default: {
    width: 131,
    height: 130,
    viewBox: "0 0 100 101",
  },
};

type StarDarkIconProps = SVGIconProps;
export default function StarDarkIcon({
  color = teal.main,
  size = "medium",
  altText = "Search",
  ...props
}: StarDarkIconProps) {
  return (
    <SVG size={size} aria-labelledby="StarDarkIcon" iconSizes={iconSizes} {...props}>
      <g transform="matrix(1,0,0,1,-126,0)">
        <g id="dark" transform="matrix(0.357231,0,0,0.357231,124.961,0.10718)">
          <rect x="4.308" y="-0.3" width="279.931" height="279.931" style={{ fill: 'none' }} />
          <g transform="matrix(1.69264,0,0,1.69264,-1244.22,-2149.68)">
            <path
              d="M816.161,1280.05C816.87,1278.39 818.503,1277.31 820.31,1277.31C822.117,1277.31 823.75,1278.39 824.459,1280.05L844.406,1326.83L895.064,1331.35C896.864,1331.51 898.395,1332.73 898.954,1334.44C899.512,1336.16 898.991,1338.05 897.628,1339.24L859.299,1372.67L870.66,1422.24C871.064,1424 870.377,1425.83 868.914,1426.9C867.452,1427.96 865.497,1428.05 863.946,1427.12L820.31,1400.99L776.674,1427.12C775.123,1428.05 773.168,1427.96 771.706,1426.9C770.243,1425.83 769.556,1424 769.96,1422.24L781.321,1372.67L742.992,1339.24C741.629,1338.05 741.108,1336.16 741.666,1334.44C742.225,1332.73 743.756,1331.51 745.556,1331.35L796.214,1326.83L816.161,1280.05Z"
              style={{ fill: 'rgb(18,57,82)' }}
            />
          </g>
        </g>
      </g>
    </SVG>
  );
}
