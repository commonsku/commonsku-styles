import styled from 'styled-components'
import { getThemeColor, colors } from '../Theme';
import { BaseInputIconLabelProps } from './types';

const InputIconLabel = styled.div<BaseInputIconLabelProps>`
&&& {
  box-sizing: border-box;
  width: 40px;
  height: ${p => p.error ? 38 : 36}px;
  background-color: ${p =>
    p.error
      ? getThemeColor(p, 'errors.main', colors.errors.main)
      : getThemeColor(p, 'input.iconWrapper.background', colors.input.iconWrapper.background)
  };
  border-radius: ${p => p.iconPosition === 'right' ? '0 3px 3px 0' : '3px 0 0 3px'};
  margin-bottom: 1rem;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 1.5rem;
  padding: 6px;

  :hover {
    background: ${p => getThemeColor(p, 'input.iconWrapper.hover.background')};
  }

  ${p => p.isHover
    ? `background: ${getThemeColor(p, 'input.iconWrapper.hover.background')};`
    : ''}

  ${p => p.isActive
      ? `background: ${getThemeColor(p, 'input.iconWrapper.active.background')};`
      : ''}

  ${p => p.isDisabled
    ? `background: ${getThemeColor(p, 'input.iconWrapper.disabled.background')};`
    : ''}
}`;

export default InputIconLabel;
