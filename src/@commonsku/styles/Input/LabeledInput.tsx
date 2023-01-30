import React from 'react'
import { getThemeColor, } from '../Theme';
import { Label } from '../Label';
import Input from './Input';
import { LabeledInputPropType } from './types';

const LabeledInput =
  React.forwardRef<HTMLInputElement, LabeledInputPropType>(
    ({label, name, required, labelOnTop=false, wrapperProps={}, ...props}, ref) => (
      <div {...wrapperProps}>
        <Label
          htmlFor={name}
          style={{
            ...(!labelOnTop ? {} : {display: 'block'}),
            fontFamily: "'skufont-medium', sans-serif",
            lineHeight: '24px',
            fontSize: '16px',
            color: getThemeColor(props, 'neutrals.100'),
          }}
        >{label} {required && '*'}</Label>
        <Input ref={ref} name={name} required={required} {...props}></Input>
      </div>
    )
  );

export default LabeledInput;
