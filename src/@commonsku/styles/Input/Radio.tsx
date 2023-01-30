import styled from 'styled-components'
import { SharedStyles } from '../SharedStyles';
import { BaseRadioProps } from './types';

const Radio = styled.input<BaseRadioProps>`
  &&& {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    box-sizing: border-box;
    &:focus {
      outline: 0;
    }
    &:checked {
      background-color: white;
      display: block;
    }
    &:hover {
      background-color: #02c0da;
    }
    ${props => props.isHovering && `background-color: #02c0da;`}
    ${SharedStyles}
  }
`;

export default Radio;
