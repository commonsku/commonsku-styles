import { get } from 'lodash';
import React from 'react'
import BaseSelect, { Props as SelectProps, SelectInstance, GroupBase, StylesConfig, Theme, components, createFilter, mergeStyles } from 'react-select'
import BaseCreatableSelect, { CreatableProps } from 'react-select/creatable'
import BaseAsyncSelect, { AsyncProps } from 'react-select/async'
import { getThemeColor, colors } from './Theme';
import {Label} from './Label'
import { document } from '../utils';

type AdditionalSKUSelectProps = {
  noMargin?: boolean,
  error?: boolean,
  menuRelative?: boolean, // fix for scroll menu inside scroll container like popup
  inPopup?: boolean,
  controlStyles?: React.CSSProperties,
  menuStyles?: React.CSSProperties,
  menuListStyles?: React.CSSProperties,
  menuPortalStyles?: React.CSSProperties,
  optionStyles?: React.CSSProperties,
  inputStyles?: React.CSSProperties,
  clearIndicatorStyles?: React.CSSProperties,
  dropdownIndicatorStyles?: React.CSSProperties,
  indicatorSeparatorStyles?: React.CSSProperties,
  singleValueStyles?: React.CSSProperties,
  valueContainerStyles?: React.CSSProperties,
  containerStyles?: React.CSSProperties,
}

type SKUSelectProps = AdditionalSKUSelectProps & SelectProps
type SKUAsyncSelectProps<Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> = AdditionalSKUSelectProps & AsyncProps<Option, IsMulti, Group>
type SKUCreatableSelectProps<Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> = AdditionalSKUSelectProps & CreatableProps<Option, IsMulti, Group>

type SKUSelectStylesProps = SKUSelectProps
  | SKUAsyncSelectProps
  | SKUCreatableSelectProps

const popupStyles = {
  menuPlacement: 'auto',
  menuPosition: 'fixed',
  menuPortalTarget: document.body,
}

