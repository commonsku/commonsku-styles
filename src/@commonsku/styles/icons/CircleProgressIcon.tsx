import React from 'react';
import { colors } from '../Theme';

const CircleProgressIcon = ({
  sqSize = 50,
  strokeWidth = 5,
  percentage = 0,
  strokeColor = colors.primary,
  textColor = colors.primary,
  text = '',
  textStyle = {},
  ...props
}: React.PropsWithChildren<{
  sqSize?: number,
  strokeWidth?: number,
  percentage?: number,
  strokeColor?: string,
  textColor?: string,
  text?: string,
  textStyle?: React.CSSProperties,
}>) => {

  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * percentage / 100;

  return (
    <svg
      width={sqSize}
      height={sqSize}
      viewBox={viewBox}
      {...props}
    >
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
          fontSize: '1em',
          fontWeight: 'bold',
          fill: textColor,
          ...textStyle
        }}
      >{text || `${percentage}%`}</text>
    </svg>
  );
};

export default CircleProgressIcon;
