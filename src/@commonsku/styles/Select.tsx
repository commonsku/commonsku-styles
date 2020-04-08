import React from 'react'
import Select, { Props as SelectProps, StylesConfig } from 'react-select'

import {Label} from './Label'

const SKUSelect = (props: SelectProps) => <Select 
  styles={{
    option: (provided, state) => ({
      ...provided,
      borderBottom: 'none',
      padding: 10,
    }),
    input: (provided, state) => ({
      ...provided,
      height: 'auto',
    }),
    control: (provided, state) => ({
      ...provided,
      marginBottom: (props.noMargin ? 0 : '1rem'),
    }),
    menu: (provided, state) => ({
      ...provided,
      border: 'none'
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }}
  theme={theme => ({
    ...theme,
    borderRadius: 5,
    colors: {
      ...theme.colors,
      primary25: '#DAE9EE',
      primary75: '#DAE9EE',
      primary50: '#C9E8F2',
      primary: '#02c0da',
      neutral20: '#ABC7D1',
      neutral30: '#ABC7D1',
      neutral80: '#52585C',
      neutral90: '#52585C'
    },
  })}
  {...props}
/>;

const LabeledSelect = (props: SelectProps & {noMargin?:boolean, parentStyle?:object}) => {
  return (
    <div style={props.parentStyle}>
      <Label htmlFor={props.name}>{props.label}</Label>  
      <SKUSelect {...props}/>
    </div>
  )
}

export {SKUSelect as Select, LabeledSelect};
