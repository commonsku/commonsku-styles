import { get } from 'lodash';
import styled from 'styled-components'

/*

  PASS THE BUTTON TYPE AS A PROP:
    - primary (default)
    - secondary
    - cta
    - link

  PASS A SIZE AS A PROP:
    - xl
    - large
    - medium (default)
    - small
    - tiny
  
  OPTIONAL PROPS:
    - disabled

*/

const sizes = {
  tiny: {
    'font-size': '.8em',
    'font-family': "'skufont-regular', sans-serif",
    padding: '5px 5px',
  },
  small: {
    'font-family': "'skufont-regular', sans-serif",
    padding: '7px 15px',
  },
  large: {
    padding: '17px 30px',
  },
  xl: {
    padding: '17px 50px',
  },
};

type ButtonProps = {
  secondary?: boolean, cta?: boolean, size?: keyof typeof sizes
};

const getSizeStyle = (style: string, defaults: string) => {
  return ({ size }: ButtonProps) => {
    if (size) {
      return get(sizes, [size, style]) || defaults;
    }
    return defaults;
  };
}

const Button = styled.button<ButtonProps>`
  border: 3px solid white;
  border-radius: 5px;
  background: ${props => props.secondary ? "transparent" : props => props.cta ? "#fa237c" : "#02c0da" };
  color: ${props => props.secondary ? "#02c0da" : "white"};
  border-color: ${props => props.cta ? "#fa237c" : "#02c0da" };
  font-size: ${getSizeStyle('font-size', '1em')};
  padding: ${getSizeStyle('padding', '12px 25px')};
  font-family: ${getSizeStyle('font-family', "'skufont-demibold', sans-serif")};
  cursor: pointer;
  &:disabled {
    background-color: #DAE9EE;
    border-color: #C9E8F2;
    color: #02c0da;
    cursor: default;
    opacity: 0.5;
  }
`;

export const ButtonsGroup = styled.div`
  display: inline-flex;
  max-width: 600px;
  margin-bottom: 10px;
  margin-right: 100px;
  justify-content: space-around;
`;

export {Button};
