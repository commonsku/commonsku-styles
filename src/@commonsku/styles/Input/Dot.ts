import styled from 'styled-components'
import { SharedStyles } from '../SharedStyles';
import { DotProps } from './types';

const Dot = styled.span<DotProps>`
  &&& {
    position: absolute;
    top: 0;
    left: 0;
    height: 23px;
    width: 23px;
    opacity: ${(props) => props.disabled ? 0.7 : 1};
    filter: ${(props) => props.disabled ? "grayscale(100%)" : "none"};
    background-color: ${(props) => (props.isHovering && !props.checked && !props.disabled) ? '#02c0da' : 'white'};
    border: 2px solid #02c0da;
    border-radius: 50%;
    box-sizing: border-box;
    &:focus {
      outline: 0;
    }
    &:hover {
      background-color: ${(props) => !props.checked && !props.disabled ? '#02c0da' : 'white'};
    }
    &::after {
      top: 5px;
      left: 5px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #02c0da;
      content: "";
      position: absolute;
      display: none;
      ${(props) => props.checked && `display: block;`}
    }
    ${SharedStyles}
`;

Dot.defaultProps = {
  checked: false,
}

export default Dot;
