import { get, toNumber } from 'lodash';
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
  return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const Number: React.FC<{num: number, commas?: boolean, decimalPoints?:number} & SharedStyleTypes> = ({
  num, commas, decimalPoints = 2, ...props
}) => {
  let fixedNum = (toNumber(num) || 0).toFixed(decimalPoints)
  return <span {...props}>
    { commas ? numberWithCommas(fixedNum) : fixedNum }
  </span>
}