import React from 'react'
import styled, { StyledComponentProps } from 'styled-components'
import {Label} from './Label'
import { colors } from './Theme';
import { aeval } from '../utils';
import { SharedStyles, SharedStyleTypes } from './SharedStyles'

export const Textarea = styled.textarea<{noMargin?: boolean, error?:boolean} & SharedStyleTypes>`
  padding: .5rem;
  color: #123952;
  width: 100%;
  border: 1px solid ${p => p.error ? '#fa237c' : '#ABC7D1'};
  border-radius: 5px;
  box-sizing: border-box;
  font-family: 'skufont-regular', sans-serif;
  font-size: 1rem;
  background-color: white;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: ${props => props.noMargin ? 0 : "1rem"};
  &:focus {
    border: 2px solid ${p => p.error ? '#fa237c' : '#02c0da'};
    outline: none;
  }
  ${SharedStyles}
`;

type TextareaProps = StyledComponentProps<'textarea', any, {}, never>;

export const LabeledTextarea = ({ label, name, ...props}: TextareaProps & {label: string, name?: string, noMargin?: boolean} & SharedStyleTypes) => {
  return <div>
    <Label htmlFor={name}>{label}</Label>
    <Textarea name={name} {...props}></Textarea>
  </div>
}
