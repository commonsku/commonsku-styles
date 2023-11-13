import React from 'react';
import { uniqueId } from 'lodash';
import SVG, { iconSize, SVGIconProps } from './SvgIcon';
import { teal } from '../colors';

const iconSizes = iconSize;

type ResizableIconProps = SVGIconProps;
export default function ResizableIcon({
  color = teal.main,
  altText = "Resizable Icon",
  ...props
}: ResizableIconProps) {
  const size = iconSizes[props.size || "medium"];
  const clipId = uniqueId('ResizableIcon');
  return (
    <SVG aria-labelledby="ResizableIcon" {...props} size={props.size || "medium"}>
      <title id="ResizableIcon">{altText}</title>
      <g clip-path={`url(#${clipId})`}>
        <path d="M16.24 11.5094L17.81 9.93944L14.06 6.18944L12.49 7.75944L8.35 3.62944C7.57 2.84944 6.3 2.84944 5.52 3.62944L3.62 5.52944C2.84 6.30944 2.84 7.57944 3.62 8.35944L7.75 12.4894L3.15 17.0994C3.05 17.1994 3 17.3194 3 17.4594V20.4994C3 20.7794 3.22 20.9994 3.5 20.9994H6.54C6.67 20.9994 6.8 20.9494 6.89 20.8494L11.51 16.2294L15.64 20.3594C16.96 21.6794 18.4 20.4294 18.47 20.3594L20.37 18.4594C21.15 17.6794 21.15 16.4094 20.37 15.6294L16.24 11.5094ZM9.18 11.0694L5.04 6.93944L6.93 5.03944L8.2 6.30944L7.73 6.79944C7.34 7.18944 7.34 7.81944 7.73 8.20944C8.12 8.59944 8.75 8.59944 9.14 8.20944L9.62 7.72944L11.07 9.17944L9.18 11.0694ZM17.06 18.9594L12.93 14.8294L14.83 12.9294L16.28 14.3794L15.8 14.8594C15.41 15.2494 15.41 15.8794 15.8 16.2694C16.19 16.6594 16.82 16.6594 17.21 16.2694L17.69 15.7894L18.96 17.0594L17.06 18.9594Z" fill={color} />
        <path d="M20.71 7.03944C21.1 6.64944 21.1 6.01944 20.71 5.62944L18.37 3.28944C17.9 2.81944 17.25 2.99944 16.96 3.28944L15.13 5.11944L18.88 8.86944L20.71 7.03944Z" fill={color} />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width={size.width} height={size.height} fill="white" />
        </clipPath>
      </defs>
    </SVG>
  );
}