function skuSelectStyles<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>>
(props: SKUSelectStylesProps): StylesConfig<Option, IsMulti, Group> {
  return {
    container: (provided, state) => {
      return {
        ...provided,
        ...props.containerStyles,
      };
    },
    clearIndicator: (provided, state) => {
      return {
        ...provided,
        color: getThemeColor(props, 'select.clearIcon.color', colors.select.clearIcon.color),
        ':hover': {
          color: getThemeColor(props, 'select.clearIcon.color', colors.select.clearIcon.color),
        },
        ...props.clearIndicatorStyles,
      };
    },
    dropdownIndicator: (provided, state) => {
      const styles = {
        color: props.error
          ? getThemeColor(props, 'select.dropdownIcon.error.color', colors.select.dropdownIcon.error.color)
          : getThemeColor(props, 'select.dropdownIcon.color', colors.select.dropdownIcon.color),
        ':hover': {
          color: props.error
            ? getThemeColor(props, 'select.dropdownIcon.error.color', colors.select.dropdownIcon.error.color)
            : getThemeColor(props, 'select.dropdownIcon.color', colors.select.dropdownIcon.color),
        },
      };
      if (state.isDisabled) {
        styles['color'] = getThemeColor(props, 'select.dropdownIcon.disabled', colors.select.dropdownIcon.disabled);
      }
      return {
        ...provided,
        ...styles,
        ...props.dropdownIndicatorStyles,
      };
    },
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none',
      ...props.indicatorSeparatorStyles,
    }),

    option: (provided, state) => {
      return {
        ...provided,
        ...(get(state.data, 'styles') || {}),
        borderBottom: 'none',
        padding: 10,
        ...props.optionStyles,
      };
    },
    input: (provided, state) => {
      return {
      ...provided,
      height: 'auto',
      borderColor: props.error
        ? getThemeColor(props, 'select.error.border', colors.select.error.border)
        : getThemeColor(props, 'select.border', colors.select.border),
      ...props.inputStyles,
    }},
    control: (provided, state) => {
      const styles: React.CSSProperties = {
        marginBottom: (props.noMargin ? 0 : '1rem'),
      };

      if (state.menuIsOpen && state.isFocused) {
        styles['borderWidth'] = '1px';
        styles['borderStyle'] = 'solid';
        styles['borderColor'] = props.error
          ? getThemeColor(props, 'select.error.border', colors.select.error.border)
          : getThemeColor(props, 'select.active.border', colors.select.active.border);
        styles['boxShadow'] = `
          1px 1px 0px ${styles['borderColor']},
          -1px -1px 0px ${styles['borderColor']},
          1px -1px 0px ${styles['borderColor']},
          -1px 1px 0px ${styles['borderColor']}
        `;

        if (state.selectProps.menuPlacement === 'bottom') {
          styles['borderBottomRightRadius'] = 0;
          styles['borderBottomLeftRadius'] = 0;
        } else if (state.selectProps.menuPlacement === 'top') {
          styles['borderTopRightRadius'] = 0;
          styles['borderTopLeftRadius'] = 0;
        }
      }
      else if (!state.menuIsOpen && state.isFocused) {
        styles['borderWidth'] = '1px';
        styles['borderColor'] = props.error
          ? getThemeColor(props, 'select.error.border', colors.select.error.border)
          : getThemeColor(props, 'select.active.border', colors.select.active.border);
        styles['boxShadow'] = `0 0 0 1px ${
          props.error
            ? getThemeColor(props, 'select.error.border', colors.select.error.border)
            : getThemeColor(props, 'select.active.border', colors.select.active.border)
        }`;
      }
      else if (state.isDisabled) {
        styles['backgroundColor'] = getThemeColor(props, 'select.disabled.background', colors.select.disabled.background);
        styles['borderColor'] = getThemeColor(props, 'select.disabled.border', colors.select.disabled.border);
      }
      else {
        styles['borderColor'] = props.error
          ? getThemeColor(props, 'select.error.border', colors.select.error.border)
          : provided.borderColor as (string | undefined)
        ;
      }
      return ({
        ...provided,
        ...styles,
        ':hover': {
          borderColor: props.error
            ? getThemeColor(props, 'select.error.border', colors.select.error.border)
            : getThemeColor(props, 'select.active.border', colors.select.active.border),
        },
        ...props.controlStyles,
      });
    },
    menu: (provided, state) => {
      const borderColor = props.error
        ? getThemeColor(props, 'select.error.border', colors.select.error.border)
        : getThemeColor(props, 'select.active.border', colors.select.active.border);
      const styles = {
        zIndex: 10,
        position: props.menuRelative ? 'relative' : provided.position,
        borderRadius: '5px',
        border: `1px solid ${borderColor}`,
        boxShadow: `
          1px 1px 0px ${borderColor},
          -1px -1px 0px ${borderColor},
          1px -1px 0px ${borderColor},
          -1px 1px 0px ${borderColor}
        `
      } as React.CSSProperties;

      if (state.selectProps.menuPlacement === 'top') {
        styles['borderBottomRightRadius'] = 0;
        styles['borderBottomLeftRadius'] = 0;
        styles['borderBottom'] = 'none';
        styles['marginBottom'] = '1px';
      } else if (state.selectProps.menuPlacement === 'bottom') {
        styles['borderTopRightRadius'] = 0;
        styles['borderTopLeftRadius'] = 0;
        styles['borderTop'] = 'none';
        styles['marginTop'] = '1px';
      } else {
        styles['marginTop'] = '0px';
        styles['marginBottom'] = '0px';
      }

      return {
        ...provided,
        ...styles,
        ...props.menuStyles,
      };
    },
    menuList: (provided, state) => {
      return {
        ...provided,
        paddingBottom: 0,
        ...props.menuListStyles,
      };
    },
    menuPortal: (provided, state) => {
      return {
        ...provided,
        zIndex: 9999,
        ...props.menuPortalStyles,
      };
    },
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return {
        ...provided,
        opacity,
        transition,
        ...props.singleValueStyles,
      };
    },
    valueContainer: (provided, state) => {
      return {
        ...provided,
        padding: '2px 8px',
        ...props.valueContainerStyles,
      };
    },
  };
}

const skuSelectThemeByProps =
  (props: SKUSelectProps | SKUAsyncSelectProps | SKUCreatableSelectProps) => (theme: Theme) => ({
    ...theme,
    borderRadius: 5,
    colors: {
      ...theme.colors,
      primary25: getThemeColor(props, 'primary0', colors.primary0),
      primary75: getThemeColor(props, 'primary0', colors.primary0),
      primary50: getThemeColor(props, 'primary10', colors.primary10),
      primary: getThemeColor(props, 'primary', colors.primary),
      neutral20: getThemeColor(props, 'select.border', colors.select.border),
      neutral30: getThemeColor(props, 'select.border', colors.select.border),
      neutral80: getThemeColor(props, 'textbody', colors.textbody),
      neutral90: getThemeColor(props, 'textbody', colors.textbody),
    },
  });

