import React from 'react'
import {Label} from './Label'
import Select, { NonceProvider } from 'react-select'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: 'none',
    padding: 10,
  }),
  input: (provided, state) => ({
    ...provided,
    height: 'auto'
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
  },
}

const SKUSelect = props => <Select styles={customStyles} theme={theme => ({
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
{...props}/>;

const LabeledSelect = (props) => {
  return <div>
           <Label htmlFor={props.name}>{props.label}</Label>  
	   <SKUSelect {...props}/>
         </div>
}

export {SKUSelect as Select, LabeledSelect};
