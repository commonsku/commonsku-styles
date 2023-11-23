import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';
import { fontStyles } from '../Theme';
import styled from 'styled-components';
import { get } from 'lodash';

export const iconSize = {
  tiny: {
      width: 14,
      height: 21,
      viewBox: "0 0 24 31",
      'font-size': fontStyles.button.small.fontSize,
  },
  small: {
      width: 16,
      height: 23,
      viewBox: "0 0 24 31",
      'font-size': fontStyles.button.small.fontSize,
  },
  medium: {
      width: 24,
      height:31,
      viewBox: "0 0 24 31",
      'font-size': fontStyles.button.medium.fontSize,
  },
  large: {
      width: 32,
      height:39,
      viewBox: "0 0 24 31",
      'font-size': fontStyles.button.large.fontSize,
  },
  huge: {
      width: 48,
      height:55,
      viewBox: "0 0 24 31",
      'font-size': fontStyles.button.huge.fontSize,
  },
  default: {
      width: 24,
      height:31,
      viewBox: "0 0 24 31",
      'font-size': fontStyles.button.medium.fontSize,
  },
};

type iconSize = keyof typeof iconSize;

const getSizeStyle = (style: string, defaults: string) => {
  return ({ size }: CommentBubbleIconProps) => {
    if (size) {
      return get(iconSize, [size, style]) || defaults;
    }
    return defaults;
  };
}

type CommentBubbleIconProps = {
  number?: number;
  numberStyle?: React.CSSProperties,
} & SVGIconProps;

const OuterContainer = styled.div`
    display:inline-flex;
    flex-direction: row;
    align-items: top;
`;

const CommentNumber = styled.p<{
  number?: number | string,
  color: string,
  size?: iconSize,
  left?: string,
}>`
  display:block;
  font-family: ${fontStyles.p.small.fontFamily};
  font-size: ${p => getSizeStyle('font-size', fontStyles.button.medium.fontSize)({ size: p.size })};
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0;
  position: absolute;
  color: #fff;
  top: 13px;
  width: ${p => getSizeStyle('width', '24')({ size: p.size })}px;
  left: 0;
  text-align: center;
`;
export default function CommentBubbleIcon({
  color = teal.main,
  size = "medium",
  altText = "Comments",
  number,
  numberStyle={},
  ...props
}: CommentBubbleIconProps) {
  const numberToShow = number !== undefined && number <= 99 ? number : '99+';
  const showNumber = number ? (
    <CommentNumber
      color={color}
      number={number}
      size={size}
      style={numberStyle}
    >{numberToShow}</CommentNumber>
  ) : null;

  return (
    <OuterContainer>
      <SVG iconSizes={iconSize} size={size} aria-labelledby="CommentBubbleIcon" mr={4} {...props}>
        <title id="CommentBubbleIcon">{altText}</title>
        <path d="M11.4286 4.05725C17.7371 4.05725 22.8571 9.17725 22.8571 15.4858C22.8571 17.2458 22.4457 18.8915 21.7486 20.3887L24 28.0573L16.3314 25.8058C14.8343 26.503 13.1886 26.9144 11.4286 26.9144C5.12 26.9144 0 21.7944 0 15.4858C0 9.17725 5.12 4.05725 11.4286 4.05725Z"
          fill={color} />
      </SVG>
      {showNumber}
    </OuterContainer>
  )
}

