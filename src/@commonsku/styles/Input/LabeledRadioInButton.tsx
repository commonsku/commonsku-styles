import React from 'react'
import { colors } from '../Theme';
import { neutrals, teal } from '../colors';
import LabeledRadio from './LabeledRadio';
import { LabeledRadioInButtonProps } from './types';

const LabeledRadioInButton: React.FC<LabeledRadioInButtonProps> = ({ 
  label,
  name,
  checked,
  disabled,
  labelStyle,
  radioIconStyle,
  flexGrow,
  onChange,
  ...props  
}) => {
  return(
    <LabeledRadio
      label={label}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      labelStyle={{
        padding: "13px 40px",
        backgroundColor: disabled ? neutrals['40'] : checked ? colors.white : teal['20'],
        border: disabled ? `solid 3px ${neutrals['40']}` : checked ? `solid 3px ${teal.main}` : `solid 3px ${teal['20']}`,
        borderRadius: "200px",
        color: disabled ? neutrals['70'] : teal.main,
        flexGrow: flexGrow ? 1 : undefined, 
        justifyContent: 'center',
      }}
      radioIconStyle={{
      }}
    />
  )
}

export default LabeledRadioInButton;
