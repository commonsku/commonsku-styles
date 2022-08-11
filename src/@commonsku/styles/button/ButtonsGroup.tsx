import styled from 'styled-components'
import { ButtonsGroupProps } from './types';
import { parseCskuStyles } from '../Csku';

const ButtonsGroup = styled.div<ButtonsGroupProps>`
&&& {
    ${parseCskuStyles}
    display: inline-block;
    max-width: 100%;
    margin-bottom: 10px;
    margin-right: 100px;
}`;

export default ButtonsGroup;
