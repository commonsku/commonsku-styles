import styled from 'styled-components'
import { SharedStyles } from '../SharedStyles';
import { SizerCss } from '../Sizer';
import { ButtonsGroupProps } from './types';

const ButtonsGroup = styled.div<ButtonsGroupProps>`
&&& {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 10px;
  margin-right: 100px;
  ${SharedStyles}
  ${SizerCss}
}`;

export default ButtonsGroup;
