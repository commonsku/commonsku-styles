import { map } from 'lodash';
import React from 'react'
import LabeledRadio from './LabeledRadio';
import { LabeledRadioGroupProps } from './types';

const LabeledRadioGroup: React.FC<LabeledRadioGroupProps> = ({ 
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

export default LabeledRadioGroup;
