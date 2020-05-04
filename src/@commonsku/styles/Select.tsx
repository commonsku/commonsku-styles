import React from 'react'
import Select, { Props as SelectProps, StylesConfig } from 'react-select'
import { getThemeColor, colors } from './Theme';
import {Label} from './Label'

type SKUSelectProps = {
  noMargin?: boolean,
  menuRelative?: boolean, // fix for scroll menu inside scroll container like popup
} & SelectProps

const SKUSelect = (props: SKUSelectProps) => <Select 
  styles={{
    option: (provided, state) => ({
      ...provided,
      borderBottom: 'none',
      padding: 10
    }),
    input: (provided, state) => ({
      ...provided,
      height: 'auto',
      borderColor: props.error ? getThemeColor(props, 'special3'): getThemeColor(props, 'inputBorder', 'primary')
    }),
    control: (provided, state) => ({
      ...provided,
      marginBottom: (props.noMargin ? 0 : '1rem'),
    }),
    menu: (provided, state) => ({
      ...provided,
      border: 'none',
      zIndex: 10,
      position: props.menuRelative ? 'relative' : provided.position,
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
      primary25: colors.primary0,
      primary75: colors.primary0,
      primary50: colors.primary10,
      primary: colors.primary,
      neutral20: colors.inputBorder,
      neutral30: colors.inputBorder,
      neutral80: colors.textbody,
      neutral90: colors.textbody
    },
  })}
  {...props}
/>;

const LabeledSelect = (props: SKUSelectProps & {parentStyle?:object}) => {
  return (
    <div style={props.parentStyle}>
      <Label htmlFor={props.name}>{props.label}</Label>  
      <SKUSelect {...props}/>
    </div>
  )
}

export {SKUSelect as Select, LabeledSelect};
