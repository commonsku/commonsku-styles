import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';
import { colors } from '../Theme';

type CircleProgressIconProps = SVGIconProps & {
  sqSize?: number,
  strokeWidth?: number,
  percentage?: number,
  strokeColor?: string,
  textColor?: string,
  text?: string,
  viewBox?: string,
  textStyle?: React.CSSProperties,
};
export default function CircleProgressIcon({
    sqSize,
    strokeWidth,
    percentage = 0,
    strokeColor = teal.main,
    textColor = teal.main,
    text = '',
    textStyle = {},
    color=teal.main,
    size="medium",
    altText="Progress level",
    ...props

}: CircleProgressIconProps) {

      const iconSizes = {
        tiny: {
            width: 32,
            height: 32,
            viewBox: "0 0 32 32",
        },
        small: {
            width: 40,
            height: 40,
            viewBox: "0 0 40 40",
        },
        medium: {
            width: 48,
            height:48,
            viewBox: "0 0 48 48",
        },
        large: {
            width: 72,
            height: 72,
            viewBox: "0 0 72 72",
        },
        huge: {
            width: 96,
            height: 96,
            viewBox: "0 0 96 96",
        },
        default: {
            height: 48,
            width: 48,
            viewBox: "0 0 48 48",
        },
    };

    sqSize=iconSizes[size]["width"]
    strokeWidth = size === "tiny" || size === "small" ? 3 : 5;

    const radius = (sqSize - strokeWidth) / 2;
    // const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * percentage / 100;

    return <SVG size={size} iconSizes={iconSizes} aria-labelledby="CircleProgressIcon" {...props}>
        <title id="CircleProgressIcon" >{ text !== '' ? `${text} stage` : percentage ? `${percentage}% completed` : altText}</title>
        <circle
        className="circle-background"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        style={{ fill: 'none', stroke: colors.disabledButtonBorder, }}
      />
      <circle
        className="circle-progress"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
          fill: 'none',
          stroke: strokeColor,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
        />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          style={{
            fontSize: size === "small" || size === "tiny" ? ".6em" : size === "medium" ? ".8em" : "1em",
            fontWeight: 'bold',
            fill: textColor,
            ...textStyle
          }}
        >{text || `${percentage}%`}</text>
    </SVG>
}

