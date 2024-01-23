import React from 'react';
import BaseSelect, { GroupBase, SelectInstance, Props } from 'react-select';
import { ForwardedLabeledSelectProps, ForwardedSKUSelectProps, TBaseOption } from './types';
import { popupStyles, skuSelectStyles, skuSelectThemeByProps } from './utils';
import { Label } from '../Label';

function ForwardedSKUSelect<
  Option = TBaseOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  noMargin,
  menuRelative,
  inPopup,
  error,
  value,
  isMulti,
  ...props
}: Omit<ForwardedSKUSelectProps<Option, IsMulti, Group>, 'ref'>, ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>) {
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

export const SKUSelect = React.forwardRef(ForwardedSKUSelect) as <
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ForwardedSKUSelectProps<Option, IsMulti, Group>
) => ReturnType<typeof ForwardedSKUSelect>;


function ForwardedLabeledSelect<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  { parentStyle, labelStyle, ...props }: Omit<ForwardedLabeledSelectProps<Option, IsMulti, Group>, 'ref'>,
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) {
  return (
    <div style={parentStyle}>
      <Label htmlFor={props.name} style={labelStyle}>{props.label} {props.required && '*'}</Label>
      <SKUSelect {...props} ref={ref} />
    </div>
  );
}

export const LabeledSelect = React.forwardRef(ForwardedLabeledSelect) as <
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ForwardedLabeledSelectProps<Option, IsMulti, Group>
<<<<<<< HEAD
) => ReturnType<typeof ForwardedLabeledSelect>;
=======
) => ReturnType<typeof ForwardedLabeledSelect>;
>>>>>>> 48f1ad6e814fee95e304035f93c43db95a8d519a
