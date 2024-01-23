import React from 'react';
import { GroupBase, SelectInstance, } from 'react-select';
import BaseCreatableSelect, { CreatableProps } from 'react-select/creatable';
import { Label } from '../Label';
import { ForwardedSKUCreatableSelectProps, ForwardedLabeledCreatableSelectProps, TBaseOption } from './types';
import { popupStyles, skuSelectStyles, skuSelectThemeByProps } from './utils';

function ForwardedSKUCreatableSelect<
  Option = TBaseOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  {
    noMargin,
    menuRelative,
    inPopup,
    error,
    value,
    isMulti,
    ...props
  }: Omit<ForwardedSKUCreatableSelectProps<Option, IsMulti, Group>, 'ref'>,
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) {
  const skuSelectTheme = skuSelectThemeByProps<'create', Option, IsMulti, Group>({
    value,
    isMulti,
    ...props,
  });
  const classNamePrefix = `${error ? 'select-error' : ''} commonsku-styles-select`;
  const selectStyleProps = {
    ...props,
    value,
    isMulti,
    noMargin: noMargin,
    menuRelative: menuRelative,
    inPopup: inPopup,
    error: error,
    classNamePrefix: classNamePrefix,
    theme: skuSelectTheme,
  };

  return (
    <BaseCreatableSelect 
      value={value}
      isMulti={isMulti}
      ref={ref}
      classNamePrefix={classNamePrefix}
      styles={skuSelectStyles<'create', Option, IsMulti, Group>(selectStyleProps)}
      theme={skuSelectTheme}
      {...props}
      {...(inPopup ? popupStyles as CreatableProps<Option, IsMulti, Group> : {})}
    />
  );
}

export const SKUCreatableSelect = React.forwardRef(ForwardedSKUCreatableSelect) as <
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ForwardedSKUCreatableSelectProps<Option, IsMulti, Group>
) => ReturnType<typeof ForwardedSKUCreatableSelect>;


function ForwardedLabeledCreatableSelect<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  { parentStyle, labelStyle, ...props }: Omit<ForwardedLabeledCreatableSelectProps<Option, IsMulti, Group>, 'ref'>,
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) {
  return (
    <div style={parentStyle}>
      <Label htmlFor={props.name} style={labelStyle}>{props.label} {props.required && '*'}</Label>
      <SKUCreatableSelect {...props} ref={ref} />
    </div>
  );
}

export const LabeledCreatableSelect = React.forwardRef(ForwardedLabeledCreatableSelect) as <
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ForwardedLabeledCreatableSelectProps<Option, IsMulti, Group>
) => ReturnType<typeof ForwardedLabeledCreatableSelect>;
