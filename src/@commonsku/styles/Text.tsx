import { get } from 'lodash';
import React from 'react';
import styled from 'styled-components'
import { colors, fonts } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

export const Text = styled.span<{color?: keyof typeof colors} & SharedStyleTypes>`
  font-family: ${fonts.join(', ')};

  color: ${props => colors[props.color ?? 'textbody']};
  background-color: ${props => props.bg ? get(colors, `${props.color}Bg`, 'transparent') : 'transparent'};
  border-radius: ${props => props.bg ? '5px' : '0px'};
  padding: ${props => props.bg ? '5px' : '0px'};
  ${SharedStyles}
`;
type TextProps = React.ComponentProps<typeof Text>;

const _Link: React.FC<{highlight?: boolean} & TextProps & SharedStyleTypes> = ({ highlight, ...props }) => {
  return <Text color={highlight ? 'special2' : 'primary'} {...props}/>;
}
export const Link = styled(_Link)`
  cursor: pointer;
  ${SharedStyles}
`;

function numberWithCommas(num: string) {
  return num.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const Number = (props: {num: number, commas?: boolean, decimalPoints?:number} & SharedStyleTypes) => {
  const val = typeof props.num === 'number'
                ? props.num
                : !isNaN(props.num) ? parseFloat(props.num) : 0;

  let fixedNum = val.toFixed(props.decimalPoints !== undefined ? props.decimalPoints : 2)
  return <span {...props}>
    { props.commas ? numberWithCommas(fixedNum) : fixedNum }
  </span>
}