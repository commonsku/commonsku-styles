import React from 'react'
import { GroupBase, } from 'react-select'
import BaseSelect, { Props } from 'react-select'
import { ForwardedLabeledSelectProps, ForwardedSKUSelectProps, TBaseOption } from './types';
import { popupStyles, skuSelectStyles, skuSelectThemeByProps } from './utils';
import { Label } from '../Label';

function ForwardedSKUSelect<
  Option = TBaseOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  ref,
  noMargin,
  menuRelative,
  inPopup,
  error,
  value,
  isMulti,
  ...props
}: ForwardedSKUSelectProps<Option, IsMulti, Group>) {
  const skuSelectTheme = skuSelectThemeByProps<'base', Option, IsMulti, Group>({
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
    <BaseSelect 
      value={value}
      isMulti={isMulti}
      ref={ref}
      classNamePrefix={classNamePrefix}
      styles={skuSelectStyles<'base', Option, IsMulti, Group>(selectStyleProps)}
      theme={skuSelectTheme}
      {...props}
      {...(inPopup ? popupStyles as Props<Option, IsMulti, Group> : {})}
    />
  );
}

function ForwardedLabeledSelect<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  ref, parentStyle, labelStyle, ...props
}: ForwardedLabeledSelectProps<Option, IsMulti, Group>) {
  return (
    <div style={parentStyle}>
      <Label htmlFor={props.name} style={labelStyle}>{props.label} {props.required && '*'}</Label>
      <SKUSelect {...props} ref={ref} />
    </div>
  );
}


export const SKUSelect = React.forwardRef(ForwardedSKUSelect) as <
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ForwardedSKUSelectProps<Option, IsMulti, Group>
) => ReturnType<typeof ForwardedSKUSelect>;

export const LabeledSelect = React.forwardRef(ForwardedLabeledSelect) as <
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ForwardedLabeledSelectProps<Option, IsMulti, Group>
) => ReturnType<typeof ForwardedLabeledSelect>;
