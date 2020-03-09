import React, { useState } from 'react'
import styled, { StyledComponentProps } from 'styled-components'

import {Label} from './Label'

export const Input = styled.input<{noMargin?: boolean}>`
  padding: .5rem;
  color: #123952;
  width: 100%;
  border: 1px solid #ABC7D1;
  border-radius: 5px;
  box-sizing: border-box;
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

export const LabeledInput = ({ label, name, ...props}: InputProps & {label: string, name?: string, noMargin?: boolean}) => {
  return <div>
    <Label htmlFor={name}>{label}</Label>
    <Input {...props}></Input>
  </div>
}

export const RadioLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  margin-right: 25px;
  cursor: pointer;
  font-size: 16px;
  color: #52585c;
  font-family: 'skufont-medium', sans-serif;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-weight: normal;
  line-height: 1.5;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
`;

export const Radio = styled.input<{isHovering?: boolean}>`
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
`;

export const Dot = styled.span<{checked?: boolean, isHovering?: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 23px;
  width: 23px;
  background-color: ${(props) => 
      (props.isHovering && !props.checked) ? '#02c0da' : 'white'};
  border: 2px solid #02c0da;
  border-radius: 50%;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: ${(props) => 
      !props.checked ? '#02c0da;' : 'white'};
  }

  &:after {
    top: 5px;
    left: 5px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #02c0da;
    content: "";
    position: absolute;
    display: none;
    ${(props) => props.checked && `
    display: block;
    `}
  }
`;

Dot.defaultProps = {
  checked: false,
}

export const LabeledRadio = (
  {label, name, checked, ...props}: {label: string, name?: string, [key: string]: any}
) => {

  const [ isHovering, updateHover ] = useState(false);

  return (
    <RadioLabel
      htmlFor={name}
      onMouseOver={(e) => updateHover(true)}
      onMouseLeave={(e) => updateHover(false)}
    >
      {label}
      <Radio type="radio" checked={checked} isHovering={isHovering} {...props} />
      <Dot checked={checked} isHovering={isHovering}  />
    </RadioLabel>
  );
}
