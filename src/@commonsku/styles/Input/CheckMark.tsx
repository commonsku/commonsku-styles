import styled from 'styled-components'
import { SharedStyles } from '../SharedStyles';
import { CheckMarkProps } from './types';

const CheckMark = styled.span<CheckMarkProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 23px;
  width: 23px;
  background-color: ${(props) => ((props.isHovering || props.checked) && !props.disabled) ? '#02c0da' : 'white'};
  opacity: ${(props) => props.disabled ? 0.7 : 1};
  filter: ${(props) => props.disabled ? "grayscale(100%)" : "none"};
  border: 2px solid #02c0da;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: ${(props) => props.disabled ? "white" : "#02c0da"};
  }
  &::after {
    content: "";
    position: absolute;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    box-sizing: border-box;
    display: ${(props) => props.checked ? 'block' : 'none'};
  }
  ${SharedStyles}
`

CheckMark.defaultProps = {
  checked: false,
}

export default CheckMark;
