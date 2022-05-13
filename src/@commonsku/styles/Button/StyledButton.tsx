import styled, { css } from 'styled-components'
import { ButtonProps } from './types';
import { getBaseButtonStyles } from './styles';
import { SharedStyles } from '../SharedStyles';
import { SizerCss } from '../Sizer';

const StyledButton = styled.button<ButtonProps>`
&&& {
  ${p => css(getBaseButtonStyles(p))}
  ${SharedStyles}
  ${SizerCss}
}`;

export default StyledButton;
