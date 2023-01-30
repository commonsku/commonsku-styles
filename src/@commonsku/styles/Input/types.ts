import React, { CSSProperties } from 'react'
import { SharedStyleTypes } from '../SharedStyles';
import { RadioIconProps } from '../icons/RadioIcon';
import { CheckboxIconProps } from '../icons/CheckboxIcon';

export type CommonInputProp = {
  noMargin?: boolean,
  error?: boolean,
};

export type BaseInputProps = CommonInputProp
  & { hasIcon?: boolean; }
  & SharedStyleTypes;
export type InputProps = BaseInputProps
  & React.InputHTMLAttributes<HTMLInputElement>;

export type BaseInputIconLabelProps = CommonInputProp & {
  isActive?: boolean;
  isDisabled?: boolean;
  isHover?: boolean;
  iconPosition?: 'left' | 'right';
};

export type BaseLabelInputProps = InputProps & {
  label: string,
  name?: string,
  labelOnTop?: boolean,
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>,
} & SharedStyleTypes;
export type LabeledInputPropType =
  React.InputHTMLAttributes<HTMLInputElement> & BaseLabelInputProps;

export type BaseLabeledIconInputProps = InputProps & {
  label?: string,
  name?: string,
  labelOnTop?: boolean,
  Icon: React.ReactElement,
  iconPosition?: 'left' | 'right',
  iconColor?: string;
  iconLabelStyles?: React.CSSProperties,
  containerStyle?: React.CSSProperties,
} & SharedStyleTypes;
export type LabeledIconInputProps = React.InputHTMLAttributes<HTMLInputElement> & BaseLabeledIconInputProps;

export type BaseRadioProps = {isHovering?: boolean};
export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & BaseRadioProps;

export type CheckMarkProps = {
  checked?: boolean,
  isHovering?: boolean,
  disabled?: boolean
} & SharedStyleTypes;

export type DotProps = {
  checked?: boolean,
  isHovering?: boolean,
  disabled?: boolean
} & SharedStyleTypes;

export type LabeledRadioProps = RadioProps & {
  label: string;
  labelStyle?: React.CSSProperties;
  radioIconStyle?: React.CSSProperties;
  radioColor?: string;
  radioHoverColor?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  radioIconProps?: RadioIconProps;
};

export type LabeledRadioInButtonProps = LabeledRadioProps & {flexGrow?: boolean};

export type LabeledRadioGroupProps = LabeledRadioProps & {
  name: string,
  radios: [{label: string, value: any}]
};

export type LabeledRadioInButtonGroupProps = LabeledRadioProps & {
  name: string,
  radios: [{label: string, value: any}]
};

export type LabeledCheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  label: string|React.ReactNode;
  name?: string;
  labelStyle?: CSSProperties;
  checkboxStyle?: React.CSSProperties;
  checkboxColor?: string;
  checkboxHoverColor?: string;
  hoverByLabel?: boolean;
  stopPropagation?: boolean;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  checkboxIconProps?: CheckboxIconProps;
  indeterminate?: boolean;
  [key: string]: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

