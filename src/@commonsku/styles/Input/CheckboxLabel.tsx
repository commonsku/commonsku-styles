import styled from 'styled-components'
import { neutrals } from '../colors';
import { fontStyles } from '../Theme';

const CheckboxLabel = styled.label<{disabled?: boolean}>`
  &&& {
    display: inline-flex;
    position: relative;
    margin-bottom: 12px;
    margin-right: 24px;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    font-size: ${fontStyles.label.fontSize};
    color: ${neutrals.darkest};
    font-family: ${fontStyles.label.fontFamily};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: normal;
    line-height: ${fontStyles.label.lineHeight};
    box-sizing: border-box;
    opacity: ${(props) => props.disabled ? 0.7 : 1};
    &:focus {
      outline: 0;
    }
  }
`;

export default CheckboxLabel;
