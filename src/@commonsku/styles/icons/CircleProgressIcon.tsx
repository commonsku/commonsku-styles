import React, { useCallback, useId } from "react";
import SVG, { SVGIconProps } from "./SvgIcon";
import { teal } from "../colors";
import { colors } from "../Theme";
import styled from "styled-components";

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
    fontSize: ".6em",
    defaultStrokeWidth: 3,
  },
  small: {
    width: 40,
    height: 40,
    viewBox: "0 0 40 40",
    fontSize: ".6em",
    defaultStrokeWidth: 3,
  },
  medium: {
    width: 48,
    height: 48,
    viewBox: "0 0 48 48",
    fontSize: ".8em",
    defaultStrokeWidth: 5,
  },
  large: {
    width: 72,
    height: 72,
    viewBox: "0 0 72 72",
    fontSize: "1em",
    defaultStrokeWidth: 5,
  },
  huge: {
    width: 96,
    height: 96,
    viewBox: "0 0 96 96",
    fontSize: "1em",
    defaultStrokeWidth: 5,
  },
  default: {
    height: 48,
    width: 48,
    viewBox: "0 0 48 48",
    fontSize: ".8em",
    defaultStrokeWidth: 5,
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
  const { width, defaultStrokeWidth, fontSize, viewBox } = iconSizes[size];
  strokeWidth = strokeWidth || defaultStrokeWidth;
  const squareSize = width;

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
          fontSize,
          fontWeight: "bold",
          fill: textColor,
          ...textStyle,
        }}
      >
        {text || `${percentage}%`}
      </text>
    ),
    [fontSize, textColor, textStyle, text, percentage],
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

const CircleProgressLoadingContainer = styled.div<{ iconId: string; animationSpeed?: string; }>`
#iconId .circle-progress {
    transform-origin: center;
    animation: circle-loader-spin ${p => p.animationSpeed ?? '1s'} infinite linear;
}
@keyframes circle-loader-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

export const CircleProgressLoadingIcon = ({
  size='large',
  percentage=25,
  text=' ',
  animationSpeed='1s',
  ...props
}: CircleProgressIconProps & { animationSpeed?: string; }) => {
  const iconId = useId();
  return (
    <CircleProgressLoadingContainer animationSpeed={animationSpeed} iconId={iconId}>
      <CircleProgressIcon id={iconId} {...props} size={size} percentage={percentage} text={text} />
    </CircleProgressLoadingContainer>
  );
};

