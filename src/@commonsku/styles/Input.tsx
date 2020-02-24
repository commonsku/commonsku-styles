import React from 'react'
import styled, { StyledComponentProps } from 'styled-components'

import {Label} from './Label'

const Input = styled.input<{noMargin?: boolean}>`
  padding: .5rem;
  color: #123952;
  width: 100%;
  border: 1px solid #ABC7D1;
  border-radius: 5px;
  font-family: 'skufont-regular', sans-serif;
  font-size: 1rem;
  background-color: white;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: ${props => props.noMargin ? 0 : "1rem"};
  &:focus {
    border: 2px solid #02c0da;
    outline: none;
  }
`;

type InputProps = StyledComponentProps<'input', any, {}, never>;

const LabeledInput = ({ label, name, ...props}: InputProps & {label: string, name?: string, noMargin?: boolean}) => {
  return <div>
    <Label htmlFor={name}>{label}</Label>
    <Input {...props}></Input>
  </div>
}

export {Input, LabeledInput};
