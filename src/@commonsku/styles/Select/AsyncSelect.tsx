import React from 'react';
import { GroupBase, SelectInstance, } from 'react-select';
import BaseAsyncSelect, { AsyncProps } from 'react-select/async';
import { Label } from '../Label';
import { ForwardedSKUAsyncSelectProps, ForwardedLabeledAsyncSelectProps, TBaseOption } from './types';
import { popupStyles, skuSelectStyles, skuSelectThemeByProps } from './utils';

function ForwardedSKUAsyncSelect<
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
  }: Omit<ForwardedSKUAsyncSelectProps<Option, IsMulti, Group>, 'ref'>,
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) {
  const skuSelectTheme = skuSelectThemeByProps<'async', Option, IsMulti, Group>({
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
    <BaseAsyncSelect 
      value={value}
      isMulti={isMulti}
      ref={ref}
      classNamePrefix={classNamePrefix}
      styles={skuSelectStyles<'async', Option, IsMulti, Group>(selectStyleProps)}
      theme={skuSelectTheme}
      {...props}
      {...(inPopup ? popupStyles as AsyncProps<Option, IsMulti, Group> : {})}
    />
  );
}

export const SKUAsyncSelect = React.forwardRef(ForwardedSKUAsyncSelect) as <
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ForwardedSKUAsyncSelectProps<Option, IsMulti, Group>
) => ReturnType<typeof ForwardedSKUAsyncSelect>;


function ForwardedLabeledAsyncSelect<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  { parentStyle, labelStyle, ...props }: Omit<ForwardedLabeledAsyncSelectProps<Option, IsMulti, Group>, 'ref'>,
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) {
  return (
    <div style={parentStyle}>
      <Label htmlFor={props.name} style={labelStyle}>{props.label} {props.required && '*'}</Label>
      <SKUAsyncSelect {...props} ref={ref} />
    </div>
  );
}

export const LabeledAsyncSelect = React.forwardRef(ForwardedLabeledAsyncSelect) as <
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ForwardedLabeledAsyncSelectProps<Option, IsMulti, Group>
) => ReturnType<typeof ForwardedLabeledAsyncSelect>;
