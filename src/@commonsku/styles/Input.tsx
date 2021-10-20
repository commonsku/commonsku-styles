import { map } from 'lodash';
import React, { useState, useRef, CSSProperties } from 'react'
import styled, { StyledComponentProps } from 'styled-components'
import { getThemeColor } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

import {Label} from './Label'

export type InputProps = StyledComponentProps<'input', any, {}, never> & {noMargin?: boolean, error?:boolean, isPercent?:boolean};

const IconLabel = styled.div<InputProps>`
  box-sizing: border-box;
  width: 40px;
  height: ${p => p.error ? 38 : 36}px;
  background-color: ${p => p.error ? getThemeColor(p, 'special3') : "#ABC7D1"};
  border-radius: 5px 0 0 5px;
  margin-bottom: 1rem;
  color: white;
  font-size: 18px;
  text-align: center;
  padding-top: 6px;
  line-height: 1.5rem;
`

const IconLabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const Input = styled.input<InputProps & SharedStyleTypes>`
  &&& {
    padding: .5rem;
    color: ${props => getThemeColor(props, 'textlabel')};
    width: 100%;
    border: ${p => p.error ? 2 : 1}px solid ${p => p.error ? getThemeColor(p, 'special3') : getThemeColor(p, 'inputBorder')};
    border-radius: ${p => p.isPercent ?  "0 5px 5px 0" : "5"}px;
    box-sizing: border-box;
    font-family: 'skufont-regular', sans-serif;
    font-size: 1rem;
    background-color: white;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: ${props => props.noMargin ? 0 : "1rem"};
    &:focus {
      box-shadow: 1px  1px 0px ${p => p.error ? getThemeColor(p, 'special3') : getThemeColor(p, 'inputBorder', 'primary')},
                 -1px -1px 0px ${p => p.error ? getThemeColor(p, 'special3') : getThemeColor(p, 'inputBorder', 'primary')},
                  1px -1px 0px ${p => p.error ? getThemeColor(p, 'special3') : getThemeColor(p, 'inputBorder', 'primary')},
                 -1px  1px 0px ${p => p.error ? getThemeColor(p, 'special3') : getThemeColor(p, 'inputBorder', 'primary')};
      outline: none;
    }
  }
  ${SharedStyles}
`;


type LabeledInputPropType = InputProps & {label: string, name?: string, isPercent?: boolean} & SharedStyleTypes;
export const LabeledInput = React.forwardRef(
  ({label, name, required, ...props}: LabeledInputPropType, ref: React.Ref<HTMLInputElement>) => (
    <div>
      <Label htmlFor={name}>{label} {required && '*'}</Label>
      {props.isPercent ? <IconLabelContainer>
                           <IconLabel {...props}>%</IconLabel>
                           <Input ref={ref} name={name} required={required} {...props}/>
                         </IconLabelContainer>
                       : <Input ref={ref} name={name} required={required} {...props}></Input>}
    </div>
  )
)

export const RadioLabel = styled.label<{disabled?: boolean}>`
  &&& {
    display: inline-block;
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
    opacity: ${(props) => props.disabled ? 0.7 : 1};
    &:focus {
      outline: 0;
    }
  }
`;

type RadioProps = StyledComponentProps<'input', any, {isHovering?: boolean}, never>;
export const Radio = styled.input<RadioProps>`
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

export const CheckMark = styled.span<{checked?: boolean, isHovering?: boolean, disabled?: boolean}&SharedStyleTypes>`
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

export const Dot = styled.span<{checked?: boolean, isHovering?: boolean, disabled?: boolean}&SharedStyleTypes>`
  &&& {
    position: absolute;
    top: 0;
    left: 0;
    height: 23px;
    width: 23px;
    opacity: ${(props) => props.disabled ? 0.7 : 1};
    filter: ${(props) => props.disabled ? "grayscale(100%)" : "none"};
    background-color: ${(props) => (props.isHovering && !props.checked && !props.disabled) ? '#02c0da' : 'white'};
    border: 2px solid #02c0da;
    border-radius: 50%;
    box-sizing: border-box;
    &:focus {
      outline: 0;
    }
    &:hover {
      background-color: ${(props) => !props.checked && !props.disabled ? '#02c0da' : 'white'};
    }
    &::after {
      top: 5px;
      left: 5px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #02c0da;
      content: "";
      position: absolute;
      display: none;
      ${(props) => props.checked && `display: block;`}
    }
    ${SharedStyles}
`;

Dot.defaultProps = {
  checked: false,
}

CheckMark.defaultProps = {
  checked: false,
}

export const LabeledRadio: React.FC<RadioProps & {label: string}> = ({ 
  label, name, checked, disabled, onChange, ...props 
}) => {
  const [ isHovering, updateHover ] = useState(false);
  const radio = useRef<HTMLInputElement>(null);

  return (
    <RadioLabel
      htmlFor={name}
      onMouseOver={(e) => updateHover(true)}
      onMouseLeave={(e) => updateHover(false)}
      disabled={disabled}
      onClick={() => {
        radio.current?.click();
      }}
    >
      {label}
      <Radio ref={radio} name={name} type="radio" checked={checked} isHovering={isHovering} onChange={disabled? undefined : onChange} {...props} />
      <Dot checked={checked} isHovering={isHovering} disabled={disabled}/>
    </RadioLabel>
  );
}

export const LabeledRadioGroup: React.FC<RadioProps & {name: string, radios: [{label: string, value: any}]}> = ({ 
  name, value, radios, onChange, ...props 
}) => {
  return <>
    {map(radios, (radioProps, i) => {
      return <LabeledRadio key={i} name={name} checked={value === radioProps.value} onChange={onChange} 
        {...radioProps}
      />
    })}
  </>
}

export type LabeledCheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  label: string|React.ReactNode;
  name?: string;
  checkboxStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  [key: string]: any;
};
export const LabeledCheckbox = React.forwardRef<HTMLInputElement, LabeledCheckboxProps>((
  {label, name, checked, disabled, onChange, checkboxStyle={}, labelStyle={}, ...props}: LabeledCheckboxProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const [isHovering, updateHover] = useState(false);
  return (
    <RadioLabel
      htmlFor={name}
      onMouseOver={(e) => updateHover(true)}
      onMouseLeave={(e) => updateHover(false)}
      disabled={disabled}
      style={labelStyle}
    >
      {label}
      <Radio ref={ref} name={name} type="checkbox" checked={checked} isHovering={isHovering} onChange={disabled? undefined : onChange} {...props} />
      <CheckMark checked={checked} isHovering={isHovering} disabled={disabled} style={checkboxStyle} />
    </RadioLabel>
  );
});