// duplicate styles to overide .resku global styles
// : React.ForwardRefExoticComponent<SKUSelectProps & React.RefAttributes<BaseSelect>>
//   React.ForwardRefExoticComponent<AdditionalSKUSelectProps & Omit<Pick<Props<unknown, boolean, GroupBase<unknown>>, "aria-errormessage" | "aria-invalid" | "aria-label" | ... 27 more ... | "form"> & InexactPartial<...> & InexactPartial<...>, StateManagedPropKeys> & Partial<...> & StateManagerAdditionalProps<...> & React.RefAttributes<...>>
const SKUSelect = React.forwardRef<SelectInstance<unknown, boolean, GroupBase<unknown>>, SKUSelectProps>((
  {noMargin, menuRelative, inPopup, error, ...props},
  ref
) => {
  const skuSelectTheme = skuSelectThemeByProps(props);
  const classNamePrefix = `${error ? 'select-error' : ''} commonsku-styles-select`;
  const selectStyleProps = {
    ...props,
    noMargin: noMargin,
    menuRelative: menuRelative,
    inPopup: inPopup,
    error: error,
    classNamePrefix: classNamePrefix,
    theme: skuSelectTheme,
  };
  return <BaseSelect
    ref={ref}
    classNamePrefix={classNamePrefix}
    {...(inPopup ? popupStyles as SelectProps : {})}
    styles={skuSelectStyles(selectStyleProps)}
    theme={skuSelectTheme}
    {...props}
  />
});

type LabeledSelectProp = SKUSelectProps & {
  parentStyle?: React.CSSProperties,
  labelStyle?: React.CSSProperties,
  label?: string,
  required?: boolean
};
const LabeledSelect = React.forwardRef<SelectInstance<unknown, boolean, GroupBase<unknown>>, LabeledSelectProp>(
  ({ parentStyle, labelStyle, ...props }, ref) => (
    <div style={parentStyle}>
      <Label htmlFor={props.name} style={labelStyle}>{props.label} {props.required && '*'}</Label>
      <SKUSelect {...props} ref={ref} />
    </div>
  )
);

const SKUCreatableSelect = React.forwardRef<SelectInstance, SKUCreatableSelectProps>(
  ({noMargin, menuRelative, inPopup, error, ...props}, ref) => {
    const skuSelectTheme = skuSelectThemeByProps(props);
    const classNamePrefix = `${error ? 'select-error' : ''} commonsku-styles-select`;
    const selectStyleProps = {
      ...props,
      noMargin: noMargin,
      menuRelative: menuRelative,
      inPopup: inPopup,
      error: error,
      classNamePrefix: classNamePrefix,
      theme: skuSelectTheme,
    };

    return (
      <BaseCreatableSelect
        ref={ref}
        classNamePrefix={classNamePrefix}
        styles={skuSelectStyles(selectStyleProps)}
        theme={skuSelectTheme}
        {...props}
        {...(inPopup ? popupStyles as CreatableProps<unknown, false, GroupBase<unknown>> : {})}
      />
    );
  }
);

type LabeledCreatableSelectProps = SKUCreatableSelectProps & {
  parentStyle?: React.CSSProperties,
  labelStyle?: React.CSSProperties,
  label?: string,
  required?: boolean
};
const LabeledCreatableSelect = React.forwardRef<SelectInstance, LabeledCreatableSelectProps>(
  ({ parentStyle, labelStyle, ...props }, ref) => (
    <div style={parentStyle}>
      <Label htmlFor={props.name} style={labelStyle}>{props.label} {props.required && '*'}</Label>
      <SKUCreatableSelect {...props} ref={ref} />
    </div>
  )
);


const SKUAsyncSelect = React.forwardRef<SelectInstance, SKUAsyncSelectProps>(
  ({noMargin, menuRelative, inPopup, error, ...props}, ref) => {
    const skuSelectTheme = skuSelectThemeByProps(props);
    const classNamePrefix = `${error ? 'select-error' : ''} commonsku-styles-select`;
    const selectStyleProps = {
      ...props,
      noMargin: noMargin,
      menuRelative: menuRelative,
      inPopup: inPopup,
      error: error,
      classNamePrefix: classNamePrefix,
      theme: skuSelectTheme,
    };

    return (
      <BaseAsyncSelect 
        ref={ref}
        classNamePrefix={classNamePrefix}
        styles={skuSelectStyles(selectStyleProps)}
        theme={skuSelectTheme}
        {...props}
        {...(inPopup ? popupStyles as AsyncProps<unknown, false, GroupBase<unknown>> : {})}
      />
    );
  }
);

type LabeledAsyncSelectProps = SKUAsyncSelectProps & {
  parentStyle?: React.CSSProperties,
  labelStyle?: React.CSSProperties,
  label?: string,
  required?: boolean
};
const LabeledAsyncSelect = React.forwardRef<SelectInstance, LabeledAsyncSelectProps>(
  ({ parentStyle, labelStyle, ...props }, ref) => (
    <div style={parentStyle}>
      <Label htmlFor={props.name} style={labelStyle}>{props.label} {props.required && '*'}</Label>
      <SKUAsyncSelect {...props} ref={ref} />
    </div>
  )
);

export {
  SKUSelect as Select,
  LabeledSelect,
  SKUCreatableSelect as CreatableSelect,
  LabeledCreatableSelect,
  SKUAsyncSelect as AsyncSelect,
  LabeledAsyncSelect,
  components,
  createFilter,
  mergeStyles,
};
