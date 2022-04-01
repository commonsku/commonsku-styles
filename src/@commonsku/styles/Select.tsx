import React from 'react'
import BaseSelect, { Props as SelectProps, Styles, Theme, components, createFilter, mergeStyles } from 'react-select'
import BaseCreatableSelect, { Props as CreatableSelectProps, makeCreatableSelect } from 'react-select/creatable'
import BaseAsyncSelect, { Props as AsyncSelectProps } from 'react-select/async'
import { getThemeColor, colors } from './Theme';
import {Label} from './Label'
import { document } from '../utils';

type AdditionalSKUSelectProps = {
  noMargin?: boolean,
  error?: boolean,
  menuRelative?: boolean, // fix for scroll menu inside scroll container like popup
  inPopup?:boolean,
}

type GenericObject = {[key: string]: any;};
type SKUSelectProps = AdditionalSKUSelectProps & SelectProps
type SKUAsyncSelectProps = AdditionalSKUSelectProps & AsyncSelectProps<GenericObject>
type SKUCreatableSelectProps = AdditionalSKUSelectProps & CreatableSelectProps<GenericObject>

type SKUSelectStylesProps = SKUSelectProps
  | SKUAsyncSelectProps
  | SKUCreatableSelectProps

const popupStyles = {
  menuPlacement: 'auto',
  menuPosition: 'fixed',
  menuPortalTarget: document.body,
}

function skuSelectStyles(props: SKUSelectStylesProps): Styles {
  return {
    clearIndicator: (provided, state) => {
      return {
        ...provided,
        color: getThemeColor(props, 'select.clearIcon.color', colors.select.clearIcon.color),
        ':hover': {
          color: getThemeColor(props, 'select.clearIcon.color', colors.select.clearIcon.color),
        },
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
      };
    },
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none'
    }),

    option: (provided, state) => {
      let optionStyle = {};
      if (state.data && state.data.styles) {
        optionStyle = state.data.styles;
      }
      return ({
        ...provided,
        ...optionStyle,
        borderBottom: 'none',
        padding: 10,
      });
    },
    input: (provided, state) => {
      return {
      ...provided,
      height: 'auto',
      borderColor: props.error
        ? getThemeColor(props, 'select.error.border', colors.select.error.border)
        : getThemeColor(props, 'select.border', colors.select.border)
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
          : provided.borderColor;
      }
      return ({
        ...provided,
        ...styles,
        ':hover': {
          borderColor: props.error
            ? getThemeColor(props, 'select.error.border', colors.select.error.border)
            : getThemeColor(props, 'select.active.border', colors.select.active.border),
        },
      });
    },
    menu: (provided, state) => {
      const borderColor = props.error
        ? getThemeColor(props, 'select.error.border', colors.select.error.border)
        : getThemeColor(props, 'select.active.border', colors.select.active.border);
      const styles: React.CSSProperties = {
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
      };

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

      return ({
        ...provided,
        ...styles,
      });
    },
    menuList: (provided, state) => {
      return {
        ...provided,
        paddingBottom: 0,
      };
    },
    menuPortal: (provided, state) => {
      return {
        ...provided,
        zIndex: 9999,
      };
    },
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    },
    valueContainer: (provided, state) => {
      return {
        ...provided,
        padding: '2px 8px',
      };
    },
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
    neutral20: colors.select.border,
    neutral30: colors.select.border,
    neutral80: colors.textbody,
    neutral90: colors.textbody
  },
})

// duplicate styles to overide .resku global styles
const SKUSelect: React.ForwardRefExoticComponent<SKUSelectProps & React.RefAttributes<BaseSelect>> =
  React.forwardRef<BaseSelect, SKUSelectProps>((
    {noMargin, menuRelative, inPopup, error, ...props},
    ref
  ) => {
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
      noMargin={noMargin}
      menuRelative={menuRelative}
      error={error}
      styles={skuSelectStyles(selectStyleProps)}
      theme={skuSelectTheme}
      {...props}
    />
  });

type LabeledSelectProp = SKUSelectProps & {parentStyle?:React.CSSProperties};
type TLabeledSelect = React.ForwardRefExoticComponent<LabeledSelectProp & React.RefAttributes<BaseSelect>>;
const LabeledSelect: TLabeledSelect =
  React.forwardRef<BaseSelect, LabeledSelectProp>(
    ({ parentStyle, ...props }, ref) => (
      <div style={parentStyle}>
        <Label htmlFor={props.name}>{props.label} {props.required && '*'}</Label>
        <SKUSelect {...props} ref={ref} />
      </div>
    )
  );

type TSKUCreatableSelect = React.ForwardRefExoticComponent<SKUCreatableSelectProps & React.RefAttributes<BaseCreatableSelect<GenericObject>>>;
const SKUCreatableSelect: TSKUCreatableSelect =
  React.forwardRef<BaseCreatableSelect<GenericObject>, SKUCreatableSelectProps>(
    ({noMargin, menuRelative, inPopup, error, ...props}, ref) => {
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
          noMargin={noMargin}
          menuRelative={menuRelative}
          error={error}
          styles={skuSelectStyles(selectStyleProps)}
          theme={skuSelectTheme}
          {...props}
          {...(inPopup ? popupStyles as CreatableSelectProps<GenericObject> : {})}
        />
      );
    }
  );

type LabeledCreatableSelectProps = SKUCreatableSelectProps & {parentStyle?:React.CSSProperties};
type TLabeledCreatableSelect = React.ForwardRefExoticComponent<LabeledCreatableSelectProps & React.RefAttributes<BaseCreatableSelect<GenericObject>>>;
const LabeledCreatableSelect: TLabeledCreatableSelect =
  React.forwardRef<BaseCreatableSelect<GenericObject>, LabeledCreatableSelectProps>(
    ({ parentStyle, ...props }, ref) => (
      <div style={parentStyle}>
        <Label htmlFor={props.name}>{props.label} {props.required && '*'}</Label>
        <SKUCreatableSelect {...props} ref={ref} />
      </div>
    )
  );


type TSKUAsyncSelect = React.ForwardRefExoticComponent<SKUAsyncSelectProps & React.RefAttributes<BaseAsyncSelect<GenericObject>>>;
const SKUAsyncSelect: TSKUAsyncSelect =
  React.forwardRef<BaseAsyncSelect<GenericObject>, SKUAsyncSelectProps>(
    ({noMargin, menuRelative, inPopup, error, ...props}, ref) => {
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
          noMargin={noMargin}
          menuRelative={menuRelative}
          error={error}
          styles={skuSelectStyles(selectStyleProps)}
          theme={skuSelectTheme}
          {...props}
          {...(inPopup ? popupStyles as AsyncSelectProps<GenericObject> : {})}
        />
      );
    }
  );

type LabeledAsyncSelectProps = SKUAsyncSelectProps & {parentStyle?:React.CSSProperties};
type TLabeledAsyncSelect = React.ForwardRefExoticComponent<LabeledAsyncSelectProps & React.RefAttributes<BaseAsyncSelect<GenericObject>>>;
const LabeledAsyncSelect: TLabeledAsyncSelect =
  React.forwardRef<BaseAsyncSelect<GenericObject>, LabeledAsyncSelectProps>(
    ({ parentStyle, ...props }, ref) => (
      <div style={parentStyle}>
        <Label htmlFor={props.name}>{props.label} {props.required && '*'}</Label>
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
  makeCreatableSelect,
  createFilter,
  mergeStyles,
};
