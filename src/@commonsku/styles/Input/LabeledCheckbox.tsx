import React, { useState, } from 'react'
import { CheckboxIcon } from '../icons';
import CheckboxLabel from './CheckboxLabel';
import Radio from './Radio';
import { LabeledCheckboxProps } from './types';

const LabeledCheckbox: React.ForwardRefExoticComponent<LabeledCheckboxProps> =
  React.forwardRef<HTMLInputElement, LabeledCheckboxProps>((
    {
      label,
      name,
      checked,
      disabled,
      onChange,
      checkboxColor,
      checkboxHoverColor,
      hoverByLabel=true,
      stopPropagation=false,
      indeterminate=false,
      labelStyle={},
      checkboxStyle={},
      labelProps={},
      checkboxIconProps={},
      ...props
    },
    ref
  ) => {
    const [isHovering, updateHover] = useState(false);

    const onMouseOver = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => updateHover(true);
    const onMouseLeave = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => updateHover(false);

    return (
      <CheckboxLabel
        htmlFor={name}
        onMouseOver={hoverByLabel ? onMouseOver : undefined}
        onMouseLeave={hoverByLabel ? onMouseLeave : undefined}
        disabled={disabled}
        {...labelProps}
        style={labelStyle}
      >
        <CheckboxIcon 
          {...checkboxIconProps}
          hover={isHovering} 
          selected={checked} 
          disabled={disabled} 
          color={checkboxColor} 
          hoverColor={checkboxHoverColor} 
          indeterminate={indeterminate}
          mr={8}
          style={{...checkboxStyle}}
        />
        {label}
        <Radio ref={ref} name={name} type="checkbox" checked={checked} isHovering={isHovering} onChange={disabled? undefined : onChange} {...props} />
      </CheckboxLabel>
    );
  });

export default LabeledCheckbox;
