import React from 'react'
import styled from 'styled-components'
import BaseSelect, { Props as SelectProps, Styles, Theme } from 'react-select'
import BaseCreatableSelect, { Props as CreatableSelectProps } from 'react-select/creatable'
import BaseAsyncSelect, { Props as AsyncSelectProps } from 'react-select/async'
import { getThemeColor, colors } from './Theme';
import {Label} from './Label'

type AdditionalSKUSelectProps = {
  noMargin?: boolean,
  error?: boolean,
  menuRelative?: boolean, // fix for scroll menu inside scroll container like popup
  inPopup?:boolean,
}

type SKUSelectProps = AdditionalSKUSelectProps & SelectProps

type SKUSelectStylesProps = SKUSelectProps | AsyncSelectProps<{[key: string]: any}> | CreatableSelectProps<{[key: string]: any}>

const popupStyles: SelectProps = {
  menuPlacement: 'auto',
  menuPosition: 'fixed',
  menuPortalTarget: document.body,
}

function skuSelectStyles(props: SKUSelectStylesProps): Styles {
  return {
    option: (provided, state) => ({
      ...provided,
      borderBottom: 'none',
      padding: 10
    }),
    input: (provided, state) => {
      return {
      ...provided,
      height: 'auto',
      borderColor: props.error ? getThemeColor(props, 'special3'): getThemeColor(props, 'inputBorder', 'primary')
    }},
    control: (provided, state) => ({
      ...provided,
      marginBottom: (props.noMargin ? 0 : '1rem'),
      borderColor: props.error ? getThemeColor(props, 'special3'): provided.borderColor,
    }),
    menu: (provided, state) => ({
      ...provided,
      border: 'none',
      zIndex: 10,
      position: props.menuRelative ? 'relative' : provided.position,
    }),
    menuPortal: (provided, state) => ({
      ...provided,
      zIndex: 9999,
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
  };
}

const skuSelectTheme = (theme: Theme) => ({
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
})

// duplicate styles to overide .resku global styles
const SKUSelect = styled(
  React.forwardRef((
    {noMargin, menuRelative, inPopup, error, ...props}: SKUSelectProps,
    ref: React.Ref<BaseSelect>
  ) => {
    return <BaseSelect 
      ref={ref}
      classNamePrefix="commonsku-styles-select"
      {...(inPopup ? popupStyles : {})}
      noMargin={noMargin}
      menuRelative={menuRelative}
      error={error}
      styles={skuSelectStyles(props)}
      theme={skuSelectTheme}
      {...props}
    />
  })
)`
  &&& {
    .commonsku-styles-select__option {
      border-bottom: none;
      padding: 10px;
    }

    .commonsku-styles-select__value-container {
      padding: 2px 8px;
    }

    .commonsku-styles-select__input {
      height: auto;
      border-color: ${(props) => getThemeColor(props, 'inputBorder', 'primary')};

      input {
        height: auto;
      }
    }

    .commonsku-styles-select__control {
      margin-bottom: ${(props) => props.noMargin ? 0 : '1rem'};
    }

    .commonsku-styles-select__menu {
      border: none;
      zIndex: 10;
      ${(props) => props.menuRelative ? 'position: relative;' : ''}
    }

    .commonsku-styles-select__menuPortal {
      zIndex: 9999;
    }

    .commonsku-styles-select__indicatorSeparator {
      display: none;
    }

    ${props => !props.error ? '' : `
      .commonsku-styles-select__input, .commonsku-styles-select__control {
        border-color: ${getThemeColor(props, 'special3')};
      }
    `}
  }
`;

const LabeledSelect = ({ parentStyle, ...props }: SKUSelectProps & {parentStyle?:object}) => {
  return (
    <div style={parentStyle}>
      <Label htmlFor={props.name}>{props.label} {props.required && '*'}</Label>
      <SKUSelect {...props}/>
    </div>
  )
}

const SKUCreatableSelect = ({noMargin, menuRelative, inPopup, ...props}: AdditionalSKUSelectProps & CreatableSelectProps<{[key: string]: any}>) =>
  // @ts-ignore
  <BaseCreatableSelect 
    {...(inPopup ? popupStyles : {})}
    styles={skuSelectStyles(props)}
    theme={skuSelectTheme}
    {...props}
  />;

const LabeledCreatableSelect = ({ parentStyle, ...props }: AdditionalSKUSelectProps & CreatableSelectProps<{[key: string]: any}> & {parentStyle?:object}) => {
  return (
    <div style={parentStyle}>
      <Label htmlFor={props.name}>{props.label} {props.required && '*'}</Label>
      <SKUCreatableSelect {...props}/>
    </div>
  )
}


const SKUAsyncSelect = ({noMargin, menuRelative, inPopup, ...props}: AdditionalSKUSelectProps & AsyncSelectProps<{[key: string]: any}>) =>
  // @ts-ignore
  <BaseAsyncSelect 
    {...(inPopup ? popupStyles : {})}
    styles={skuSelectStyles(props)}
    theme={skuSelectTheme}
    {...props}
  />;

const LabeledAsyncSelect = ({ parentStyle, ...props }: AdditionalSKUSelectProps & AsyncSelectProps<{[key: string]: any}> & {parentStyle?:object}) => {
  return (
    <div style={parentStyle}>
      <Label htmlFor={props.name}>{props.label} {props.required && '*'}</Label>
      <SKUAsyncSelect {...props}/>
    </div>
  )
}

export {
  SKUSelect as Select,
  LabeledSelect,
  SKUCreatableSelect as CreatableSelect,
  LabeledCreatableSelect,
  SKUAsyncSelect as AsyncSelect,
  LabeledAsyncSelect,
};
