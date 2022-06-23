import styled from 'styled-components';
import React from 'react';
import { get } from 'lodash';
import { getThemeColor, fontStyles, colors} from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

export const toggleSizes = {
  small: {
    'font-family': fontStyles.button.small.fontFamily,
    'font-size': fontStyles.button.small.fontSize,
    'line-height': fontStyles.button.small.lineHeight,
    padding: '8px 12px',
    borderRadius: '4px',
    height: '32px',

  },
  medium: {
    'font-family': fontStyles.button.medium.fontFamily,
    'font-size': fontStyles.button.medium.fontSize,
    'line-height': fontStyles.button.medium.lineHeight,
    padding: '8px 16px',
    borderRadius: '4px',
    height: '40px',

  },
  large: {
    'font-family': fontStyles.button.large.fontFamily,
    'font-size': fontStyles.button.large.fontSize,
    'line-height': fontStyles.button.large.lineHeight,
    padding: '12px 24px',
    borderRadius: '4px',
    height: '56px',
  }
};

type ToggleSize = keyof typeof toggleSizes;

const getSizeStyle = (style: string, defaults: string) => {
  return ({ size }: ToggleProps) => {
    if (size) {
      return get(toggleSizes, [size, style]) || defaults;
    }
    return defaults;
  };
}

const Wrapper = styled.div<{size?: ToggleSize}>`
  &&& {
    display: inline-flex;
    max-width: 600px;
    justify-content: flex-start;
    width: 100%; 
  }`

const Container = styled.div<{stretch?:boolean, size?: ToggleSize }&SharedStyleTypes>`
  &&& {
    background: ${props => getThemeColor(props, 'teal.20', colors.teal['20'])};
    border-radius: 50px;
    display: flex;
    justify-content: space-between;
    width: ${props => props.stretch ? "100%" : "auto"};
    ${SharedStyles}
  }`

const ToggleLink = styled.a<{selected?: boolean, stretch?:boolean, size?: ToggleSize }&SharedStyleTypes>`
  &&& {
    font-family: 'skufont-medium', sans-serif;
    font-size: ${ props => getSizeStyle('font-size', '1rem')({size: props.size})};
    border-radius: 30px;
    display: flex;
    align-content: center;
    padding: ${ props => getSizeStyle('padding', '8px 16px')({size: props.size})};
    height: auto;
    line-height: ${ props => getSizeStyle('line-height', '24px')({size: props.size})};
    width: ${props => props.stretch? "50%" : "auto"};
    justify-content: center;
    cursor: pointer;
    background-color: ${props => props.selected ? getThemeColor(props, 'teal.main', colors.teal.main) : getThemeColor(props, 'teal.20', colors.teal['20']) };
    color: ${props => props.selected ? "white" : getThemeColor(props, 'teal.main', colors.teal.main) };
    ${SharedStyles}
  }`

type ToggleProps = React.PropsWithChildren<{
  stretch?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  size?: ToggleSize;
} & SharedStyleTypes>;

const Toggle = ({ size='medium', ...props }: ToggleProps) => {
  return <Wrapper size={size} {...props}>
    <Container stretch={props.stretch} size={size} {...props}>
      {
        React.Children.map(props.children, (child:any, index) => {
          return React.cloneElement(child, { size: size });
        })
      }
    </Container>
  </Wrapper>
}

export { Toggle, ToggleLink }
