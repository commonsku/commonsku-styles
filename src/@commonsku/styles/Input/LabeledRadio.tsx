import React, { useState, useRef, } from 'react'
import { RadioIcon, } from '../icons';
import Radio from './Radio';
import RadioLabel from './RadioLabel';
import { LabeledRadioProps } from './types';

const LabeledRadio: React.FC<LabeledRadioProps> = ({ 
  label,
  name,
  checked,
  disabled,
  labelStyle,
  radioIconStyle,
  radioColor,
  radioHoverColor,
  onChange,
  labelProps={},
  radioIconProps={},
  ...props 
}) => {
  const [ isHovering, updateHover ] = useState(false);
  const radio = useRef<HTMLInputElement>(null);

  return (
    <RadioLabel
      {...labelProps}
      htmlFor={name}
      onMouseOver={(e) => updateHover(true)}
      onMouseLeave={(e) => updateHover(false)}
      disabled={disabled}
      style={{...labelStyle, ...(labelProps.style || {})}}
      onClick={() => {
        radio.current?.click();
      }}
    >
      <RadioIcon 
        {...radioIconProps}
        selected={checked} 
        hover={isHovering} 
        disabled={disabled} 
        color={radioColor}
        hoverColor={radioHoverColor}
        mr={8} 
        style={{
          ...(radioIconProps.style || {}),
          ...(radioIconStyle ? radioIconStyle : {position: 'absolute', left: 0}),
        }}/>
      {label}
      <Radio ref={radio} name={name} type="radio" checked={checked} isHovering={isHovering} onChange={disabled? undefined : onChange} {...props} />
    </RadioLabel>
  );
}

export default LabeledRadio;
