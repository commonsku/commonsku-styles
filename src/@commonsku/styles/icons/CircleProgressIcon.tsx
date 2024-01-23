import React, { useCallback } from "react";
import SVG, { SVGIconProps } from "./SvgIcon";
import { teal } from "../colors";
import { colors } from "../Theme";

type CircleProgressIconProps = SVGIconProps & {
  strokeWidth?: number;
  percentage?: number;
  strokeColor?: string;
  textColor?: string;
  text?: string;
  textStyle?: React.CSSProperties;
  showCheckMarkOnComplete?: boolean;
  size?: "tiny" | "small" | "medium" | "large" | "huge";
  altText?: string;
};

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
    height: 48,
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

export default function CircleProgressIcon({
  strokeWidth,
  percentage = 0,
  strokeColor = teal.main,
  textColor = teal.main,
  text = "",
  textStyle = {},
  showCheckMarkOnComplete = false,
  size = "medium",
  altText = "Progress level",
  ...props
}: CircleProgressIconProps) {
  const squareSize = iconSizes[size].width || 48;
  strokeWidth = strokeWidth || (["tiny", "small"].includes(size) ? 3 : 5);

  const radius = (squareSize - strokeWidth) / 2;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  const isComplete = percentage === 100;

  const renderInnerText = useCallback(
    () => (
      <text
        className="circle-text"
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        style={{
          fontSize: ["tiny", "small"].includes(size)
            ? ".6em"
            : size === "medium"
              ? ".8em"
              : "1em",
          fontWeight: "bold",
          fill: textColor,
          ...textStyle,
        }}
      >
        {text || `${percentage}%`}
      </text>
    ),
    [text, percentage, size, textColor, textStyle],
  );

  const renderCheckMark = useCallback(() => {
    const preferredViewBox = 40;
    const scale = squareSize / preferredViewBox;
    const scaledPath = [
      { x: 12.0006 * scale, y: 21.599 * scale },
      { x: 17.5629 * scale, y: 27.1617 * scale },
      { x: 29.1621 * scale, y: 15.5625 * scale },
    ]
      .map((p) => `${p.x},${p.y}`)
      .join(" L");

    return (
      <path
        d={`M${scaledPath}`}
        stroke={strokeColor}
        strokeWidth={`${strokeWidth}px`}
        fill="none"
      />
    );
  }, [squareSize, strokeColor, strokeWidth]);

  return (
    <SVG
      size={size}
      iconSizes={iconSizes}
      aria-labelledby="CircleProgressIcon"
      {...props}
    >
      <title id="CircleProgressIcon">
        {altText || (text ? `${text} stage` : `${percentage}% completed`)}
      </title>
      <circle
        className="circle-background"
        cx={squareSize / 2}
        cy={squareSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        style={{ fill: "none", stroke: colors.disabledButtonBorder }}
      />
      <circle
        className="circle-progress"
        cx={squareSize / 2}
        cy={squareSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${squareSize / 2} ${squareSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
          fill: "none",
          stroke: strokeColor,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      />
      {showCheckMarkOnComplete && isComplete
        ? renderCheckMark()
        : renderInnerText()}
    </SVG>
  );
}
