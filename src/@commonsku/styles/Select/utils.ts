import { get } from 'lodash';
import React from 'react';
import { GroupBase, StylesConfig, Theme } from 'react-select';
import { getThemeColor, colors } from '../Theme';
import { document } from '../../utils';
import { SelectType, TBaseOption, TSelectProps } from './types';

export const popupStyles = {
  menuPlacement: 'auto',
  menuPosition: 'fixed',
  menuPortalTarget: document.body,
};

export function skuSelectStyles<
  Type extends SelectType = 'base',
  Option = TBaseOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>>
(props: TSelectProps<Type, Option, IsMulti, Group>): StylesConfig<Option, IsMulti, Group> {
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
        width: "max-content",
        minWidth: "100%",
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
    multiValue: (provided, state) => {
      return {
        ...provided,
        backgroundColor: getThemeColor(props, 'primary10', colors.primary10),
        color: getThemeColor(props, 'textbody', colors.textbody),
        borderRadius: 20,
        padding: '0.25rem',
        ...props.multiValueStyles,
      };
    },
  };
}

export function skuSelectThemeByProps<
  Type extends SelectType = 'base',
  Option = TBaseOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: TSelectProps<Type, Option, IsMulti, Group>) {
  return (theme: Theme) => ({
    ...theme,
    borderRadius: 5,
    colors: {
      ...theme.colors,
      primary25: getThemeColor(props, 'primary0', colors.primary0),
      primary75: getThemeColor(props, 'primary0', colors.primary0),
      primary50: getThemeColor(props, 'primary10', colors.primary10),
      primary:   getThemeColor(props, 'primary', colors.primary),
      neutral20: getThemeColor(props, 'select.border', colors.select.border),
      neutral30: getThemeColor(props, 'select.border', colors.select.border),
      neutral80: getThemeColor(props, 'textbody', colors.textbody),
      neutral90: getThemeColor(props, 'textbody', colors.textbody),
    },
  });
}
