import React from 'react';
import { Props as SelectProps, GroupBase, SelectInstance } from 'react-select';
import { CreatableProps } from 'react-select/creatable';
import { AsyncProps } from 'react-select/async';

export type AdditionalSKUSelectProps = {
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

export type TBaseOption = {
  label?: string,
  value: string,
  isDisabled?: boolean,
};

export type SKUSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = AdditionalSKUSelectProps & SelectProps<Option, IsMulti, Group>;

export type SKUAsyncSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = AdditionalSKUSelectProps & AsyncProps<Option, IsMulti, Group>;

export type SKUCreatableSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = AdditionalSKUSelectProps & CreatableProps<Option, IsMulti, Group>;

type CommonLabelProps = {
  parentStyle?: React.CSSProperties,
  labelStyle?: React.CSSProperties,
  label?: string,
  required?: boolean
};

export type LabeledSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = SKUSelectProps<Option, IsMulti, Group> & CommonLabelProps;
export type LabeledCreatableSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = SKUCreatableSelectProps<Option, IsMulti, Group> & CommonLabelProps;
export type LabeledAsyncSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = SKUAsyncSelectProps<Option, IsMulti, Group> & CommonLabelProps;

export type SelectType = 'base' | 'async' | 'create';
export type TSelectProps<
  T extends SelectType,
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = T extends 'async'
  ? SKUAsyncSelectProps<Option, IsMulti, Group>
  : T extends 'create'
    ? SKUCreatableSelectProps<Option, IsMulti, Group>
    : SKUSelectProps<Option, IsMulti, Group>;


export type ForwardedSKUSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = SKUSelectProps<Option, IsMulti, Group> & {
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
};

export type ForwardedSKUCreatableSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = SKUCreatableSelectProps<Option, IsMulti, Group> & {
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
};

export type ForwardedSKUAsyncSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = SKUAsyncSelectProps<Option, IsMulti, Group> & {
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
};

export type ForwardedLabeledSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = LabeledSelectProps<Option, IsMulti, Group> & {
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
};

export type ForwardedLabeledAsyncSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = LabeledAsyncSelectProps<Option, IsMulti, Group> & {
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
};

export type ForwardedLabeledCreatableSelectProps<
  Option = TBaseOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = LabeledCreatableSelectProps<Option, IsMulti, Group> & {
  ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
};
