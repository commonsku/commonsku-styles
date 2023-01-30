import { map } from 'lodash';
import React from 'react'
import LabeledRadioInButton from './LabeledRadioInButton';
import { LabeledRadioInButtonGroupProps } from './types';

const LabeledRadioInButtonGroup: React.FC<LabeledRadioInButtonGroupProps> = ({ 
  name, value, radios, onChange, ...props 
}) => {
  return <>
    {map(radios, (radioProps, i) => {
      return <LabeledRadioInButton
        key={i}
        name={name}
        checked={value === radioProps.value}
        onChange={onChange} 
        {...radioProps}
      />
    })}
  </>
}

export default LabeledRadioInButtonGroup;
