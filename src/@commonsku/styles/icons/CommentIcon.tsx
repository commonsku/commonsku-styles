import React from 'react';
import SVG, { SVGIconProps } from './SvgIcon';
import { teal } from '../colors';
import { fontStyles } from '../Theme';
import styled from 'styled-components';
import { get } from 'lodash';

export const iconSizes = {
    tiny: {
      'font-size': fontStyles.button.small.fontSize,
    },
    small: {
      'font-size': fontStyles.button.small.fontSize,
    },
    medium: {
      'font-size': fontStyles.button.medium.fontSize,
    },
    large: {
      'font-size': fontStyles.button.large.fontSize,
    },
    huge: {
        'font-size': fontStyles.button.huge.fontSize,
    },
    default: {
        'font-size': fontStyles.button.medium.fontSize,
    },
  };
  
  type iconSize = keyof typeof iconSizes;
  
  const getSizeStyle = (style: string, defaults: string) => {
    return ({ size }: CommentIconProps) => {
      if (size) {
        return get(iconSizes, [size, style]) || defaults;
      }
      return defaults;
    };
  }

type CommentIconProps = {
    number?: number;
} & SVGIconProps;

const OuterContainer = styled.div`
    display:inline-flex;
    flex-direction: row;
    align-items: top;
`;

const CommentNumber = styled.p<{number?: number | string, color: string, size?: iconSize}>`
    display:block;
    font-family: ${fontStyles.p.small.fontFamily};
    font-size: ${ props => getSizeStyle('font-size', fontStyles.button.medium.fontSize)({size: props.size})};
    color: ${props => props.color};
    margin-top: 0;
    margin-bottom: 0;
`;
export default function CommentIcon({
    color=teal.main,
    size="medium",
    altText="Comments",
    number,
    ...props
}: CommentIconProps) {
    const numberToShow = number !== undefined && number <= 99 ? number : '99+';

    const showNumber = number ? <CommentNumber color={color} number={number} size={size}>{numberToShow}</CommentNumber> : null;

    return (
        <>
            <OuterContainer>
                <SVG size={size} aria-labelledby="CommentIcon" mr={4} {...props}>
                    <title id="CommentIcon">{altText}</title>
                    <path
                        d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18ZM20 4v13.17L18.83 16H4V4h16ZM6 12h12v2H6v-2Zm0-3h12v2H6V9Zm0-3h12v2H6V6Z"
                        fill={color} />
                </SVG>
                {showNumber}
            </OuterContainer>  
        </>
    )
}

